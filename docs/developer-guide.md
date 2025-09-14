# Developer Guide

## Requirements
- Node.js v18+
- npm v9+
- Git

## Project Structure

main.js           → Main Electron process preload.js        → Secure bridge between UI & main store.js          → Data storage (bookmarks, history, settings) downloadManager.js → File download handler updater.js        → Auto-update logic ui/               → Frontend (HTML/CSS/JS) docs/             → Documentation

## Development
```bash
git clone https://github.com/yourusername/my-full-browser.git
cd my-full-browser
npm install
npm start

Contributing

1. Fork the repo


2. Create a branch


3. Submit a Pull Request



---

### 4. `docs/build-release.md`
```markdown
# Build & Release Guide

## Build Locally
```bash
npm run dist

Artifacts will be created inside dist/.

Auto-Update Setup

1. In package.json:



"publish": [
  { "provider": "generic", "url": "https://updates.yourdomain.com/" }
]

2. Upload latest.yml and installer files to your update server.


3. On app launch, MyBrowser will check for updates.



Code Signing

Windows: Requires an EV Code Signing Certificate.

macOS: Requires Apple Developer ID and notarization.
