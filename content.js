let translationContainer = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'newTranslation') {
        showTranslation(request.translation);
    }
});

function showTranslation(translation) {
    if (!translationContainer) {
        translationContainer = document.createElement('div');
        translationContainer.style.cssText = `
            position: fixed;
            right: 20px;
            bottom: 100px;
            width: 300px;
            max-height: 400px;
            overflow-y: auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 8px;
            padding: 15px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(translationContainer);
    }

    const translationDiv = document.createElement('div');
    translationDiv.style.cssText = `
        margin: 8px 0;
        padding: 10px;
        background: white;
        border-radius: 4px;
        border-left: 4px solid #1a73e8;
        animation: fadeIn 0.3s ease-out;
    `;

    const time = new Date().toLocaleTimeString();
    translationDiv.innerHTML = `
        <div style="font-size: 12px; color: #666;">${time}</div>
        <div style="font-size: 14px; color: #666;">JA: ${translation.japanese}</div>
        <div style="font-size: 16px;">EN: ${translation.english}</div>
    `;

    translationContainer.insertBefore(translationDiv, translationContainer.firstChild);

    // Remove after 10 seconds
    setTimeout(() => {
        translationDiv.style.opacity = '0';
        translationDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => translationDiv.remove(), 300);
    }, 10000);

    // Keep only last 10 translations
    while (translationContainer.children.length > 10) {
        translationContainer.removeChild(translationContainer.lastChild);
    }
}