import Users from './components/Users'
import { ROLES } from '../services/db'
import supabaseDb from '../services/supabase/supabaseDb'
import config from '@/headcode.config'

const Page = async () => {
  const dbService = supabaseDb(config.services.supabase)
  return <Users users={await dbService.getRoles(ROLES.new)} />
}

export default Page
