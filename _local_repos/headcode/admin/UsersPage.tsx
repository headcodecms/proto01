import Users from './components/Users'
import DBService from '../services/DBService'

const Page = async () => {
  return <Users users={await DBService.getRoles()} />
}

export default Page
