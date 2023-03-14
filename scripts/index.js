
function spawnCards (characters){

  var writingHtml = "";

  for (let i = 0; i < characters.length; i++) {
    const spawn = characters[i]
    let state = ''
    if(spawn.status === 'Alive'){
      state = 'green'
    }else if(spawn.status === 'Dead') {
      state = 'red'
    }else {
      state = 'gray'
    }
    const card_default = `
      <div class="col-md-6 col-12" id="card${i}">
        <div class="card mb-3 card-dark">
          <div class="row limit">
            <div class="col-md-4 d-flex justify-content-center flex-shrink-0">
              <img class="card-img" src="${spawn.image}" class="rounded-start img-flex" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
              <a href="pages/character.html?id=${spawn.id}" class="text-decoration-none text-white">
                <h5 id="${spawn.id}" class="card-title text-start mb-0 fs-2">
                    ${spawn.name}
                  </h5>
              </a>
                <p class="card-text text-start">
                  <span> <span class="live-circle ${state}">a</span></span>
                <span> ${spawn.status} - ${spawn.species} </span>
              </p>
              <p class="fw-semibold text-start mb-0 text-white-50">
                Last known location:
              </p>
              <a
                href="#"
                class="text-decoration-none text-white">
                <p class="card-title fw-normal text-start">
                  ${spawn.location.name}
                </p>
              </a>
              <p class="fw-semibold text-start mb-0 text-white-50">
                First seen in:
              </p>
              <a
                href="#"
                class="text-decoration-none text-white"
              >
                <p class="card-title fw-normal text-start">
                  ${spawn.origin.name}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `

    writingHtml += card_default;
  }

const content = document.getElementById("content-section");

content.innerHTML = writingHtml;
   
}

var page = 1;

async function getCharacter(filter,filter2,filter3) {
  
  let query;
  
  if(filter.length || filter2.length || filter3.length){
    if(filter2.length !== ""||filter3.length !== ""){
      query = 'https://rickandmortyapi.com/api/character/?page='+page+'&name='+filter+'&status='+filter2.value+'&gender='+filter3.value;
    }else{
      query = 'https://rickandmortyapi.com/api/character/?page='+page+'&name='+filter+'&status=""'+'&gender=""';
    }; 
  }else{
    query = 'https://rickandmortyapi.com/api/character/?page='+page
  };

  
  try {
    document.getElementById("search-error").style.display="none";

    const { data } = await axios.get(query);
    spawnCards(data.results)
    console.log(data.results);
    document.getElementById("page-section").style.display="flex";
    
  } catch (error) {
    document.getElementById("search-error").style.display="block";
    document.getElementById("page-section").style.display="none";
    const contentError = document.getElementById("content-section")
    contentError.innerHTML=""
    console.error(error);
  }
}

function prevent(e){
  e.preventDefault()
  searchCharacters()
}

function searchCharacters(){
  
const searchInput = document.getElementById("search-input")

console.log("ready",searchInput.value)

filter2 = document.getElementById("filter-input")

console.log("ready",filter2.value)

filter3 = document.getElementById("filter-input2")

console.log("ready",filter2.value)

filter = searchInput.value;

getCharacter(filter,filter2,filter3)  
}

function load() {

  let filter = ""
  let filter2 = ""
  let filter3 = ""
  let pageLocation = document.getElementById("page-id")
  pageLocation.innerHTML = page

  function nextPage(){
    page++;
    page <= 0 ? page = 1 : "";
    pageLocation.innerHTML = page
    searchCharacters()
  }
  
  function prevPage(){
    page--;
    page <= 0 ? page = 1 : "";
    pageLocation.innerHTML = page
    searchCharacters()
  }

  let buttonNext = document.getElementById("button-next")
  let buttonPrev = document.getElementById("button-prev")

  buttonNext.addEventListener("click", nextPage)
  buttonPrev.addEventListener("click", prevPage)

  getCharacter(filter,filter2,filter3)

  const searchButton = document.getElementById("button-addon2")
  searchButton.addEventListener("click", searchCharacters, false)
  const enter = document.getElementById("form-search")
  enter.addEventListener("submit", prevent, false)
}

document.addEventListener("DOMContentLoaded", load, false);

