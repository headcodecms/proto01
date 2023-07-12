import supabaseDb from '../services/supabase/supabaseDb'
import config from '@/headcode.config'
import Users from './components/Users'

const Page = async () => {
  const dbService = supabaseDb(config.services.supabase)
  return <Users users={await dbService.getRoles()} />
}

export default Page
