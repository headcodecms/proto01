import Users from './components/Users'
import DBService from '../services/DBService'
import { ROLES } from '../utils/db'

const Page = async () => {
  return <Users users={await DBService.getRoles(ROLES.new)} />
}

export default Page
