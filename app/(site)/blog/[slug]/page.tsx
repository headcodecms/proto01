import { Section, getMetadata } from '@headcode/server'

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  return await getMetadata('blog', slug)
}

const Page = ({ params: { slug } }: { params: { slug: string } }) => {
  return <Section name="blog" slug={slug} />
}

export default Page
