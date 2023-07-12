'use server'

import config from '@/headcode.config'
import supabaseDb from '../../services/supabase/supabaseDb'
import { revalidatePath } from 'next/cache'

export const handleSetRole = async (id: string, role: string, path: string) => {
  const dbService = supabaseDb(config.services.supabase)
  await dbService.setRole(id, role)
  revalidatePath('/headcode/admin/users')
}
