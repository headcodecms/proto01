import { Section, getMetadata } from '@headcode/server'

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  console.log('metadata', slug)
  return await getMetadata('blog.overview')
}

const Page = ({ params: { slug } }: { params: { slug: string } }) => {
  return <Section name="blog" slug={slug} />
}

export default Page
