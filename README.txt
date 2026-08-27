Excellent CT Driving School — Services & Pricing V3

Services:
- Learner's Licence
- Driver's Licence (Code 08 / 10)
- Driving Lessons
- Roadworthy
- Licence Disk Renewal
- Truck Licence Disk Payment Plan

Pricing:
- Learner's Licence — R1,800
- Code 14 Learner's Licence — R2,500
- Motorbike Learner's Licence — R2,300
- Truck Hire — R1,500
- Code 08 / 10 Driver's Licence — WhatsApp for enquiry
- Driving Lessons — WhatsApp for enquiry
- Roadworthy — WhatsApp for enquiry
- Licence Disk Renewal — WhatsApp for enquiry
- Truck Licence Disk Payment Plan — WhatsApp for enquiry


V4 — Licence Departments:
- Alberton Licence Department
- Boksburg Licence Department
- Meyerton Licence Department
- Vereeniging Licence Department
- Xavier Junction Licence Department
- Langlaagte Licence Department
- Randdfontien Licence Department
- Mapopane Licence Department
- Added an "Inquire if you don't see your home town" WhatsApp CTA.
- Added Licence Departments to the main navigation.

OWNER PORTAL — TESTING
- Open admin.html from the published website.
- Owner login is configured for the requested email/password.
- Dashboard manages locally stored bookings/enquiries, customer reviews, and quick site settings.
- Reviews submitted publicly require owner approval before display.
- Bookings submitted through the website are stored locally and also open WhatsApp.
- Export Bookings downloads a CSV from the browser.

IMPORTANT: This GitHub Pages version uses browser localStorage/sessionStorage so it can be tested without a backend. It is NOT production-grade authentication or a shared database: data is browser-specific and the login credentials are present in client-side JavaScript. For a real public owner system, connect the dashboard to a backend/auth service (e.g. Supabase/Firebase) before using it for live customer data.


Owner Login flow V6.1:
- admin.html is the login page.
- Successful login redirects automatically to owner.html.
- Direct access to owner.html requires an active owner session; otherwise it redirects back to admin.html.
