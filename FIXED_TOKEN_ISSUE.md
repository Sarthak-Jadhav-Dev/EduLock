
# Fixed: "Failed to retrieve access token"

I have updated the `SecureMaterialViewer.tsx` component to correctly handle the response from the Python backend.

**Issue:** The frontend expected `{ token: "..." }` but the backend returned `{ type: "document", pages: "/document/{TOKEN}/pages" }`.

**Fix:** I updated the code to extract the token from the `pages` URL (or `playlist` URL for videos).

Please **reload the page** and try viewing the document again. It should work now.
