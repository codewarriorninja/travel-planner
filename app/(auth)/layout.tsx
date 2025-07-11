import { ReactNode } from 'react'
import { redirectAuthenticatedUser } from '@/lib/auth'

const AuthLayout = async ({children}:{children:ReactNode}) => {
  // Redirect authenticated users to dashboard
  await redirectAuthenticatedUser()

  return (
    <div>{children}</div>
  )
}

export default AuthLayout