import { PlacholderRichText } from "@headcode/client"

const CopyText = ({text = PlacholderRichText}) => {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-gray" dangerouslySetInnerHTML={{__html: text}} />
      </div>
    </div>
  )
}

export default CopyText
