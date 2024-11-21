'use server'
 
import { cookies } from 'next/headers'
 
export async function CreateCookie(claims: string[]) {
  const cookieStore = await cookies()
  await cookieStore.set('claims', 'jim')
  //cookieStore.set('claims', claims.toString(), { secure: true })
}