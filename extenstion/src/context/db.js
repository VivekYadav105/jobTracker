const initDB = ()=>{
    return new Promise((resolve,reject)=>{
        const indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB ||
            window.shimIndexedDB;

        if (!indexedDB) {
            reject("IndexedDB could not be found in this browser.")
        }

        const request = indexedDB.open("JobBoard", 1);

        request.onerror = function (event) {
            console.error("An error occurred with IndexedDB");
            console.error(event);
            reject(event)
        };

        request.onupgradeneeded = function () {
            const db = request.result;
            if(db.objectStoreNames.contains('jobs')){
                return 
            }
            const store = db.createObjectStore("jobs", { keyPath: "id",autoIncrement:true });
            store.createIndex("job_company", ["company"], { unique: false });
            store.createIndex("job_status", ["status"], {
                unique: false,
            }); 
            store.createIndex("job_role", ["role"], {
                unique: false,
            }); 
            store.createIndex("job_role_company", ["company","role"], {
                unique: true,
            }); 
            store.createIndex("appliedOn",["appliedOn"],{unique:false})
        };

        request.onsuccess = function () {
            const db = request.result;
            const transaction = db.transaction("jobs", "readwrite");
            const store = transaction.objectStore("jobs");
            const companyIndex = store.index("job_company");
            const roleIndex = store.index('job_role')
            const statusIndex = store.index('job_status')
            const jobIndex = store.index('job_role_company')

            console.log(companyIndex,roleIndex,statusIndex,jobIndex);

            resolve("created database successfully")
        };
    })
}



const addJob = (job)=>{
    return new Promise((resolve,reject) => {
        const request = indexedDB.open('JobBoard');
    
        request.onsuccess = () => {
            console.log('request.onsuccess - addData', job);
            const db = request.result;
            const tx = db.transaction('jobs', 'readwrite');
            const store = tx.objectStore('jobs');
            store.add(job);
            const res = store.getAll();
            res.onsuccess = ()=>{
                // fs.writeFile("data.json", res.result,(err)=>console.log(err))
                resolve(res.result)
            }
        };
    
        request.onerror = () => {
            const error = request.error?.message
            if (error) {
                reject(error);
            } else {
                reject('Unknown error');
            }
        };
    });
}

const getJobs = () => {
    return new Promise((resolve) => {
      const request = indexedDB.open('JobBoard');
  
      request.onsuccess = () => {
        console.log('request.onsuccess - getAllData');
        const db = request.result;
        const tx = db.transaction('jobs', 'readonly');
        const store = tx.objectStore('jobs');
        const res = store.getAll();
        res.onsuccess = () => {
          resolve(res.result);
        };
      };
    });
};

const deleteJob = (key) => {
    return new Promise((resolve,reject) => {
    // again open the connection
    const request = indexedDB.open('JobBoard');

    request.onsuccess = () => {
    console.log('request.onsuccess - deleteData', key);
    const db = request.result;
    const tx = db.transaction('jobs', 'readwrite');
    const store = tx.objectStore('jobs');
    const res = store.delete(key);

    // add listeners that will resolve the Promise
    res.onsuccess = () => {
        const jobs = store.getAll()
        jobs.onsuccess = ()=>{
            // fs.writeFile("data.json", res.result,(err)=>console.log(err))
            return resolve(jobs.result)
        }
    };
    res.onerror = (error) => {
        reject(error);
    }
    };
});
};

const editJob = (key,job)=>{
    return new Promise((resolve,reject)=>{
        const request = indexedDB.open('JobBoard')
        request.onsuccess = ()=>{
            const db = request.result
            const transaction = db.transaction('jobs','readwrite')
            const store = transaction.objectStore('jobs')
            const res = store.put(job,key)
            res.onerror = ()=>{
                const error = request.error?.message
                if (error) {
                    reject(error);
                } else {
                    reject('Unknown error');
                }
            }
            res.onsuccess = ()=>{
                const jobs = store.getAll()
                // fs.writeFile("data.json", res.result,(err)=>console.log(err))
                return resolve(jobs.result)
            }
        } 
        request.onerror = () => {
            const error = request.error?.message
            if (error) {
                reject(error);
            } else {
                reject('Unknown error');
            }
        };
    })
}

export default initDB
export {addJob,getJobs,deleteJob,editJob}