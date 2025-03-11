function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayCategory(data.categories))
}

function loadVideo (){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideo(data.videos));
}



function displayCategory (categories){
    
const categoryContainer = document.getElementById('categories-container');
for (let cat of categories){
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
     <button class="btn btn-sm hover:bg-lime-500">${cat.category}</button>
    
    `
    categoryContainer.append(categoryDiv);
}

}

const displayVideo = (videos) =>{
const videoContainer = document.getElementById("video-container");
for (let video of videos){
    const videoDiv = document.createElement('div');
 videoDiv.innerHTML = `
 
 <div class="card bg-base-100 ">
        <figure class=" relative">
          <img class ="w-full h-[150px] object-cover"
            src="${video.thumbnail}"
            alt="" />
            <span class="absolute bottom-2 right-2 bg-black text-white px-2 text-sm rounded">3 hrs 56 min ago</span>
        </figure>
        <div class="px-0 py-5 flex gap-3 ">

        <div class="profile">
            <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
        </div>

        <div class="intro">
<h2 class="text-sm font-semibold">${video.authors[0].profile_name}</h2>
<p class="text-sm flex gap-1">Awlad Hossain <img class="w-5 h-5" src="https://cdn-icons-png.flaticon.com/128/16783/16783108.png" alt=""></p>
<p class="text-sm ">${video.others.views}</p>
        </div>

        </div>
      </div>
 `

 videoContainer.append(videoDiv);
}

}



loadVideo()
loadCategories()