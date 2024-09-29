const wrapper = document.querySelector('.wrapper')
wrapper.innerHTML = `
        <div class="header-wrapper">
            <article class="header">
                <h3>JOB BOARD</h3>
                <article class="header-buttons">
                    <button class="main-btn circle" id="search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button class="main-btn circle">
                        <i class="fa-regular fa-file"></i>
                    </button>
                    <button id='add-job' class="main-btn circle">
                        <i class="fa-regular fa-plus"></i>
                    </button>
                </article>
            </article>
            <div class="search-wrapper close">
                <input class="search-bar" id="job-search" placeholder="search your job" type="text"/>
                <button id="close-search" style="background-color: white;"  class="main-btn circle">
                    <i class="fa-solid fa-xmark"></i>
                </button>            
            </div>
        </div>
        <div class="close" id="addJob-wrapper">
            <div class='header' style='border-radius:10px;margin-bottom:10px'>
                <h2 style="text-align: center;color:teal">Add Your Job</h2>
                <button id="close-addJob" style="background-color: white;"  class="main-btn circle">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <form class="" onsubmit="handleAddJob()">
                <div class="input-wrapper">
                    <label for="">Role</label>
                    <input name='role' placeholder='Enter role' type="text">
                </div>
                <div>
                    <article class="input-wrapper">
                        <label for="">Company</label>
                        <input placeholder='Enter company' name='company' type="text">
                    </article>
                    <article class="input-wrapper">
                        <label for="">Applied On</label>
                        <input placeholder='Applied On' name='appliedOn' type="date">
                    </article>
                </div>
                <div class="input-wrapper">
                    <label for="">Link</label>
                    <input name="trackLink" placeholder='Enter the website link' type="text">
                </div>
            </form>
        </div>
`
