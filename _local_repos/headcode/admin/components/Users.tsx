import Banner from '../../ui/Banner'
import UserAction from './UserAction'

const Users = ({ users }: any) => {
  if (users.length === 0) {
    return <Banner size="sm">No new users registered.</Banner>
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-0 pr-3 text-left text-sm font-semibold text-gray-600"
            >
              Email
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-600 sm:table-cell"
            >
              Role
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="w-full max-w-0 py-4 pl-0 pr-3 text-sm font-medium text-gray-600 sm:w-auto sm:max-w-none sm:py-3">
                {user.email}
                <dl className="font-normal sm:hidden">
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-1 truncate text-gray-700">{user.role}</dd>
                </dl>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell sm:py-3">
                {user.role}
              </td>
              <td className="py-4 pl-3 pr-0 text-right text-sm font-medium sm:py-3">
                <UserAction user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
