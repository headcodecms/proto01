'use client'

import MediaLibrary from './components/MediaLibrary'

const Page = () => {
  return (
    <MediaLibrary
      show={true}
      handleSelected={() => console.log('handleSelected')}
    />
  )
}

export default Page
