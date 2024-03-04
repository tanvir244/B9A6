// Dom selection
const latestPostsContainer = document.getElementById('latest-posts-container');
const inputSearch = document.getElementById('input-search');
const searchBtn = document.getElementById('search-btn');
const postContainer = document.getElementById('post-container');
const tableBtn = document.getElementById('table-btn');
const tableBody = document.getElementById('table-body');
let markRead = document.getElementById('mark-read');

// search 
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleLoadingSpinner(true);
  const searching = inputSearch.value;
  const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searching}`;
  fecthData(url);
})
// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loadding-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}
// table content
function tableContent(title, views){
  // ====
  const currentMarkRead = readCount('mark-read');
  const updateMarkRead = currentMarkRead + 1;
  markRead.innerText = updateMarkRead;

  // ====
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
  <th>${title}</th>
  <td class="flex items-center gap-2 text-lg font-bold text-[#12132D99]">
    <img src="resources/icons/Group 16.svg" alt="">
    <span>${views}</span>
  </td>
  `;
  tableBody.appendChild(newRow);
}

// ====
const fecthData = (linkURL) => {
    const url = linkURL;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const posts = data.posts;
            postContainer.innerHTML = '';
            // =====
            posts.forEach(post => { console.log(post);
                const status = post.isActive;
                // ====
                const newCard = document.createElement('div');
                newCard.className = "bg-[#797DFC1A] flex flex-col md:flex-row p-4 md:p-10 gap-6 rounded-3xl border border-violet-600";
                newCard.innerHTML = `
                <div>
              <div class="avatar ${status ? 'online' : 'offline'}">
                <div class="w-24 rounded-full">
                  <img src="${post.image}" />
                </div>
              </div>
            </div>
            <div class="space-y-5 w-[80%]">
              <div class="flex space-x-8 text-[#12132DCC] font-semibold">
                <p># ${post.category}</p>
                <p>Author: ${post.author.name}</p>
              </div>
              <div class="space-y-3">
                <h3 id="title" class="text-xl text-[#12132D] font-bold">${post.title}</h3>
                <p class="text-[#12132D99] font-semibold md:w-[70%]">${post.description}</p>
              </div>
              <div class="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                <div class="flex items-center space-x-6 text-[#12132D99] font-bold">
                  <div class="flex space-x-3">
                    <img src="resources/icons/tabler-icon-message-2.svg" alt="">
                    <span>${post.comment_count}</span>
                  </div>
                  <div class="flex space-x-3">
                    <img src="resources/icons/Group 16.svg" alt="">
                    <span id="views">${post.view_count}</span>
                  </div>
                  <div class="flex space-x-3">
                    <img src="resources/icons/Group 18.svg" alt="">
                    <p><span>${post.posted_time}</span>min</p>
                  </div>
                </div>
                <div>
                    <button onclick="tableContent('${post.title}', ${post.view_count})" id="table-btn" class="btn">
                        <img class="mx-auto" src="resources/icons/Group 40106.svg" alt="">
                    </button>                
                </div>
              </div>
            </div>
                `;

                postContainer.appendChild(newCard);
                
            });
            setTimeout(() => toggleLoadingSpinner(false), 2000);
        });

        
}
const url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
fecthData(url);

//====== latest posts
const fetchLatestPost = () => {
  const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
  fetch(url)
    .then((res) => res.json())
    .then((posts) => {
      for(const post of posts){console.log(post);
        const newCard = document.createElement('div');
        newCard.className = 'space-y-3 shadow-xl p-4 rounded-2xl';
        newCard.innerHTML = `
        <img class="h-[275px] rounded-2xl" src="${post.cover_image}" alt="">
        <div class="flex gap-2">
          <img src="resources/icons/Frame-big.svg" alt="">
          <p class="font-bold text-[#12132D99]">${post?.author?.posted_date || 'No Publish Date'}</p>
        </div>
        <h2 class="text-lg font-bold">${post.title}</h2>
        <p class="text-[#12132D99] text-base font-medium">${post.description}</p>
        <div class="flex gap-4">
          <div>
            <img class="w-12 h-12 rounded-full" src="${post.profile_image}" alt="">
          </div>
          <div>
            <h5 class="text-lg font-bold text-[#12132D]">${post.author.name}</h5>
            <p class="text-base font-semibold text-[#12132D99]">${post?.author?.designation || 'Unknown'}</p>
          </div>
        </div>
        `;
        latestPostsContainer.appendChild(newCard);
      }
    })
}
fetchLatestPost();