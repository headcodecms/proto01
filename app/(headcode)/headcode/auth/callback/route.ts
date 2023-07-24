import { AuthCallbackService } from '@headcode/server'

export const GET = async (request: Request) => {
  return await AuthCallbackService.authCallback(request)
}
