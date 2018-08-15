chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(data, sender, sendResponse) {
  if (data.txt) {
    let selected = data.txt;

    const re = new RegExp(selected, 'g');
    const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();

    const tooltip = document.createElement('div'); // make tooltip box
    tooltip.classList.add('transl8--tooltip');
    tooltip.style.left = rect.x + 'px';
    tooltip.style.top = (rect.y + window.scrollY + rect.height ) + 'px'; // above selected - distance from top of the page
    tooltip.innerHTML = data.translation;  // place translation into box

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('transl8--button');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closeTooltip, false);

    tooltip.appendChild(closeBtn); // append button to tooltip

    // append to body
    document.body.appendChild(tooltip);
  }
}

function closeTooltip(e) {
  // remove tooltip attached to body
  document.body.removeChild(e.target.parentElement);
}
