chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(data, sender, sendResponse) {
  if (data.txt) {
    let selected = data.txt;

    const re = new RegExp(selected, 'g');
    const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();

    const tooltip = document.createElement('div'); // make tooltip box
    tooltip.classList.add('transl8--tooltip');
    tooltip.style.left = rect.x + 'px';
    tooltip.style.top = (rect.y + window.scrollY - rect.height ) + 'px'; // above selected - distance from top of the page
    tooltip.innerHTML = data.translation;  // place translation into box

    // append to body
    document.body.appendChild(tooltip);
  }
}
