// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    // Set default values
    chrome.storage.sync.set({
      enabled: false,
      backgroundColor: '#1a1a1a',
      textColor: '#e6e6e6',
      linkColor: '#3391ff'
    });
  });
  
  // Listen for messages
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getState") {
      chrome.storage.sync.get(null, (data) => {
        sendResponse(data);
      });
      return true; // Keeps the message channel open for async response
    } else if (request.action === "setState") {
      chrome.storage.sync.set(request.state, () => {
        sendResponse({success: true});
      });
      return true; // Keeps the message channel open for async response
    }
  });