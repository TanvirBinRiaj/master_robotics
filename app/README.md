# Master Robotics app (offline, Android)

Offline WebView wrapper of the static book. The same HTML/CSS/JS as the web edition is bundled under `assets/book/` and rendered with `webview_flutter` (`loadFlutterAsset('assets/book/index.html')`); no server, works in airplane mode. Bundled chapter links stay in the reader; external http(s) links open in the system browser via `url_launcher`. Android back button walks WebView history first.

## Prerequisites

- Flutter 3.x
- Android SDK
- `flutter doctor --android-licenses`

## Workflow

Run from repo root BEFORE every build:

```bash
python3 tool/sync_book.py
```

Then:

```bash
flutter pub get
flutter build apk --release
```

APK path: `build/app/outputs/flutter-apk/app-release.apk`

`tool/sync_book.py` copies `*.html` + `assets/css/` + `assets/js/` into `app/assets/book/`, vendors Bootstrap Icons from `tool/vendor/bootstrap-icons/` (CDN `<link>` rewritten to local `vendor/bootstrap-icons/bootstrap-icons.min.css`), and injects `tool/mobile.css` for WebView touch/safe-area tuning. Originals are untouched.

## How offline works

- Book content bundled at `assets/book/`.
- Bootstrap Icons vendored locally (`assets/book/vendor/bootstrap-icons/` + `fonts/`).
- Google Fonts links left as-is: enhance when online, degrade gracefully to system fonts offline.

## Known gotcha: Flutter asset bundling

Flutter needs explicit per-directory asset entries — subdirectories are not bundled implicitly. `sync_book.py` auto-generates the per-dir `assets:` list in `app/pubspec.yaml`. Do not hand-edit the assets list.
