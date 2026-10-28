import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type ContactEnquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  enquiry_type: string;
  message: string;
  created_at: string;
};

type ContactEnquiryInsert = {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  enquiry_type: string;
  message: string;
  created_at?: string;
};

type Database = {
  public: {
    Tables: {
      contact_enquiries: {
        Row: ContactEnquiry;
        Insert: ContactEnquiryInsert;
        Update: Partial<ContactEnquiryInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let supabaseClient: SupabaseClient<Database> | undefined;

export function getSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY configuration.');
  }

  supabaseClient ??= createClient<Database>(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
