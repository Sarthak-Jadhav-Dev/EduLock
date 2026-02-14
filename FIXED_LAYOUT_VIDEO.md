
# Fixed: PDF Scrolling & Video Playback Issues

**PDF Issue:** The user reported "initial pages are closed", implying layout issues where pages might have been cut off or not scrollable.
**Video Issue:** The user reported "can't view video".

**Fixes:**
1.  **PDF Layout:** Updated the container to `min-h-full` and `py-24` (padding top/bottom) to ensure the first and last pages are fully visible and not hidden behind the header/footer.
2.  **Video Support:** Added support for `mkv` and `mov` file types in the viewer logic. Improved the fallback message to clarify that HLS support is required (native in Safari, needs extension in Chrome/Firefox).

**Action:**
Please **reload the page**.
- Open the PDF -> Scroll up/down to see all pages.
- Open the Video -> If it doesn't play, try using Safari or install a "Native HLS Playback" extension for Chrome/Edge.
