/*chrome.webNavigation.onCreatedNavigationTarget.addListener(function(details) {
    if (details.url.includes('sharepoint.com')) {
        chrome.tabs.update(details.sourceTabId, {
            url: details.url,
            active: true
        });
        chrome.tabs.remove(details.tabId);
    }
});*/

/*chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.url.indexOf("my-sharepoint.com") != -1) {
            return {cancel: true}
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );  */