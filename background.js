let isTranslating = false;
let recognition = null;
let audioContext = null;
let mediaStream = null;

const API_KEY = "0f1a776134e6921086c6";
const API_EMAIL = "ashwinhole18@gmail.com";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleTranslation") {
        isTranslating = !isTranslating;
        if (isTranslating) {
            startCapture();
        } else {
            stopCapture();
        }
        sendResponse({ status: isTranslating });
        return true;
    }
});

async function startCapture() {
    try {
        // Get tab audio stream
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStream = stream;

        // Initialize speech recognition
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'ja-JP';

        recognition.onresult = async function(event) {
            if (!isTranslating) return;
            
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript;
            
            if (result.isFinal) {
                console.log('Captured speech:', transcript);
                const translation = await translateText(transcript);
                
                if (translation) {
                    broadcastTranslation(transcript, translation);
                }
            }
        };

        recognition.onerror = function(event) {
            console.error('Recognition error:', event.error);
        };

        recognition.start();
        console.log('Translation started');

    } catch (error) {
        console.error('Error starting capture:', error);
    }
}

function broadcastTranslation(japanese, english) {
    // Send to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'newTranslation',
            translation: { japanese, english }
        });
    });

    // Send to popup
    chrome.runtime.sendMessage({
        action: 'newTranslation',
        translation: { japanese, english }
    });
}

async function translateText(text) {
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ja|en&key=${API_KEY}&de=${API_EMAIL}`
        );
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return null;
    }
}

function stopCapture() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    console.log('Translation stopped');
}