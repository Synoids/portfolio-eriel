import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encryptJWT(payload: import('jose').JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h') // Session expires in 2 hours
    .sign(key);
}

export async function decryptJWT(input: string): Promise<import('jose').JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const session = cookies().get('admin_session')?.value;
  if (!session) return null;
  return await decryptJWT(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session) return NextResponse.next();

  const parsed = await decryptJWT(session);
  if (!parsed) return NextResponse.next();

  // Refresh the session so it doesn't expire if the user is active
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'admin_session',
    value: await encryptJWT(parsed),
    httpOnly: true,
    expires,
  });
  return res;
}
