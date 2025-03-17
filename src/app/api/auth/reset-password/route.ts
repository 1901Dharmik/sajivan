import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { hashPassword } from "@/lib/auth"

export async function PUT(req: Request) {
  try {
    await dbConnect()
    const { token, password } = await req.json()

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred while resetting the password" }, { status: 500 })
  }
}

