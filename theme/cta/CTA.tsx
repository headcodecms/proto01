import { PlaceholderText } from '@headcode/client'
import Link from 'next/link'

const CTA = ({
  title = 'CTA title',
  description = PlaceholderText,
  link = { url: '/login', title: 'Get started', newWindow: false },
}) => {
  return (
    <div className="bg-gradient-to-bl from-sky-500 to-sky-600 py-24 text-white md:py-36">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="my-6 text-xl leading-8 text-sky-200">{description}</p>
          <div className="mt-12">
            <Link
              className="rounded-md bg-white px-4 py-2.5 text-lg font-medium text-sky-700 shadow-sm hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-100 md:px-5 md:py-3 md:text-xl"
              href={link.url}
            >
              {link.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTA
