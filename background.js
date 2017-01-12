chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "resize")
        sendResponse({
            message : "resize"
        });
});