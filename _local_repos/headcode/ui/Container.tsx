export const ContainerSmall = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-36 py-12 px-4 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="text-center text-base uppercase font-medium text-gray-900">
        Headcode
      </h1>
      {children}
    </div>
  </div>
)