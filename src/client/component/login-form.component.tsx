import { cn } from '@/client/lib/utils.lib'
import { Button } from '@/client/ui/button.ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/client/ui/card.ui'
import { Input } from '@/client/ui/input.ui'
import { Label } from '@/client/ui/label.ui'
import { useState } from 'react'
import { authClient } from '../lib/auth.lib'
import { Checkbox } from '@/client/ui/checkbox.ui'
import { AlertDestructive } from './alert.component'

export type LoginFormProps = React.ComponentPropsWithoutRef<'div'> & {
  title?: string
  description?: string
  emailLabel?: string
  emailPlaceholder?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  forgotPassword?: boolean
  forgotPasswordLabel?: string
  forgotPasswordLink?: string
  rememberMeLabel?: string
  signinLabel?: string
  signup?: boolean
  signupLabel?: string
  signupLink?: string
  signupLinkLabel?: string
  callbackURL?: string
}

export function LoginForm({
  className,
  title = 'Login',
  description = 'Login to your account',
  emailLabel = 'Email',
  emailPlaceholder = 'Enter your email',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Enter your password',
  forgotPassword = true,
  forgotPasswordLabel = 'Forgot your password?',
  forgotPasswordLink = '#',
  rememberMeLabel = 'Remember me',
  signinLabel = 'Sign in',
  signup = true,
  signupLabel = 'Don&apos;t have an account?',
  signupLink = '#',
  signupLinkLabel = 'Sign up',
  callbackURL,
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
      callbackURL,
    })
    if (error?.message) {
      setError(error.message)
    }
  }

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{passwordLabel}</Label>
                  {forgotPassword && (
                    <a
                      href={forgotPasswordLink}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      {forgotPasswordLabel}
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder={passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked === 'indeterminate' ? false : checked)
                  }
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {rememberMeLabel}
                </label>
              </div>
              {error && (
                <AlertDestructive
                  title="Login failed"
                  description={error}
                />
              )}
              <Button
                type="submit"
                className="w-full"
              >
                {signinLabel}
              </Button>
            </div>
            {signup && (
              <div className="mt-4 text-center text-sm">
                {signupLabel}
                <a
                  href={signupLink}
                  className="underline underline-offset-4"
                >
                  {signupLinkLabel}
                </a>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
