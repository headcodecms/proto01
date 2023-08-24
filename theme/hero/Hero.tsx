import { PlaceholderText } from '@headcode/client'
import Link from 'next/link'

const Hero = ({
  title = 'Hero title',
  subtitle = PlaceholderText,
  cta = { url: '/login', title: 'Call to action', newWindow: false },
  more = { url: '#', title: 'More info', newWindow: false },
}) => {
  return (
    <div className="py-6 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto my-6 max-w-4xl text-center md:mb-16 md:mt-32">
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="my-6 text-lg font-light md:text-xl">{subtitle}</p>
          <div className="mt-12 flex items-center justify-center space-x-6">
            <Link
              className="rounded-md bg-sky-600 px-4 py-2.5 text-lg font-medium text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 md:px-5 md:py-3 md:text-xl"
              href={cta.url}
            >
              {cta.title}
            </Link>
            <Link
              className="text-base text-gray-500 hover:text-gray-800 hover:underline md:text-lg"
              href={more.url}
            >
              {more.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
