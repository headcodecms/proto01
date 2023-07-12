import Sections, { TYPE } from './components/Sections'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="pb-2 text-lg font-semibold text-gray-900">
              Globals
            </h3>
            <Sections type={TYPE.globals} max={5} />
          </div>
          <div>
            <h3 className="pb-2 text-lg font-semibold text-gray-900">
              Collections
            </h3>
            <Sections type={TYPE.collections} max={5} />
          </div>
        </div>
        <div className="py-4 lg:py-6">
          <h3 className="pb-2 text-lg font-semibold text-gray-900">
            New Users
          </h3>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
