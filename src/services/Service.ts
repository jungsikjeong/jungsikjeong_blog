import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

abstract class Service {
  protected supabase: SupabaseClient<Database>

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase
  }
}

export default Service
