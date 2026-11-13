# Yoruba Academy — local MVP

## Run the web app

1. Unzip the package.
2. Open a terminal in the `yoruba-academy` folder.
3. Run `python3 -m http.server 8000`.
4. Open `http://localhost:8000` in Chrome.

The web app includes a curated English-to-Yoruba phrase dictionary, browser microphone input where supported, a five-question quiz, and saved vocabulary stored locally in your browser. Speech playback requires an installed Yoruba (`yo`) system/browser voice. It will not pretend an English voice is Yoruba.

## Install Chrome extension

1. Open `chrome://extensions` in desktop Chrome.
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select the `extension` folder.
4. Open a YouTube video and turn on its **CC** captions.
5. Click the extension icon to enable or disable the learning overlay and optional speech.

**Important limitations:** The extension translates only a few exact caption phrases in its starter dictionary. It does not translate arbitrary videos or generate full AI dubbing. Browser Yoruba speech is attempted only when a Yoruba voice is installed. The overlay is page-wide, not positioned inside the video player. The extension does not access protected video audio.

## Next engineering milestones

- Backend translation API with a Yoruba-capable translation model, validation and error handling.
- Yoruba native-speaker recordings / validated speech synthesis, including tone accuracy.
- Video caption parsing and time alignment with a real translation service, caching and rate limits.
- Speech-to-speech Yoruba dubbing with audio mixing, playback synchronization and supported-site permissions.
- Optional user accounts and cross-device vocabulary sync.

Never embed provider API keys in browser JavaScript or the extension. Use a backend environment variable and server-side endpoints.