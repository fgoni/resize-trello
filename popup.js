function changeBoardWidth(numberOfBoards) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {width: numberOfBoards}, function(response) {
            console.log(response.data);
        });
    });
}

function getSavedBackgroundColor(callback) {
    chrome.storage.sync.get('trello', (items) => {
        callback(chrome.runtime.lastError ? null : items['trello']);
    });
}

function saveBackgroundColor(color) {
    let items = {};
    items['trello'] = color;
    chrome.storage.sync.set(items);
}

document.addEventListener('DOMContentLoaded', () => {
    let dropdown = document.getElementById('dropdown');
    getSavedBackgroundColor(savedColor => {
        if (savedColor) {
            dropdown.value = savedColor;
            changeBoardWidth(savedColor);
        }
    });

    dropdown.addEventListener('change', () => {
        changeBoardWidth(dropdown.value);
        saveBackgroundColor(dropdown.value);
    });
});