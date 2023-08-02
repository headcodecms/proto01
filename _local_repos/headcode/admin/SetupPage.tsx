import { TABLES, table } from '../utils/db'
import config from '@/headcode.config'
import { PrimaryLink } from '../ui/Buttons'

const Page = () => {
  return (
    <>
      <div className="my-4 text-sm text-gray-500">
        <p className="my-2">
          The database is configured in your headcode.config.ts. You find it in
          the root folder of your app. The setup process automatically creates
          all tables, policies, storage, and optionally clones data from a
          previous version.
        </p>
        <h3 className="mt-2 font-bold">Tables:</h3>
        <ul className="mb-2">
          <li>{table(TABLES.sections)}</li>
          <li>{table(TABLES.roles)}</li>
        </ul>
        <h3 className="mt-2 font-bold">Storage:</h3>
        <ul className="mb-2">
          <li>headcode</li>
        </ul>
        {config.clone ? (
          <p>Data will be cloned from {config.clone}.</p>
        ) : (
          <p>No cloning of data configured.</p>
        )}
      </div>
      <div>
        <PrimaryLink href="/headcode/setup/execute" className="w-full">
          {config.clone ? `Clone from ${config.clone}` : 'Create tables'}
        </PrimaryLink>
      </div>
    </>
  )
}

export default Page
