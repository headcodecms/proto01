import { PlaceholderText } from '@headcode/client'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'next/link'

const Plans = ({
  title = 'Title',
  description = PlaceholderText,
  blocks = [
    {
      name: 'plan',
      fields: {
        name: 'Plan Name',
        price: '$10',
        action: {
          url: '#',
          title: 'Action',
          newWindow: false,
        },
        description: PlaceholderText,
        popular: false,
      },
      blocks: [
        {
          name: 'feature',
          fields: {
            feature: 'Feature 1',
          },
        },
        {
          name: 'feature',
          fields: {
            feature: 'Feature 2',
          },
        },
      ],
    },
    {
      name: 'plan',
      fields: {
        name: 'Plan Name',
        price: '$20',
        action: {
          url: '#',
          title: 'Action',
          newWindow: false,
        },
        description: PlaceholderText,
        popular: true,
      },
      blocks: [
        {
          name: 'feature',
          fields: {
            feature: 'Feature 1',
          },
        },
        {
          name: 'feature',
          fields: {
            feature: 'Feature 2',
          },
        },
        {
          name: 'feature',
          fields: {
            feature: 'Feature 3',
          },
        },
      ],
    },
    {
      name: 'plan',
      fields: {
        name: 'Plan Name',
        price: '$30',
        action: {
          url: '#',
          title: 'Action',
          newWindow: false,
        },
        description: PlaceholderText,
        popular: false,
      },
      blocks: [
        {
          name: 'feature',
          fields: {
            feature: 'Feature 1',
          },
        },
        {
          name: 'feature',
          fields: {
            feature: 'Feature 2',
          },
        },
        {
          name: 'feature',
          fields: {
            feature: 'Feature 3',
          },
        },
        {
          name: 'feature',
          fields: {
            feature: 'Feature 4',
          },
        },
      ],
    },
  ],
}) => {
  return (
    <div className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text my-6 leading-6 text-gray-500">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          {blocks?.map((item: any, index: number) => (
            <div
              key={index}
              className={clsx(
                'space-y-6 rounded-xl  px-4 py-8 shadow-2xl',
                item.fields.popular
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-50 text-black'
              )}
            >
              <h3 className="text-5xl font-light">{item.fields.price}</h3>
              <h4 className="text-lg font-bold">{item.fields.name}</h4>
              <Link
                className={clsx(
                  'inline-block w-full rounded-md  px-4 py-2.5 text-center text-lg font-medium  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 md:px-5 md:py-3 md:text-xl',
                  item.fields.popular
                    ? 'bg-white text-sky-700 hover:bg-sky-200'
                    : 'bg-sky-600 text-white hover:bg-sky-500'
                )}
                href={item.fields.action.url}
              >
                {item.fields.action.title}
              </Link>
              <p
                className={clsx(
                  'text-sm leading-5',
                  item.fields.popular ? 'text-sky-200' : 'text-gray-500'
                )}
              >
                {item.fields.description}
              </p>
              <ul
                className={clsx(
                  'leading-8',
                  item.fields.popular ? 'text-sky-100' : 'text-gray-700'
                )}
              >
                {item.blocks.map((item2: any, index2: number) => (
                  <li key={index2} className="flex items-center space-x-2">
                    <span>
                      <CheckCircleIcon
                        className={clsx(
                          'h-6 w-6',
                          item.fields.popular ? 'text-white' : 'text-sky-500'
                        )}
                      />
                    </span>
                    <span>{item2.fields.feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Plans
