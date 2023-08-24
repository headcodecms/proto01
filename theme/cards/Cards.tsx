import Link from 'next/link'
import Image from 'next/image'
import { PlaceholderImage } from '@headcode/client'
import Banner from '@/_local_repos/headcode/ui/Banner'

const Cards = ({
  title = 'Title',
  description = 'Description',
  blocks = [
    {
      name: 'card',
      fields: {
        img: PlaceholderImage,
        title: 'Title',
        description: 'Description text',
        link: {
          url: '#',
          title: 'More',
          newWindow: false,
        },
      },
    },
    {
      name: 'card',
      fields: {
        img: PlaceholderImage,
        title: 'Title',
        description: 'Description text',
        link: {
          url: '#',
          title: 'More',
          newWindow: false,
        },
      },
    },
    {
      name: 'card',
      fields: {
        img: PlaceholderImage,
        title: 'Title',
        description: 'Description text',
        link: {
          url: '#',
          title: 'More',
          newWindow: false,
        },
      },
    },
  ],
}: any) => {
  return (
    <div className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text my-6 leading-6 text-gray-500">{description}</p>
        </div>
        {blocks?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
            {blocks?.map((item: any, index: number) => (
              <div key={index} className="space-y-4">
                <div className="relative w-full">
                  {item.fields.img.url && (
                    <Image
                      className="aspect-[16/9] w-full object-cover"
                      src={item.fields.img.url}
                      alt={item.fields.img.alt}
                      width={item.fields.img.width}
                      height={item.fields.img.height}
                    />
                  )}
                </div>
                <h4 className="text-2xl font-bold">{item.fields.title}</h4>
                <p className="line-clamp-3 text-sm leading-5 text-gray-500">
                  {item.fields.description}
                </p>
                {item.fields.link.url.length > 0 ? (
                  <div>
                    <Link
                      className="text-gray-500 underline hover:text-gray-800"
                      href={item.fields.link.url}
                    >
                      {item.fields.link.title}
                    </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <Banner size="sm">No entries found.</Banner>
        )}
      </div>
    </div>
  )
}

export default Cards
