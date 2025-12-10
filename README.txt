Night Owl Bar — v62 (Fresh Code + Admin Login)
==============================================
Pages:
- index.html (Home), menu.html, specials.html, book.html, visit.html, member.html, contact.html
- admin.html (Admin Panel with login)

Admin Login:
- Username: admin
- Password: nightowl2025
- Session-only: when the tab/window closes, login resets.

Admin Features:
- Manage Menu, Specials, Members, Bookings
- CSV Export/Import (Excel-friendly) + CSV templates
- Data stored in browser localStorage (no backend required)

Popup Offer:
- Random rotating offer (one per session on first page opened)
- Semi-transparent black background, fade-in + zoom
- Close (✕) button

How to run:
- Unzip, open index.html in your browser.
- To reset sample data, clear Site Data in the browser.

Notes:
- Admin link is hidden from navigation; open admin.html directly.
- All images are under /assets and wired to each page.

Hidden Admin:
- Press Ctrl+Shift+A on any page to open a passport popup.
- Access key: nightowlpass (then login admin/nightowl2025).

Admin Menu editor now supports categories (Cocktails, Wines, Snacks).
CSV includes: id, category, name, desc, price

Admin updates:
- Menu editor supports categories + Edit (click Edit to load into form, then Update via Add button).
- Specials supports Edit the same way.
- Shortcut works with Ctrl/⌘ + Shift + A.

Bookings update:
- Booking form now collects Email.
- Admin Bookings table shows Email column.
- Confirm button opens email draft (mailto:) with booking details in English.

Bookings update v72:
- Admin Bookings table now shows a Status column.
- Clicking Confirm sets status to 'Confirmed' and sends email draft.

Bookings status:
- New bookings start as Pending.
- Click Confirm in Admin to set status to Confirmed and open an email draft.
- Use the filter (All/Pending/Confirmed) above the table.
