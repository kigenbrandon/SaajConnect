/*
# Create contact enquiries table

1. New Tables
- `contact_enquiries`
- `id` (uuid, primary key) identifies each enquiry.
- `name` (text) stores the visitor's name.
- `email` (text) stores the visitor's email address.
- `phone` (text) stores an optional phone number.
- `enquiry_type` (text) stores whether the visitor is an employer, candidate, or general enquiry.
- `message` (text) stores the visitor's request.
- `created_at` (timestamptz) records when the enquiry was submitted.

2. Security
- Row-level security is enabled on `contact_enquiries`.
- Anonymous and authenticated visitors may submit enquiries.
- Anonymous and authenticated visitors may not read, edit, or delete enquiries from the browser.
- The insert policy is intentionally open because this public website has no sign-in screen; the form is the public intake point.

3. Important Notes
- The table is single-tenant and does not associate enquiries with user accounts.
- The website only needs insert access; management access can be added later through a protected staff workflow.
*/

CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  enquiry_type text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.contact_enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit contact enquiries" ON public.contact_enquiries;
CREATE POLICY "Public can submit contact enquiries"
ON public.contact_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
