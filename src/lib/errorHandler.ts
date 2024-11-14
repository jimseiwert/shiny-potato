import { NextResponse } from "next/server"

export function handleError(error : unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ statusText: error.message }, { status: 400, statusText: error.message })
  }
  return NextResponse.json({ statusText: 'Internal Server Error' }, { status: 500 })
}