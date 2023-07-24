import Banner from "../ui/Banner"
import { PrimaryLink } from "../ui/Buttons"
import DBService from '../services/DBService'

const ExecuteSetupPage = async () => {
  await DBService.setup()

  return (
    <>
      <div className="my-4">
        <Banner size="xs">Setup successful.</Banner>
      </div>
      <div>
        <PrimaryLink href="/headcode/admin" className="w-full">
          Open Dashboard
        </PrimaryLink>
      </div>
    </>
  )
}

export default ExecuteSetupPage
