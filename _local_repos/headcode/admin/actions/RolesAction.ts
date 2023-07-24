'use server'

import { revalidatePath } from 'next/cache'
import DBService from '../../services/DBService'

export const handleSetRole = async (id: string, role: string, path: string) => {
  await DBService.setRole(id, role)
  revalidatePath(path)
}
