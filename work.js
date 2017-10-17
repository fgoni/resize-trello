(function () {
    let node = document.createElement('style');
    document.body.appendChild(node);
    window.addStyleString = function (str) {
        node.innerHTML = str;
    }
}());

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        changeBoardWidth(request.width);
        sendResponse({data: "Success"});
    });


function changeBoardWidth(numberOfBoards) {
    let width = 25;
    switch (numberOfBoards) {
        default:
            width = 100 / numberOfBoards;
    }
    addStyleString('.boards-page-board-section-list-item { width: ' + width + '%; }')
}

function getSavedBackgroundColor(callback) {
    chrome.storage.sync.get('trello', (items) => {
        callback(chrome.runtime.lastError ? null : items['trello']);
    });
}

getSavedBackgroundColor(savedColor => {
    if (savedColor) {
        changeBoardWidth(savedColor);
    }
});