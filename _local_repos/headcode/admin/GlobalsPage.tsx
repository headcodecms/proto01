import Sections, { TYPE } from './components/Sections'

const GlobalsPage = () => {
  return (
    <div className="px-4 pb-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Globals</h1>
      <div className="py-6">
        <Sections type={TYPE.globals} />
      </div>
    </div>
  )
}

export default GlobalsPage
