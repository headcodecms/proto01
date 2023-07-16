import Sections, { TYPE } from './components/Sections'

const CollectionsPage = () => {
  return (
    <div className="px-4 pb-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Collections</h1>
      <div className="py-6">
        <Sections type={TYPE.collections} />
      </div>
    </div>
  )
}

export default CollectionsPage
