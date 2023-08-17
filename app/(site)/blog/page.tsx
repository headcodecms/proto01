import { Section, getMetadata } from '@headcode/server'

export const generateMetadata = async () => {
  return await getMetadata('blog.overview')
}

const Page = () => {
  return <div>Blog overview</div>
}

export default Page
