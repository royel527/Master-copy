function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayCategory(data.categories))
};

async function loadVideo() {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const data = await response.json();
        console.log('Fetched videos data:', data); // Log the fetched data
        if (Array.isArray(data.videos)) {
            displayVideo(data.videos);
        } else {
            console.error('Fetched data is not an array');
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};
function displayCategory (categories){
    
const categoryContainer = document.getElementById('categories-container');
for (let cat of categories){
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
     <button onclick="loadCategoryVideo('${cat.category_id}')" class="btn btn-sm hover:bg-lime-500">${cat.category}</button> <!-- Ensure category_id is passed as a string -->
    `;
    categoryContainer.append(categoryDiv);
}

};

function loadCategoryVideo(id) {

  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(data => displayVideo(data.category))
};

const loadVideoDetails = async (videoid) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoid}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayVideoDetalis(data.video);
  } catch (error) {
    console.error('Error fetching video details:', error);
  }
};

const displayVideoDetalis = (loadVideoDetails) => {
  console.log(loadVideoDetails);
  const modal = document.getElementById('my_modal_1').showModal();

};

function displayVideo(videos) {
    // Ensure videos is iterable

const videoContainer = document.getElementById('video-container');
videoContainer.innerHTML = "" ;

 if(videos.length == 0)  {
  videoContainer.innerHTML = `
   <div class="col-span-full flex flex-col text-center justify-center items-center py-50">
    <img class="w-40" src="asseat/Icon.png" alt="">
    <h2 class="font-bold text-2xl">Opps !! Sorry , Ther is no content here !!!</h2>
   </div>
  
  `

 }
  for (let video of videos) {
  
const videoCard = document.createElement('div');
videoCard.innerHTML = `
      <div class="card bg-base-100 ">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover"
            src="${video.thumbnail}"
            alt="" />
            <span class="absolute bottom-2 right-2 bg-black text-white px-2 text-sm rounded">${video.uploaded_time}</span> <!-- Dynamic time -->
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
            <h2 class="text-sm font-semibold">${video.authors[0].profile_name}</h2> <!-- Dynamic author name -->
            <p class="text-sm flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://cdn-icons-png.flaticon.com/128/16783/16783108.png" alt=""></p>
            <p class="text-sm ">${video.others.views}</p>
            <p class="text-sm font-bold">${video.title}</p> <!-- Dynamic video title -->
          </div>

          
        </div>
        <button onclick=loadVideoDetails("${video.video_id}")  class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Details</button>
      </div>
    `
    videoContainer.append(videoCard);
  }
};

loadCategories();
