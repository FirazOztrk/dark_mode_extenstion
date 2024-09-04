document.addEventListener('DOMContentLoaded', function() {
    const enabled = document.getElementById('enabled');
    const backgroundColor = document.getElementById('backgroundColor');
    const textColor = document.getElementById('textColor');
    const linkColor = document.getElementById('linkColor');
  
    chrome.storage.sync.get(null, function(data) {
      enabled.checked = data.enabled;
      backgroundColor.value = data.backgroundColor;
      textColor.value = data.textColor;
      linkColor.value = data.linkColor;
    });
  
    function saveOptions() {
      const state = {
        enabled: enabled.checked,
        backgroundColor: backgroundColor.value,
        textColor: textColor.value,
        linkColor: linkColor.value
      };
      chrome.storage.sync.set(state, function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "updateStyles",
            styles: state
          });
        });
      });
    }
  
    enabled.addEventListener('change', saveOptions);
    backgroundColor.addEventListener('change', saveOptions);
    textColor.addEventListener('change', saveOptions);
    linkColor.addEventListener('change', saveOptions);
  });