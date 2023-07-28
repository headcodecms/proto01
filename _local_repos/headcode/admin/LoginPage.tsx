'use client'

import { useRouter } from 'next/navigation'
import Banner from '../ui/Banner'
import Input from '../ui/Input'
import Link from 'next/link'
import { PrimaryButton } from '../ui/Buttons'
import { useState } from 'react'
import AuthService from '../services/AuthService'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthUser } from '../types'

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit } = useForm<AuthUser>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin: SubmitHandler<AuthUser> = async (data) => {
    setError(null)
    setLoading(true)

    const newError = await AuthService.signIn(data.email, data.password)

    if (!newError) {
      router.push('/headcode/admin')
      router.refresh()
    } else {
      setError(newError)
      setLoading(false)
    }
  }

  const handleForgotPassword = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    alert('feature not implemented')
  }

  return (
    <>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <form onSubmit={handleSubmit(handleLogin)}>
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
          <PrimaryButton loading={loading} className="w-full" type="submit">
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
