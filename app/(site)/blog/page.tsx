import Cards from '@/theme/cards/Cards'
import { DBService, findSectionData, getMetadata } from '@headcode/server'

export const generateMetadata = async () => {
  return await getMetadata('blog.overview')
}

const Page = async () => {
  const data = await DBService.findCollections('blog')
  const blocks = data.map((item) => {
    const sectionName = 'headcodecms/theme-proto:BlogHeroSection'
    const section = findSectionData(item, sectionName, 'blog', item.name)
    return section
      ? {
          name: 'card',
          fields: {
            img: section.fields.img,
            title: section.fields.title,
            description: section.fields.excerpt,
            link: {
              url: `/blog/${item.slug}`,
              title: 'Read more',
              newWindow: false,
            },
          },
        }
      : null
  })

  return (
    <Cards
      title="Our News"
      description="Find news and tutorials for our reMARK service."
      blocks={blocks}
    />
  )
}

export default Page
