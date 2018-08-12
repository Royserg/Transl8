/* ================== */
/* ==== Handlers ==== */
/* ================== */

const translateBtn = document.querySelector('#translatorBtn');
const translatorInput = document.querySelector('#translatorInput');
const languageReverseBtn = document.querySelector('.translator--reverseBtn');
const outputLangBtn = document.querySelector('#outputLang');
const inputLangBtn = document.querySelector('#inputLang');
const modalContent = document.querySelector('.modal--content');
const modalContainer = document.querySelector('.modal--container');

/* ========================= */
/* ==== Event Listeners ==== */
/* ========================= */

translateBtn.addEventListener('click', translateText, false);
translatorInput.addEventListener('keyup', sendToTranslate, false);
languageReverseBtn.addEventListener('click', reverseLanguages, false);

/* === Event Listeners for Modal  === */
outputLangBtn.addEventListener('click', showModal, false);
inputLangBtn.addEventListener('click', showModal, false);
document.querySelector('.modal--overlay').addEventListener('click', closeModal, false);
modalContent.addEventListener('click', selectLanguage, false);
modalContainer.addEventListener('keypress', searchLanguage, false);

/* ============================== */
/* ==== When Popup is opened ==== */
/* ============================== */

// focus on input
translatorInput.focus();
// extract from memory last used languages: input & output
chrome.storage.sync.get(['inputLanguage', 'outputLanguage'], function(data) {
  if (data.inputLanguage) {
    inputLangBtn.innerHTML = data.inputLanguage;
  }

  if (data.outputLanguage) {
    outputLangBtn.innerHTML = data.outputLanguage;
  }
})


// initialize clipboardJS button
const copyBtn = new ClipboardJS('#copyBtn');

copyBtn.on('success', function(e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);

  // show tooltip
  e.trigger.classList.add('tooltip');

  // multi event listener attaching to button
  ['blur', 'mouseleave'].forEach(function(eventName) {
    e.trigger.addEventListener(eventName, () => removeClass(e.trigger, 'tooltip'), false);
  });

  e.clearSelection();
});

// TODO: extract from memory saved words


/* ==================== */
/* ===== Functions ==== */
/* ==================== */

function translateText() {
  if (translatorInput.value !== '') {
    // URL encode input text
    let toTranslate = translatorInput.value.replace(/\s/g, '+');

    let inputLangCode = langList[inputLangBtn.innerHTML];
    let outputLangCode = langList[outputLangBtn.innerHTML];

    // API request
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180806T180405Z.a97df2323f4db674.6f2961e102f1e464ad056fafcaf6951b74a2fb26&text=${toTranslate}&lang=${inputLangCode}-${outputLangCode}`;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        document.querySelector('.translator--result').innerHTML = myJson.text[0];
      })
  }
}

function sendToTranslate(e) {
  if (e.key === 'Enter') translateText();
}

function reverseLanguages() {
  // swap input with output language
  let inputLang = document.querySelector('#inputLang');
  let outputLang = document.querySelector('#outputLang');

  [inputLang.innerHTML, outputLang.innerHTML] = [outputLang.innerHTML, inputLang.innerHTML];

  // update languages in storage
  chrome.storage.sync.set({
    "inputLanguage": inputLang.innerHTML,
    "outputLanguage": outputLang.innerHTML
  });

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

  // focus on languages container
  setTimeout(() => {
    modalContainer.focus();
  }, 100);

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

    if (document.querySelector('#translateInfo').innerHTML === 'from') {
      // Same language is on output Btn -> swap with previously set lang
      if (outputLangBtn.innerHTML === clickedLanguage.innerHTML) {
        outputLangBtn.innerHTML = inputLangBtn.innerHTML;
      }
      inputLangBtn.innerHTML = clickedLanguage.innerHTML;
      // save language into storage
      chrome.storage.sync.set({"inputLanguage": clickedLanguage.innerHTML});
    } else {
      // Same language is on input Btn -> swap with previously set lang
      if (inputLangBtn.innerHTML === clickedLanguage.innerHTML) {
        inputLangBtn.innerHTML = outputLangBtn.innerHTML;
      }
      outputLangBtn.innerHTML = clickedLanguage.innerHTML
      // save language into storage
      chrome.storage.sync.set({"outputLanguage": clickedLanguage.innerHTML});
    }

    // close modal
    document.querySelector('#modal').classList.remove('modal--overlay-opened');
  }
}

function searchLanguage(e) {
  let languages = document.querySelectorAll('.modal--language');

  // get languages starting with typed char
  let matches = Array.from(languages).filter(lang => {
    return lang.innerHTML[0].toLowerCase() === e.key;
  })

  // one of matching languages is focused on, focus on next one
  for (let i = 0, length = matches.length; i < length; i++) {
    if (document.activeElement === matches[i]) {
      if ((i + 1) === length) {
        matches[0].focus();
      } else {
        matches[i+1].focus();
      }
      break;
    }
  }

  // if no lang was focused, target first lang
  let langFocused = matches.filter(lang => {
    return document.activeElement === lang;
  });

  if (langFocused.length === 0) {
    matches[0].focus();
  }
}

function removeClass(element, className) {
  element.classList.remove(className);
}
