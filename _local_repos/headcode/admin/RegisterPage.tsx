'use client'

import { useFormik } from 'formik'
import config from '@/headcode.config'
import Banner from '../ui/Banner'
import Input from '../ui/Input'
import { PrimaryButton } from '../ui/Buttons'
import Link from 'next/link'
import { useState } from 'react'
import supabaseAuth from '../services/supabase/supabaseAuth'

const RegisterPage = () => {
  const [success, setSuccess] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, formikHelper) => {
      formikHelper.setStatus(null)

      const error = await authService.signUp(values.email, values.password)

      if (error) {
        formikHelper.setStatus(error)
      } else {
        setSuccess(true)
      }
    },
  })
  const authService = supabaseAuth(config.services.supabase)

  return (
    <>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Register an account
      </h2>
      {success ? (
        <Banner size="sm">
          Please close this browser window. Finish the registration and confirm
          the email sent to {formik.values.email}.
        </Banner>
      ) : (
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
              loading={formik.isSubmitting}
              className="w-full"
              type="Register"
            >
              Sign In
            </PrimaryButton>
          </div>
          <div className="mt-9 flex items-center justify-start">
            <div className="text-sm">
              <Link
                href="/headcode/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Back to login
              </Link>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default RegisterPage
