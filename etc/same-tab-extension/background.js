var id = 0;
var oldId = 0

// If a tab is created and the tab who created it
// contains this OneDrive URL, cancel the close
chrome.tabs.onCreated.addListener(function(newTab) {
    chrome.tabs.get(newTab.openerTabId, function(oldTab) {
        if (oldTab.url.includes('sharepoint.com')) {
            id = newTab.id
            oldId = oldTab.id
        };
    });
});

// The only way that Office updates the tab is by updating the history
// so this is the event we listen for to apply the tab update
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (id != 0) {
        if (details.url.includes('sharepoint.com')) {
            chrome.tabs.update(oldId, {
                url: details.url,
                active: true
            });
            chrome.tabs.remove(id);
            id = 0;
            oldId = 0;
        };    
    };
});