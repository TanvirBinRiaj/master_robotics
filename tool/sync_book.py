"""Sync the static book into the Flutter app's offline asset bundle.

Reads the book from the repo root, writes a self-contained copy to
app/assets/book/ with two app-only transforms (originals untouched,
so `node _build/validate.mjs` stays green):

1. The Bootstrap-Icons CDN <link> is rewritten to a vendored local copy
   (tool/vendor/bootstrap-icons/), so icons render with zero network.
2. A small app-only stylesheet (tool/mobile.css) is injected after
   prose.css for WebView touch/safe-area tuning.

Google Fonts links are left as-is: they enhance when online and fall
back to system fonts offline.

Run:  python3 tool/sync_book.py
"""

from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parent.parent
APP_BOOK = ROOT / "app" / "assets" / "book"
VENDOR = ROOT / "tool" / "vendor" / "bootstrap-icons"
MOBILE_CSS = ROOT / "tool" / "mobile.css"

CDN_PREFIX = "https://cdn.jsdelivr.net/npm/bootstrap-icons@"
LOCAL_ICONS = "vendor/bootstrap-icons/bootstrap-icons.min.css"
MOBILE_LINK = '<link rel="stylesheet" href="assets/css/mobile.css">'


def main() -> None:
    if not VENDOR.is_dir():
        sys.exit("missing tool/vendor/bootstrap-icons — download it first")
    if not MOBILE_CSS.is_file():
        sys.exit("missing tool/mobile.css")

    if APP_BOOK.exists():
        shutil.rmtree(APP_BOOK)
    (APP_BOOK / "assets" / "css").mkdir(parents=True)
    (APP_BOOK / "assets" / "js").mkdir(parents=True)

    # 1. Chapter / appendix / home pages, with app-only link rewrites.
    pages = sorted(ROOT.glob("*.html"))
    rewritten = 0
    for page in pages:
        html = page.read_text(encoding="utf-8")
        out = html
        for line in html.splitlines():
            if CDN_PREFIX in line and "bootstrap-icons" in line:
                start = line.find("href=\"") + len("href=\"")
                end = line.find("\"", start)
                out = out.replace(line[start:end], LOCAL_ICONS, 1)
                rewritten += 1
        anchor = 'href="assets/css/prose.css"'
        if anchor in out and MOBILE_LINK not in out:
            out = out.replace(
                '<link rel="stylesheet" href="assets/css/prose.css">',
                '<link rel="stylesheet" href="assets/css/prose.css">\n  ' + MOBILE_LINK,
                1,
            )
        (APP_BOOK / page.name).write_text(out, encoding="utf-8")

    # 2. Book CSS/JS verbatim + mobile add-on.
    for f in (ROOT / "assets" / "css").glob("*.css"):
        shutil.copy2(f, APP_BOOK / "assets" / "css" / f.name)
    for f in (ROOT / "assets" / "js").glob("*.js"):
        shutil.copy2(f, APP_BOOK / "assets" / "js" / f.name)
    shutil.copy2(MOBILE_CSS, APP_BOOK / "assets" / "css" / "mobile.css")

    # 3. Vendored icon font. The CSS references fonts/ relative to itself,
    # so the binaries must sit in a fonts/ subdirectory.
    dest_vendor = APP_BOOK / "vendor" / "bootstrap-icons"
    shutil.copytree(VENDOR, dest_vendor)
    fonts_dir = dest_vendor / "fonts"
    fonts_dir.mkdir(exist_ok=True)
    for f in list(dest_vendor.glob("*.woff2")) + list(dest_vendor.glob("*.woff")):
        f.rename(fonts_dir / f.name)

    # 4. Explicit per-directory asset manifest: some Flutter toolchains only
    # bundle top-level files of a declared directory, so list every dir.
    pubspec = ROOT / "app" / "pubspec.yaml"
    text = pubspec.read_text(encoding="utf-8")
    start = text.find("  assets:\n")
    assert start != -1
    dirs = sorted(
        str(p.relative_to(ROOT / "app")) + "/"
        for p in [APP_BOOK, *sorted(x for x in APP_BOOK.rglob("*") if x.is_dir())]
    )
    block = "  assets:\n" + "".join(f"    - {d}\n" for d in dirs)
    end = text.find("\n\n", start)
    text = text[:start] + block + (text[end:] if end != -1 else "\n")
    pubspec.write_text(text, encoding="utf-8")

    n_assets = sum(1 for _ in APP_BOOK.rglob("*") if _.is_file())
    print(f"synced {len(pages)} pages ({rewritten} CDN links localized), {n_assets} files total -> {APP_BOOK}")


if __name__ == "__main__":
    main()
