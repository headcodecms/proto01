'use client'

import { Menu } from '@headlessui/react'
import { DotPulse } from '@uiball/loaders'
import clsx from 'clsx'
import Link from 'next/link'

const primaryClassName =
  'relative inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300'
const dangerClassName =
  'relative inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
const secondaryClassName =
  'relative inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
const secondaryDangerClassName =
  'relative inline-flex items-center justify-center rounded-md border border-red-700 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'

export const PrimaryButton = ({
  loading,
  className,
  children,
  ...props
}: any) => (
  <button
    disabled={loading}
    type="button"
    className={clsx(className, primaryClassName)}
    {...props}
  >
    {loading ? (
      <>
        <div className="absolute">
          <DotPulse size={32} color="white" />
        </div>
        <span className="opacity-0">{children}</span>
      </>
    ) : (
      children
    )}
  </button>
)

export const SecondaryButton = ({ loading, className, children, ...props }: any) => (
  <button
    disabled={loading}
    type="button"
    className={clsx(className, secondaryClassName)}
    {...props}
  >
    {loading ? (
      <>
        <div className="absolute">
          <DotPulse size={32} color="white" />
        </div>
        <span className="opacity-0">{children}</span>
      </>
    ) : (
      children
    )}
  </button>
)

export const SecondaryMenuButton = ({ children, ...props }: any) => (
  <Menu.Button className={secondaryClassName} {...props}>
    {children}
  </Menu.Button>
)

export const PrimaryLink = ({ href, className, children, ...props }: any) => (
  <Link href={href} className={clsx(className, primaryClassName)} {...props}>
    {children}
  </Link>
)

export const SecondaryLink = ({ href, children, ...props }: any) => (
  <Link href={href} className={secondaryClassName} {...props}>
    {children}
  </Link>
)

export const DangerButton = ({ loading, className, children, ...props }: any) => (
  <button
    type="button"
    disabled={loading}
    className={clsx(className, dangerClassName)}
    {...props}
  >
    {loading ? (
      <>
        <div className="absolute">
          <DotPulse size={32} color="white" />
        </div>
        <span className="opacity-0">{children}</span>
      </>
    ) : (
      children
    )}
  </button>
)

export const SecondaryDangerButton = ({
  className,
  children,
  ...props
}: any) => (
  <button
    type="button"
    className={clsx(className, secondaryDangerClassName)}
    {...props}
  >
    {children}
  </button>
)