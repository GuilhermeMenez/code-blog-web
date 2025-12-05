import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/authHandlers'
import { postHandlers } from './handlers/postHandlers'

export const worker = setupWorker(...authHandlers, ...postHandlers)
