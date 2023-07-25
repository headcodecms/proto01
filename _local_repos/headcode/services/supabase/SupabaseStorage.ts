import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ImageData, StorageInterface } from '../../types'
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
    console.error('Error uploading image', error)
    return null
  }

  return data.path
}

const getPublicUrl = (path: string): string => {
  const version = services.supabase?.storage?.version
  const bucket = services.supabase?.storage?.bucket
  const url = services.supabase?.url

  if (path.startsWith('https://') || path.startsWith('http://')) {
    return path
  }

  return `${url}/storage/${version}/object/public/${bucket}/${path}`
}

const list = async (limit?: number, offset?: number): Promise<ImageData[]> => {
  const supabase = createClientComponentClient({
    supabaseUrl: services?.supabase?.url,
    supabaseKey: services?.supabase?.anon,
  })

  const bucket = services?.supabase?.storage?.bucket
  if (!bucket) return []

  const { data, error } = await supabase.storage.from(bucket).list('public', {
    limit: limit ?? 100,
    offset: offset ?? 0,
    sortBy: {
      column: 'updated_at',
      order: 'desc',
    },
  })

  if (error) {
    console.error('Error getting image data', error)
    return []
  }

  const filtered = data.filter((item) => item.metadata.size > 0)
  return filtered.map((item) => ({
    name: item.name,
    url: `public/${item.name}`,
    alt: '',
    width: 0,
    height: 0,
    size: item.metadata.size,
    format: item.metadata.mimetype,
  }))
}

const SupabaseStorage: StorageInterface = {
  upload,
  getPublicUrl,
  list,
}

export default SupabaseStorage
