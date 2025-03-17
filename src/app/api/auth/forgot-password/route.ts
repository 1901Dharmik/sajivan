import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { generateResetToken } from "@/lib/auth";
import { sendEmail, createPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, we still return a success message even if the email doesn't exist
      return NextResponse.json(
        {
          message:
            "If an account exists with that email, we sent a password reset link.",
        },
        { status: 200 }
      );
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    const { text, html } = createPasswordResetEmail(resetUrl);

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text,
      html,
    });

    return NextResponse.json(
      {
        message:
          "If an account exists with that email, we sent a password reset link.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}
