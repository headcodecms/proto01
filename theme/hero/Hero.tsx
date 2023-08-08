import { PlaceholderImage, PlacholderRichText } from '@headcode/client'
import Image from 'next/image'

const Hero = ({
  img = PlaceholderImage,
  alt,
  fadeIn,
  body = PlacholderRichText,
  size = 'large',
  blocks = [
    {
      galleryvideo: {
        url: 'https://www.youtube.com/watch?v=gSSsZReIFRk',
      },
    },
    {
      galleryimg: {
        img,
        title: 'Gallery image',
        blocks: [],
      },
    },
  ],
}: any) => {
  return (
    <div className="w-full">
      {img.url && (
        <div className="w-24">
          <Image
            src={img.url}
            alt={img.alt}
            width={img.width}
            height={img.height}
          />
        </div>
      )}
      <span>Size: {size}</span>
      <h1 className="my-6 text-4xl">Body</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      {blocks &&
        blocks.map((item: any, index: number) => {
          if (item.galleryimg) return <div key={index}>{item.img}</div>
          if (item.galleryvideo) return <div key={index}>{item.url}</div>
          return null
        })}
      {blocks &&
        blocks.map(
          (item: any, index: number) =>
            item.galleryimg && (
              <div key={index}>
                <h1>Image Gallery</h1>
                <p>{item.img}</p>
              </div>
            )
        )}
    </div>
  )
}
export default Hero
