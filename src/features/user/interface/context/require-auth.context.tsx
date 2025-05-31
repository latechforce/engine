import { authClient } from '@/user/interface/lib/auth.lib'
import { Navigate } from '@tanstack/react-router'

export const RequireAuth = ({ children, to }: { children: React.ReactNode; to: string }) => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <Navigate
        to={to}
        replace
      />
    )
  }

  return children
}
