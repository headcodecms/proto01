import config from '@/headcode.config'
import { ContainerSmall } from '../ui/Container'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContainerSmall>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Setup
      </h2>
      <div className="mb-4 mt-2 flex items-center space-x-3">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Create DB Schema
        </h3>
        <div>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-500">
            {config.version}
          </span>
        </div>
      </div>
      {children}
    </ContainerSmall>
  )
}

export default Layout
