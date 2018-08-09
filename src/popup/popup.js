/* ================== */
/* ==== Handlers ==== */
/* ================== */

const translateBtn = document.querySelector('#translatorBtn');
const translatorInput = document.querySelector('#translatorInput');
const languageReverseBtn = document.querySelector('.translator--reverseBtn');
const outputLangBtn = document.querySelector('#outputLang');
const inputLangBtn = document.querySelector('#inputLang');
const modalContent = document.querySelector('.modal--content');

/* ========================= */
/* ==== Event Listeners ==== */
/* ========================= */

translateBtn.addEventListener('click', translateText, false);
languageReverseBtn.addEventListener('click', reverseLanguages, false);

/* === Event Listeners for Modal  === */
outputLangBtn.addEventListener('click', showModal, false);
inputLangBtn.addEventListener('click', showModal, false);
document.querySelector('.modal--overlay').addEventListener('click', closeModal, false);
modalContent.addEventListener('click', selectLanguage, false);
modalContent.addEventListener('keypress', searchLanguage, false);



/* ============================== */
/* ==== When Popup is opened ==== */
/* ============================== */

// focus on input
translatorInput.focus();
// TODO: extract from memory last used languages: input & output
// TODO: extract from memory saved words




/* ==================== */
/* ===== Functions ==== */
/* ==================== */

function translateText(e) {
  if (translatorInput.value !== '') {
    console.log(translatorInput.value)

    let inputLangCode = langList[inputLangBtn.innerHTML];
    let outputLangCode = langList[outputLangBtn.innerHTML];

    // API request
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180806T180405Z.a97df2323f4db674.6f2961e102f1e464ad056fafcaf6951b74a2fb26&text=${translatorInput.value}&lang=${inputLangCode}-${outputLangCode}`;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        document.querySelector('.translator--result').innerHTML = myJson.text[0];
      })

  }
}

function reverseLanguages() {
  // swap input with output language
  let inputLang = document.querySelector('#inputLang');
  let outputLang = document.querySelector('#outputLang');

  [inputLang.innerHTML, outputLang.innerHTML] = [outputLang.innerHTML, inputLang.innerHTML];

}

/* ==== Modal Functions ==== */
function showModal(e) {
  // change modal info text
  document.querySelector('#translateInfo').innerHTML = e.target.dataset.langInfo;

  // remove language list
  modalContent.innerHTML = '';

  // create languages list
  for (let lang in langList) {
    // mark language that was selected
    let selected = (e.target.innerHTML === lang) ? 'modal--language-selected' : '';
    // create a button for each language
    let btn = `<button class="modal--language ${selected}">${lang}</button>`;
    // append btn to container
    modalContent.innerHTML += btn;
  }

  // show modal
  document.querySelector('#modal').classList.add('modal--overlay-opened');

  // TODO: focus on first language button
  modalContent.focus();
}

function closeModal(e) {
  // close modal = click outside content or `x` button
  if (e.target.classList[0] === 'modal--overlay' || e.target.classList[0] === 'modal--close') {
    document.querySelector('#modal').classList.remove('modal--overlay-opened');
  }
}

function selectLanguage(e) {
  let clickedLanguage = e.target;

  if (clickedLanguage.classList[0] === 'modal--language') {

    document.querySelector('#translateInfo').innerHTML === 'from' ?
      (inputLangBtn.innerHTML = clickedLanguage.innerHTML)
    :
      (outputLangBtn.innerHTML = clickedLanguage.innerHTML)

    // close modal
    document.querySelector('#modal').classList.remove('modal--overlay-opened');
  }
}

function searchLanguage(e) {
  console.log(e);
}
