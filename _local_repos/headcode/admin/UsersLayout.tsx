const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <div className="py-6">{children}</div>
      </div>
    </>
  )
}

export default Layout
