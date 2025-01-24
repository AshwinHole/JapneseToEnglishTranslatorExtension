# Japanese Meet Translator Extension

A Chrome extension that provides real-time Japanese to English translation during Google Meet calls. This extension helps break down language barriers by automatically detecting Japanese speech and providing instant English translations.

## Features

This extension enhances Google Meet conversations by offering:

- Real-time Japanese speech detection and recognition
- Instant English translation of Japanese conversations
- Clean, floating translation window within Google Meet
- Translation history in the extension popup
- Noise reduction and audio cleanup for better accuracy
- Support for continuous speech recognition

## Installation

To install the extension locally for development:

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The extension icon will appear in your Chrome toolbar

## Usage

1. Join a Google Meet call
2. Click the extension icon in your Chrome toolbar
3. Press the microphone button to start translation
4. Japanese speech will be automatically detected and translated
5. Translations appear in both the Meet window and extension popup
6. Click the stop button to end translation

## Technical Details

The extension utilizes several technologies:

- WebSpeech API for speech recognition
- MyMemory Translation API for Japanese to English translation
- Chrome Extension APIs for audio capture and processing
- Advanced audio preprocessing for noise reduction

## Privacy

This extension:
- Only processes audio when actively enabled
- Does not store any conversation data permanently
- Only translates detected Japanese speech
- Operates entirely in the browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Developer: Ashwin Hole
Email: ashwinhole18@gmail.com

## Acknowledgments

Thanks to:
- MyMemory Translation API for translation services
- Google Chrome Extensions platform
- Web Speech API for speech recognition capabilities