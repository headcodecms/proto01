import supabaseDb from "../services/supabase/supabaseDb"
import Banner from "../ui/Banner"
import { PrimaryLink } from "../ui/Buttons"
import config from '@/headcode.config'

const ExecuteSetupPage = async () => {
  const dbService = supabaseDb(config.services.supabase)
  await dbService.setup()

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
