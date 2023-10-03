import { PlaceholderImage, PlaceholderText } from '@headcode/client'
import clsx from 'clsx'
import Image from 'next/image'

const BlogHeroBase = ({
  img = PlaceholderImage,
  title = 'Title',
  excerpt = PlaceholderText,
  classExcerpt = 'prose-xl prose-gray',
}) => {
  return (
    <div className="pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!!img.url && (
          <div className="relative w-full">
            <Image
              className="aspect-[3/1] w-full object-cover"
              src={img.url}
              alt={img.alt}
              width={img.width}
              height={img.height}
            />
          </div>
        )}
        <div className="mt-12 max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className={clsx('prose', classExcerpt)}>{excerpt}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogHeroBase
