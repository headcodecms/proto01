'use client'

import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import Banner from '../ui/Banner'
import Input from '../ui/Input'
import Link from 'next/link'
import { PrimaryButton } from '../ui/Buttons'
import { useState } from 'react'
import AuthService from '../services/AuthService'

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, formikHelper) => {
      formikHelper.setStatus(null)
      setLoading(true)

      const error = await AuthService.signIn(values.email, values.password)

      formikHelper.setStatus(error)
      if (!error) {
        router.push('/headcode/admin')
        router.refresh()
      } else {
        setLoading(false)
      }
    },
  })

  const handleForgotPassword = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    alert('feature not implemented')
  }

  return (
    <>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <form onSubmit={formik.handleSubmit} method="POST">
        {formik.status && (
          <Banner error={true} size="xs">
            {formik.status}
          </Banner>
        )}
        <div className="my-9 space-y-3">
          <Input
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            autoFocus
            required
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div>
          <PrimaryButton
            loading={loading}
            className="w-full"
            type="submit"
          >
            Sign In
          </PrimaryButton>
        </div>
        <div className="mt-9 flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/headcode/login/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </div>

          <div className="text-sm">
            <a
              href="#"
              onClick={handleForgotPassword}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginPage
