/* === Handlers === */
const translateBtn = document.querySelector('.translator--button');
const translatorInput = document.querySelector('#translatorInput');

translateBtn.addEventListener('click', translateText, false);

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
        document.querySelector('.result').innerHTML = myJson.text[0];
      })

  }
}