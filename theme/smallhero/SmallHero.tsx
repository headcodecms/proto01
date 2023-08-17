const SmallHero = ({ title = 'Title', description = 'Description' }) => {
  return (
    <div className="bg-gradient-to-br from-sky-100 to-sky-50 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="my-6 text-lg font-light leading-6 md:text-xl md:leading-8">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SmallHero
