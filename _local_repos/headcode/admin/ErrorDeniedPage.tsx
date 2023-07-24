'use client'

import React, { useState } from 'react'
import Banner from '../ui/Banner'
import { ContainerSmall } from '../ui/Container'
import { PrimaryButton } from '../ui/Buttons'
import { useCookies } from 'react-cookie'
import { TABLES, table } from '../utils/db'
import AuthService from '../services/AuthService'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [, , removeCookie] = useCookies([table(TABLES.roles)])
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogout = async () => {
    setLoading(true)
    await AuthService.signOut()
    removeCookie(table(TABLES.roles), { path: '/' })
    removeCookie(table('email'), { path: '/' })
    router.push('/headcode')
  }

  return (
    <ContainerSmall>
      <div className="py-6">
        <Banner error={true}>
          <p className="mb-1 text-lg font-bold">Access denied</p>
          <p>Please ask your site administrator to grant you access.</p>
        </Banner>
        <PrimaryButton
          loading={loading}
          className="mt-6 w-full"
          onClick={() => handleLogout()}
        >
          Logout
        </PrimaryButton>
      </div>
    </ContainerSmall>
  )
}

export default Page
