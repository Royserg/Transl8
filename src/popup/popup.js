/* === Handlers === */
const translateBtn = document.querySelector('#translatorBtn');
const translatorInput = document.querySelector('#translatorInput');
const languageReverseBtn = document.querySelector('.translator--reverseBtn');

/* === Attach Even Listeners  === */
translateBtn.addEventListener('click', translateText, false);
languageReverseBtn.addEventListener('click', reverseLanguages, false);

// TODO: Selecting input & output languages: showing dropdown with lang list


/* === When Popup is opened === */
// focus on input
translatorInput.focus();
// TODO: extract from memory last used languages: input & output
// TODO: extract from memory saved words






/*  ====================
    ===== Functions ====
    ====================   */

function translateText(e) {
  if (translatorInput.value !== '') {
    console.log(translatorInput.value)

    // API request
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180806T180405Z.a97df2323f4db674.6f2961e102f1e464ad056fafcaf6951b74a2fb26&text=${translatorInput.value}&lang=en-pl`;

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        document.querySelector('.translator--result').innerHTML = myJson.text[0];
      })

  }
}

function reverseLanguages() {
  console.log('Reverse Btn clicked');
  // For now it just changes innerHTML of buttons
  let inputLang = document.querySelector('#inputLang');
  let outputLang = document.querySelector('#outputLang');
  let temp = inputLang.innerHTML;

  inputLang.innerHTML = outputLang.innerHTML;
  outputLang.innerHTML = temp;
}