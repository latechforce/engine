import { Button } from '../ui/button.ui'
import { createRoute, useNavigate } from '@tanstack/react-router'
import { rootRoute } from './root.layout'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-primary text-9xl font-bold">404</h1>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Page Not Found
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 min-[400px]:flex-row">
            <Button
              size="lg"
              onClick={() => navigate({ to: '..' })}
              variant="outline"
            >
              Go Back
            </Button>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/' })}
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/404',
  component: NotFoundPage,
  head: () => ({
    meta: [
      {
        title: '404 - Page Not Found',
      },
    ],
  }),
})
