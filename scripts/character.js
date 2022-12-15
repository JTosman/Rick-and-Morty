function spawnCards (spawn){

  var writingHtml = "";

  let state = ''
    if(spawn.status === 'Alive'){
      state = 'green'
    }else if(spawn.status === 'Dead') {
      state = 'red'
    }else {
      state = 'gray'
    }
    const card_default = `
      <div class="col-md-10 col-12">
        <div class="card mb-3 card-dark">
          <div class="row">
          <div class="col-md-4 flex-shrink-0 image-content">
          <img src="${spawn.image}" class="rounded-start img-flex" />
        </div>
            <div class="col-md-8">
              <div class="card-body">
              <h5 id="${spawn.id}" class="card-title text-start mb-0 fs-2">
                  ${spawn.name}
                </h5>
              <p class="card-text text-start">
                <span> <span class="live-circle ${state}">a</span></span>
              <span> ${spawn.status} - ${spawn.species} </span>
            </p>
            <div class="box-1">
            <p class="fw-semibold text-start mb-0 text-white-50">
            Last known location:
          </p>
            <p class="card-title fw-normal text-start">
              ${spawn.location.name}
            </p>
          <p class="fw-semibold text-start mb-0 text-white-50">
            First seen in:
          </p>
            <p class="card-title fw-normal text-start">
              ${spawn.origin.name}
            </p>
            </div>
            <p class="fw-semibold text-start mb-0 text-white-50">
              Gender:
            </p>
              <p class="card-title fw-normal text-start">
                ${spawn.gender}
              </p>
            <p class="fw-semibold text-start mb-0 text-white-50">
              Espisodes:
            </p>
              <p class="card-title fw-normal text-start">
                ${spawn.episode.length}
              </p>
              <p class="fw-semibold text-start mb-0 text-white-50">
              Created:
            </p>
              <p class="card-title fw-normal text-start">
                ${spawn.created}
              </p>
          </div>        
          </div>
        </div>
      </div>
    </div>
    <div class="reference-title"><h2>Related Character: <h2 id="ref-count">0</h2></h2></div>
    <div class="references-content" id="references-section">
    </div>
          `

    writingHtml += card_default;
  
const content2 = document.getElementById("content-section2");

content2.innerHTML = writingHtml;

}
  

function spawnCharacterRef(references){
  let writingHtml2 = ''

  if(references.length == 0){

    return false
  }

  const refResults = references.length
  let ref = document.getElementById('ref-count')
  ref.innerHTML = refResults;

  for (let i = 0; i < references.length; i++) {
    const spawn2 = references[i]
    let state = ''
    if(spawn2.status === 'Alive'){
      state = 'green'
    }else if(spawn2.status === 'Dead') {
      state = 'red'
    }else {
      state = 'gray'
    }
    const card_default2 = `
      <div class="col-md-6 col-12" id="card${i}">
        <div class="card mb-3 card-dark">
          <div class="row limit">
            <div class="col-md-4 flex-shrink-0">
              <img src="${spawn2.image}" class="rounded-start img-flex" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
              <a href="character.html?id=${spawn2.id}" class="text-decoration-none text-white">
                <h5 id="${spawn2.id}" class="card-title text-start mb-0 fs-2">
                    ${spawn2.name}
                  </h5>
              </a>
                <p class="card-text text-start">
                  <span> <span class="live-circle ${state}">a</span></span>
                <span> ${spawn2.status} - ${spawn2.species} </span>
              </p>
              <p class="fw-semibold text-start mb-0 text-white-50">
                Last known location:
              </p>
              <a
                href="#"
                class="text-decoration-none text-white">
                <p class="card-title fw-normal text-start">
                  ${spawn2.location.name}
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
                  ${spawn2.origin.name}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `

    writingHtml2 += card_default2;
  }

const content_2 = document.getElementById("references-section");

content_2.innerHTML = writingHtml2;

}

async function characterEspecification (){

    try {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let value = params.id; 
      console.log(value)
      const { data } = await axios.get('https://rickandmortyapi.com/api/character/'+value);
      spawnCards(data)
      
      characterRef(data.name);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
}

async function characterRef(name){

  try {
    let spacing = name.split(' ')
    const param = spacing[0];
    console.log(param)
    const { data } = await axios.get('https://rickandmortyapi.com/api/character/?name='+param);
    console.log(data)
    if(data.results.length == 1){
      const param = spacing[1]
      console.log(param)
      const { data } = await axios.get('https://rickandmortyapi.com/api/character/?name='+param);
      spawnCharacterRef(data.results.filter(character => character.name!==name))
      console.log(data)
    }else{
      spawnCharacterRef(data.results.filter(character => character.name!==name))
      console.log(data)
    }
  } catch (error) {
    console.error(error);
  }

}

document.addEventListener("DOMContentLoaded", characterEspecification, false);

