import { Section, getMetadata } from '@headcode/server'

export const generateMetadata = async () => {
  return await getMetadata('pages.home')
}

const Page = () => {
  return <Section name="pages.home" />
}

export default Page
