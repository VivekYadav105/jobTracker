/* eslint-disable no-undef */

const backupData = () => {
  return new Promise((resolve, reject) => {
      const request = indexedDB.open("JobBoard");

      request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction("jobs", "readonly");
          const store = transaction.objectStore("jobs");
          const getAllRequest = store.getAll();

          getAllRequest.onsuccess = () => {
              const jobs = getAllRequest.result;
              localStorage.setItem("jobBackup", JSON.stringify(jobs)); // Store backup in localStorage
              resolve("Backup completed");
          };

          getAllRequest.onerror = () => {
              reject("Error getting data for backup");
          };
      };

      request.onerror = () => {
          reject("Error opening database");
      };
  });
};

const restoreData = () => {
  const jobs = JSON.parse(localStorage.getItem("jobBackup"));
  if (jobs) {
      const request = indexedDB.open("JobBoard");

      request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction("jobs", "readwrite");
          const store = transaction.objectStore("jobs");

          jobs.forEach(job => {
              store.put(job); // Restore each job
          });

          transaction.oncomplete = () => {
              console.log("Data restored successfully.");
          };
          localStorage.removeItem('jobBackup')
      };
  } else {
      console.log("No backup data found.");
  }
};

function migrateDate(details){
    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        console.log("Extension updated. Starting backup...");
        backupData().then(() => {
          console.log("Backup completed. You can now proceed with the new version.");
        }).catch((error) => {
            console.error("Backup failed:", error);
        });
    }
}
console.log(typeof chrome);

console.log("Is chrome.runtime available?", typeof chrome !== "undefined" && chrome.runtime);


chrome.runtime.onInstalled.addListener((details)=>migrateDate(details));


self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('JobBoard').then((cache) => {
          // List your resources here
          const urlsToCache = [
              'index.html',
              'logo.png',
              'jobs.json'
          ];

          const cachePromises = urlsToCache.map(url => {
              // Fetch each resource and create a Response object for caching
              return fetch(url).then(response => {
                  // Check if the response is valid
                  if (!response.ok) {
                      throw new Error('Network response was not ok: ' + response.statusText);
                  }
                  return cache.put(url, response); // Store the Response in the cache
              });
          });

          return Promise.all(cachePromises);
      }).then(() => self.clients.claim())
  );
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
      clients.claim().then(() => {
          self.clients.matchAll().then((clients) => {
              clients.forEach(client => {
                  client.postMessage({
                      type: 'INITIALIZE_INDEXEDDB'
                  });
              });
          });
      })
  );
});

  
self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
  
self.addEventListener('message', (event) => {
  if (event.data.type === 'RESTORE_DATA') {
      restoreData(); // Restore the data when requested
  }
});