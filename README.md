# MyBrowser - skeleton

## Jalankan (dev)
1. install deps

npm install

2. jalankan

npm start

## Build & Auto-update
1. install dev deps (sudah di package.json)
2. build artifacts

npm run dist

3. Upload hasil `dist/` (.exe/.dmg/.AppImage dan file update YAML/RELEASES) ke server kamu.

### Hosting update di domain
- Buat subdomain: `updates.yourdomain.com`
- Upload semua artifact hasil build dan file `latest.yml` / `RELEASES` yang dihasilkan electron-builder.
- Pastikan `build.publish` di package.json diarahkan ke type `generic` dan `url` ke `https://updates.yourdomain.com/`

Contoh `build.publish`:
```json
"publish": [{ "provider": "generic", "url": "https://updates.yourdomain.com/" }]
