const menuItem = {
  'id': 'transl8',
  'title': 'Transl8',
  'contexts': ['selection']
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener( function(clickData) {
  if(clickData.menuItemId === 'transl8' && clickData.selectionText) {
    console.log(clickData.selectionText);
  }
})