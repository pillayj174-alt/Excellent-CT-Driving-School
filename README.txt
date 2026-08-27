Excellent CT Driving School — V7 Online Owner System

IMPORTANT SECURITY:
- Only the Supabase URL and publishable key are included in the website.
- NEVER put a Supabase secret/service-role key into GitHub or browser JavaScript.
- The secret key supplied during setup should be rotated/revoked in Supabase because it was exposed in chat.

SETUP:
1. Open the Supabase project SQL Editor.
2. Run supabase-schema.sql.
3. In Supabase Authentication > Users, create an owner user:
   Email: emim05@gmail.com
   Password: emimect05
   Confirm the user/email as required by your Auth settings.
4. Upload all files to GitHub Pages.

ONLINE FLOW:
- Customer booking is inserted into public.bookings and then WhatsApp opens for a direct enquiry.
- Customer review is inserted into public.reviews as pending.
- Owner logs in through admin.html using Supabase Auth.
- Owner dashboard reads online bookings/reviews and can change booking status, approve/hide reviews, delete records, and export bookings.
- Public site only displays approved reviews.

The existing dark Hero, services, pricing, licence departments, Boksburg location, email, WhatsApp CTAs and animations are retained.


V7.1 restoration notes:
- Restores/retains the full public website: premium dark hero, Boksburg location, services, pricing, licence departments, FAQs, reviews, contact section and WhatsApp CTAs.
- Retains the Supabase online bookings/reviews integration.
- Retains the Owner Login and Owner Dashboard.
- Owner access is restricted in the frontend to emim05@gmail.com, with database policies also restricted to that email.
- Supabase client configuration contains only the project URL and publishable key. Never place the Supabase secret key in this repository.
- Updated old FAQ pricing that referenced R4,500/R3,800 so it no longer conflicts with the current pricing.
