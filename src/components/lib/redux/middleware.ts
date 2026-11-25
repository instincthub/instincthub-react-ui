/* Core */
import type { Middleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

const createActionLogger = (): Middleware =>
  createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    colors: {
      title: () => '#139BFE',
      prevState: () => '#1C5FAF',
      action: () => '#149945',
      nextState: () => '#A47104',
      error: () => '#ff0005',
    },
    predicate: () => typeof window !== 'undefined',
  })

/**
 * Store middleware for `reduxStore`. redux-logger prints every action and the
 * full prev/next state to the browser console, so it is only added outside
 * production. `process.env.NODE_ENV` is left in the bundle on purpose: the
 * consuming app's bundler (Next.js, Vite) replaces it at build time.
 */
export const createMiddleware = (
  nodeEnv: string | undefined = process.env.NODE_ENV
): Middleware[] => (nodeEnv === 'production' ? [] : [createActionLogger()])

const middleware: Middleware[] = createMiddleware()

export { middleware }
