import { LoginForm } from '@/client/component/login-form.component'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'

export const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gray-50 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          title="Admin Login"
          description="Login to your admin account"
          forgotPassword={false}
          signup={false}
          callbackURL="/_admin"
        />
      </div>
    </div>
  )
}

export const loginAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/_admin/login',
  component: LoginPage,
  head: () => ({
    meta: [
      {
        title: 'Login - Admin',
      },
      {
        name: 'description',
        content: `Login page for admin`,
      },
    ],
  }),
})
