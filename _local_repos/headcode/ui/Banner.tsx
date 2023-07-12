'use client'

import { RaceBy } from '@uiball/loaders'

const Banner = ({
  size,
  loading,
  error,
  children,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  error?: any
  children?: React.ReactNode
}) => {
  let height = 'h-48'
  if (size && size === 'sm') {
    height = 'h-24'
  } else if (size && size === 'lg') {
    height = 'h-96'
  } else if (size && size === 'xl') {
    height = 'h-[36rem]'
  } else if (size && size === 'xs') {
    height = 'h-16'
  }

  const colors = error ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'

  return (
    <div className={`${height} ${colors} rounded text-sm`}>
      <div className="flex h-full items-center justify-center px-6">
        {loading ? (
          <div>
            <RaceBy size={64} lineWeight={2} speed={1.4} color="#6b7280" />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div>{children}</div>
            {error?.message && <div className="pt-4">{error.message}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Banner
