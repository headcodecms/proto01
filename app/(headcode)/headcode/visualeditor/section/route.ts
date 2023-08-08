import { DBService } from '@headcode/server'
import { NextResponse } from 'next/server'

export const GET = async (request: Request): Promise<NextResponse> => {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const slug = searchParams.get('slug')
  const locale = searchParams.get('locale')

  if (name) {
    const data = await DBService.getSection(name, slug, locale)
    if (data.length === 1) {
      return NextResponse.json(data[0])
    } else if (data.length === 0) {
      return NextResponse.json({ status: 'empty' })
    }
  }

  return NextResponse.json({ status: 'error' })
}
