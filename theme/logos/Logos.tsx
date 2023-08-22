import { PlaceholderLogo } from '@headcode/client'
import Image from 'next/image'

const Logos = ({
  title = 'Logo list title',
  blocks = [
    {
      name: 'logo',
      fields: {
        logo: PlaceholderLogo,
      },
    },
    {
      name: 'logo',
      fields: {
        logo: PlaceholderLogo,
      },
    },
    {
      name: 'logo',
      fields: {
        logo: PlaceholderLogo,
      },
    },
    {
      name: 'logo',
      fields: {
        logo: PlaceholderLogo,
      },
    },
  ],
}) => {
  return (
    <div className="py-6 md:py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-center font-bold uppercase">{title}</h3>
        <div className="flex flex-nowrap items-center justify-center overflow-auto">
          {blocks?.map(
            (item: any, index: number) =>
              item.name === 'logo' && (
                <div
                  key={index}
                  className="mx-2.5 w-1/6 flex-none px-1 py-6 sm:mx-1.5 sm:w-[10%] sm:px-2"
                >
                  <Image
                    src={item.fields.logo.url}
                    alt={item.fields.logo.alt}
                    width={item.fields.logo.width}
                    height={item.fields.logo.height}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}

export default Logos
