import { createRoute, Link } from '@tanstack/react-router'
import { rootRoute } from './layout'

export const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="block text-4xl font-semibold text-gray-800 md:text-5xl lg:text-6xl dark:text-neutral-200">
                  LTF Engine
                </h1>
              </div>
              {/* End Title */}

              <div className="mt-5 max-w-3xl">
                <p className="text-lg text-gray-600 dark:text-neutral-400">
                  LTF Engine is a tool that helps you create web applications quickly and easily.
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex justify-center gap-3">
                <Link
                  className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                  to="/_admin"
                >
                  Open Admin
                  <svg
                    className="size-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </div>
  )
}

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  head: () => ({
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: `Home page`,
      },
    ],
  }),
})
