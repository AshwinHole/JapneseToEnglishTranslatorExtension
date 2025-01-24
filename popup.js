document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleTranslation');
    const statusDiv = document.getElementById('status');
    const translationsDiv = document.getElementById('translations');
    
    let isTranslating = false;

    chrome.storage.local.get('isTranslating', function(data) {
        isTranslating = data.isTranslating || false;
        updateUI(isTranslating);
    });

    toggleButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({action: 'toggleTranslation'}, function(response) {
            isTranslating = response.status;
            updateUI(isTranslating);
            chrome.storage.local.set({isTranslating: isTranslating});
        });
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'newTranslation') {
            addTranslation(request.translation);
        }
    });

    function addTranslation(translation) {
        const translationDiv = document.createElement('div');
        translationDiv.className = 'translation-item';
        
        const time = new Date().toLocaleTimeString();
        translationDiv.innerHTML = `
            <div class="time">${time}</div>
            <div>JA: ${translation.japanese}</div>
            <div>EN: ${translation.english}</div>
        `;
        
        translationsDiv.insertBefore(translationDiv, translationsDiv.firstChild);
        
        // Keep only last 50 translations
        while (translationsDiv.children.length > 50) {
            translationsDiv.removeChild(translationsDiv.lastChild);
        }
    }

    function updateUI(isActive) {
        toggleButton.textContent = isActive ? '⏹' : '⏺';
        toggleButton.style.background = isActive ? '#dc3545' : '#1a73e8';
        statusDiv.className = isActive ? 'status active' : 'status inactive';
        statusDiv.textContent = isActive ? 'Translation Active' : 'Translation Inactive';
    }
});