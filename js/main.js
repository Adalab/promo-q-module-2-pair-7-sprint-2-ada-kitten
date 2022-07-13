'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race')
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');

const GITHUB_USER = 'vvarona';
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;

const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));


if (kittenListStored) {
    //si existe el listado de gatitos en el local storage
    // vuelve a pintar el listado de gatitos
    //...
    //completa el código...
    renderKittenList(kittenData.results);
  } else {
    //sino existe el listado de gatitos en el local storage
    //haz la petición al servidor
    fetch(SERVER_URL)
      .then((response) => response.json())
      .then(function (kittenData) {
        kittenDataList.push(kittenData.results);
        renderKittenList(kittenData.results);
      });
     /*  .catch((error) => {
        console.error(error);
      }); */
  }


/* fetch(SERVER_URL, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (kittenData) {
    kittenDataList.push(kittenData.results);
    renderKittenList(kittenData.results);
  });
 */
//Array de Gatitos
let kittenDataList = [];

//Funciones
function renderKitten(kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.url}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
    if (valueDesc === "" && valuePhoto === "" && valueName === "") {
        labelMesageError.innerHTML = "Debe rellenar todos los valores";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
            labelMesageError.innerHTML = "";
            labelMesageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
            const newKittenDataObject = {
                image: valuePhoto,
                name: valueName,
                desc: valueDesc,
                race: valueRace,
            }
            kittenDataList.push(newKittenDataObject);
            inputDesc.value = "";
            inputPhoto.value = "";
            inputName.value = "";
            inputRace.value = "";
            renderKittenList(kittenDataList);
        } 
    }
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    const raceSearchText =  input_search_race.value;
    listElement.innerHTML = "";
   /*  for (const kittenItem of kittenDataList) {
        if (kittenItem.desc.includes(descrSearchText)) { */
        const kittenItem = kittenDataList.filter((kittenItem) => (kittenItem.desc.includes(descrSearchText) && kittenItem.race.includes(raceSearchText)));
            
        kittenItem.forEach(kitten => {
            listElement.innerHTML += renderKitten(kitten);
        });
            
        }
/*     }
}
 */
//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);






