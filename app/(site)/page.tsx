import Hero from '@/theme/hero/Hero'
import { Section, getMetadata } from '@headcode/server'

export const generateMetadata = async () => {
  return await getMetadata('pages.about')
}

const Page = () => {
  return (
    <>
      <section className="space-y-4 bg-gray-900 py-6 text-white sm:space-y-6 sm:py-12 lg:space-y-8 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-8">
          <h1 className="text-4xl font-black">Homepage</h1>
        </div>
      </section>
      <section className="space-y-4 py-6 sm:space-y-6 sm:py-12 lg:space-y-8 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-8">
          <Section name="global.hero" editable={true} />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-8">
          <Section name="blog" slug="hello" editable={true} />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-8">
          <Hero />
        </div>
      </section>
    </>
  )
}

export default Page
