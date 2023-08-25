import { PlaceholderRichText } from '@headcode/client'
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BellAlertIcon, BoltIcon, BuildingStorefrontIcon, CameraIcon, ChatBubbleLeftRightIcon, CircleStackIcon, CloudIcon, Cog6ToothIcon, DocumentCheckIcon, IdentificationIcon, MegaphoneIcon, PencilSquareIcon, ShieldCheckIcon, TruckIcon,
} from '@heroicons/react/24/outline'

export const Icon = {
  analytics: ArrowTrendingUpIcon,
  banknotes: BanknotesIcon,
  bell: BellAlertIcon,
  bolt: BoltIcon,
  storefront: BuildingStorefrontIcon,
  chat: ChatBubbleLeftRightIcon,
  circles: CircleStackIcon,
  cloud: CloudIcon,
  cog: Cog6ToothIcon,
  document: DocumentCheckIcon,
  identification: IdentificationIcon,
  megaphone: MegaphoneIcon,
  edit: PencilSquareIcon,
  security: ShieldCheckIcon,
  truck: TruckIcon,
  camera: CameraIcon
}

const TextBlocks = ({
  blocks = [
    {
      name: 'block',
      fields: {
        icon: 'analytics',
        caption: 'Caption',
        title: 'Title',
        description: PlaceholderRichText,
      },
    },
    {
      name: 'block',
      fields: {
        icon: 'analytics',
        caption: 'Caption',
        title: 'Title',
        description: PlaceholderRichText,
      },
    },
    {
      name: 'block',
      fields: {
        icon: 'analytics',
        caption: 'Caption',
        title: 'Title',
        description: PlaceholderRichText,
      },
    },
  ],
}) => {
  return (
    <>
      <div id="features"></div>
      <div className="bg-gradient-to-br from-sky-100 to-sky-50 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-24">
            {blocks?.map((item: any, index: number) => {
              if (item.name !== 'block') return null

              //@ts-ignore
              const CurrentIcon = Icon[item.fields.icon]

              return (
                <div key={index} className="space-y-2">
                  <div className="mb-4">
                    <CurrentIcon className="h-10 w-10 rounded-lg bg-sky-400 p-1.5 text-sky-50" />
                  </div>
                  <p className="text-base font-medium text-sky-500">
                    {item.fields.caption}
                  </p>
                  <h3 className="text-2xl font-bold text-black">
                    {item.fields.title}
                  </h3>
                  <div
                    className="prose prose-lg prose-gray"
                    dangerouslySetInnerHTML={{
                      __html: item.fields.description,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default TextBlocks
