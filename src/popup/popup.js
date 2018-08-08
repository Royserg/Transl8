/* ================== */
/* ==== Handlers ==== */
/* ================== */

const translateBtn = document.querySelector('#translatorBtn');
const translatorInput = document.querySelector('#translatorInput');
const languageReverseBtn = document.querySelector('.translator--reverseBtn');
const outputLangBtn = document.querySelector('#outputLang');
const inputLangBtn = document.querySelector('#inputLang');


/* ========================= */
/* ==== Event Listeners ==== */
/* ========================= */

translateBtn.addEventListener('click', translateText, false);
languageReverseBtn.addEventListener('click', reverseLanguages, false);

/* === Event Listeners for Modal  === */
outputLangBtn.addEventListener('click', showModal, false);
inputLangBtn.addEventListener('click', showModal, false);
document.querySelector('.modal--overlay').addEventListener('click', closeModal, false);




// TODO: Selecting input & output languages: showing dropdown with lang list

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

    // API request
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180806T180405Z.a97df2323f4db674.6f2961e102f1e464ad056fafcaf6951b74a2fb26&text=${translatorInput.value}&lang=en-pl`;

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
  // TODO: make the reverse work
  // For now it just changes innerHTML of buttons
  let inputLang = document.querySelector('#inputLang');
  let outputLang = document.querySelector('#outputLang');
  let temp = inputLang.innerHTML;

  inputLang.innerHTML = outputLang.innerHTML;
  outputLang.innerHTML = temp;
}

/* ==== Modal Functions ==== */
function showModal(e) {
  // change modal info text
  document.querySelector('#translateInfo').innerHTML = e.target.dataset.langInfo;

  const modalContent = document.querySelector('.modal--content');
  // create languages list
  for (let lang in langList) {
    let div = `<div>${lang}</div>`;
    modalContent.innerHTML += div;
  }

  // show modal
  document.querySelector('#modal').classList.add('modal--overlay-opened');
}

function closeModal(e) {
  // close modal = click outside content or `x` button
  if (e.target.classList[0] === 'modal--overlay' || e.target.classList[0] === 'modal--close') {
    document.querySelector('#modal').classList.remove('modal--overlay-opened');
  }
}
