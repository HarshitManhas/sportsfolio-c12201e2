
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kxxgoxtarjgyegenvrms.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGdveHRhcmpneWVnZW52cm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2OTI5NDYsImV4cCI6MjA1NDI2ODk0Nn0.KqpGKOKBaxLAba7Ab2DMTibZUk81xlGFX0-tYKIQocQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
