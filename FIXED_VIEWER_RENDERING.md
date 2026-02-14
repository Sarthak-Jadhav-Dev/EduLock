
# Fixed: Secure Viewer rendering "Lock Icon" only

**Issue:** The viewer was showing a "Secure Content" lock screen instead of the actual document pages. This is because the backend identifies PDFs as type "Document", but the frontend viewer was only checking for type "PDF".

**Fix:** I updated `SecureMaterialViewer.tsx` to treat materials with type "Document" (case-insensitive) as PDFs, triggering the image-based page viewer.

Please **reload the page** and try viewing the document again.
