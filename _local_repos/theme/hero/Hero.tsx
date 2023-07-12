import { ImgPlaceholder } from '@headcode'

const Hero = (
  { img, alt, fadeIn, size = 'large', blocks } = {
    img: ImgPlaceholder,
    alt: 'default alt',
    fadeIn: true,
    size: 'medium',
    blocks: [
      {
        galleryvideo: {
          url: 'https://www.youtube.com/watch?v=gSSsZReIFRk',
          // blocks: []
        },
      },
      {
        galleryimg: {
          img: ImgPlaceholder,
          title: 'Gallery image',
        },
      },
    ],
  }
) => {
  console.log('Hero', img, alt, fadeIn, size, blocks)

  return (
    <div className="w-full">
      <div data-image={img} className="w-24" />
      <span>Size: {size}</span>
      {blocks && blocks.map((item: any, index: number) => {
        if (item.galleryimg) return <div key={index}>{item.img}</div>
        if (item.galleryvideo) return <div key={index}>{item.url}</div>
        return null
      })}
      {blocks && blocks.map(
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
