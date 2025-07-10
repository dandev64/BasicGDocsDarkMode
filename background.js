const darkModeTabs = new Set();

chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.id) return;
    const tabId = tab.id;

    if (darkModeTabs.has(tabId)) {
        // Remove dark mode
        await chrome.scripting.removeCSS({
            target: { tabId: tabId, allFrames:true },
            files: ["darkmode.css"]
        });
        darkModeTabs.delete(tabId);
        chrome.tabs.sendMessage(tabId, { type: "TOGGLE_DARK_MODE", enabled: false });

    } else {
        // Apply dark mode
        await chrome.scripting.insertCSS({
            target: { tabId: tabId, allFrames:true },
            files: ["darkmode.css"]
        });
        darkModeTabs.add(tabId);
        chrome.tabs.sendMessage(tabId, { type: "TOGGLE_DARK_MODE", enabled: true });

    }
});


// chrome.action.onClicked.addListener(async (tab) => {
//     if (!tab.id) return;
//     chrome.storage.local.get(['darkModeEnabled'], (result) => {
//         const enabled = !result.darkModeEnabled;
//         chrome.storage.local.set({ darkModeEnabled: enabled }, () => {
//             chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_DARK_MODE", enabled });
//         });
//     });
// });