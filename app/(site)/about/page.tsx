import { Section, getMetadata } from '@headcode/server'

export const generateMetadata = async () => {
  return await getMetadata('pages.about')
}

const Page = () => {
  return <Section name="pages.about" />
}

export default Page
