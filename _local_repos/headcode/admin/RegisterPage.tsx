'use client'

import Banner from '../ui/Banner'
import Input from '../ui/Input'
import { PrimaryButton } from '../ui/Buttons'
import Link from 'next/link'
import { useState } from 'react'
import AuthService from '../services/AuthService'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthUser } from '../types'

const RegisterPage = () => {
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit } = useForm<AuthUser>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleRegister: SubmitHandler<AuthUser> = async (data) => {
    setError(null)
    setLoading(true)

    const newError = await AuthService.signUp(data.email, data.password)

    if (newError) {
      setError(newError)
      setLoading(false)
    } else {
      setSuccess(data.email)
    }
  }

  return (
    <>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Register an account
      </h2>
      {success ? (
        <Banner size="sm">
          Please close this browser window. Finish the registration and confirm
          the email sent to {success}.
        </Banner>
      ) : (
        <form onSubmit={handleSubmit(handleRegister)}>
          {error && (
            <Banner error={true} size="xs">
              {error}
            </Banner>
          )}
          <div className="my-9 space-y-3">
            <Input label="Email address" type="email" {...register('email')} />
            <Input label="Password" type="password" {...register('password')} />
          </div>
          <div>
            <PrimaryButton loading={loading} className="w-full" type="Register">
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
