const menuItem = {
  'id': 'transl8',
  'title': 'Transl8',
  'contexts': ['selection']
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(translateSelected);

function translateSelected(info, tab) {
  if (info.menuItemId === 'transl8' && info.selectionText) {

    // retrieve output lang from storage
    chrome.storage.sync.get(['outputLanguage'], function(data) {
      // get output language code
      const outputLang =  langList[data.outputLanguage];
      // prepare selection for API request
      const toTranslate = info.selectionText.replace(/\s/g, '+');

      const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180806T180405Z.a97df2323f4db674.6f2961e102f1e464ad056fafcaf6951b74a2fb26&text=${toTranslate}&lang=${outputLang}`;

      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          // send msg to content script in opened tab
          const msg = {
            txt: info.selectionText,
            translation: myJson.text[0]
          };
          chrome.tabs.sendMessage(tab.id, msg);
        })

    });
  }
}

