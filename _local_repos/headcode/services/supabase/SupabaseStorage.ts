import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { StorageInterface } from '../../types'
import services from '@/headcode.services'

const upload = async (
  file: File,
  name: string,
  format: string
): Promise<string | null> => {
  const supabase = createClientComponentClient({
    supabaseUrl: services?.supabase?.url,
    supabaseKey: services?.supabase?.anon,
  })
  const bucket = services?.supabase?.storage?.bucket
  if (!bucket) return null
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`public/${name}`, file, {
      contentType: format,
    })

  //@ts-ignore
  if (error && error.statusCode === '409') {
    const prefix = Math.floor(Math.random() * Date.now()).toString(36)
    return await upload(file, `${prefix}-${name}`, format)
  }

  if (error) {
    return null
  }

  return data.path
}

const SupabaseStorage: StorageInterface = {
  upload,
}

export default SupabaseStorage
