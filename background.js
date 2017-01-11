console.log("background");

chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.insertCSS(details.tabId, {file: "styles.css"});
});
