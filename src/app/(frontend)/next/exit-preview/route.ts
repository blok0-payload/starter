import { draftMode } from 'next/headers'
import { NextResponse as Response } from 'next/server'
import { NextRequest as Request } from 'next/server'


export async function GET(): Promise<Response> {
  const draft = await draftMode()
  draft.disable()
  return new Response('Draft mode is disabled')
}
