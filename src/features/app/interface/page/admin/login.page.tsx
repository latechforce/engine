import { LoginForm } from '@/user/interface/component/login-form.component'
import { createRoute } from '@tanstack/react-router'
import { adminRoute } from '../router'

export const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gray-50 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          title="Admin Login"
          description="Login to your admin account"
          forgotPassword={false}
          signup={false}
          callbackURL="/admin"
        />
      </div>
    </div>
  )
}

export const loginAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/login',
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
