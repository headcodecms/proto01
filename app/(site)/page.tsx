import { Section, getMetadata } from '@headcode/server'

export const generateMetadata = async () => {
  return await getMetadata('pages.home')
}

// editable must be detected automatically when VisualEditoButton is added
const Page = () => {
  return (
    <>
      <Section name="pages.home" />
    </>
  )
}

export default Page
