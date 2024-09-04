let darkModeEnabled = false;
let styles = {};

function applyDarkMode() {
  if (darkModeEnabled) {
    document.body.style.backgroundColor = styles.backgroundColor;
    document.body.style.color = styles.textColor;
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      links[i].style.color = styles.linkColor;
    }
  } else {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      links[i].style.color = '';
    }
  }
}

// Use chrome.runtime.sendMessage with a callback
chrome.runtime.sendMessage({action: "getState"}, function(response) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }
  darkModeEnabled = response.enabled;
  styles = {
    backgroundColor: response.backgroundColor,
    textColor: response.textColor,
    linkColor: response.linkColor
  };
  applyDarkMode();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggle") {
    darkModeEnabled = !darkModeEnabled;
    applyDarkMode();
  } else if (request.action === "updateStyles") {
    styles = request.styles;
    applyDarkMode();
  }
});