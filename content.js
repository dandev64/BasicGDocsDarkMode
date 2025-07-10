function injectDarkModeCSS() {
    if (!document.getElementById('darkmode-style')) {
        const style = document.createElement('link');
        style.id = 'darkmode-style';
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = chrome.runtime.getURL('darkmode.css');
        document.head.appendChild(style);
    }
}

// Initial injection
injectDarkModeCSS();

// Re-inject if removed (SPA navigation, DOM changes)
const observer = new MutationObserver(injectDarkModeCSS);
observer.observe(document.head, { childList: true });


function injectDarkModeCSS() {
    if (!document.getElementById('darkmode-style')) {
        const style = document.createElement('link');
        style.id = 'darkmode-style';
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = chrome.runtime.getURL('darkmode.css');
        document.head.appendChild(style);
    }
}

function removeDarkModeCSS() {
    const style = document.getElementById('darkmode-style');
    if (style) style.remove();
}

function showOverlay(enabled) {
    let overlay = document.getElementById('darkmode-toggle-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'darkmode-toggle-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '20px';
        overlay.style.right = '20px';
        overlay.style.zIndex = '2147483647'; // Max z-index
        overlay.style.padding = '10px 20px';
        overlay.style.borderRadius = '8px';
        overlay.style.background = enabled ? '#222' : '#eee';
        overlay.style.color = enabled ? '#fff' : '#222';
        overlay.style.fontSize = '18px';
        overlay.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        overlay.style.transition = 'opacity 0.3s';
        overlay.style.pointerEvents = 'none';
        document.documentElement.appendChild(overlay); // Use <html> for max visibility
    }
    overlay.textContent = enabled ? '🌙 Dark Mode ON' : '☀️ Dark Mode OFF';
    overlay.style.opacity = '1';
    setTimeout(() => { overlay.style.opacity = '0'; }, 1200);
}

// Listen for toggle messages
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "TOGGLE_DARK_MODE") {
        if (msg.enabled) {
            injectDarkModeCSS();
        } else {
            removeDarkModeCSS();
        }
        showOverlay(msg.enabled);
    }
});

// // On load, apply dark mode if enabled
// chrome.storage.local.get(['darkModeEnabled'], (result) => {
//     if (result.darkModeEnabled) {
//         injectDarkModeCSS();
//     }
// });