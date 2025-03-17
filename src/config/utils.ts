import { compare, hash } from "bcryptjs"
import crypto from "crypto"

export async function hashPassword(password: string) {
  return await hash(password, 12)
}

export async function verifyPassword(password: any, hashedPassword: string) {
  return await compare(password, hashedPassword)
}

export function generateResetToken() {
  return crypto.randomBytes(20).toString("hex")
}
