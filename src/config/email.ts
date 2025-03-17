import nodemailer from "nodemailer";

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, text, html }: EmailData) {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

// Helper function to create password reset email
export function createPasswordResetEmail(resetUrl: string) {
  const text = `
    You requested a password reset for your account.
    Please click on the following link to reset your password:
    ${resetUrl}
    
    If you didn't request this, please ignore this email.
    This link will expire in 1 hour.
  `;

  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
      <p style="color: #666;">You requested a password reset for your account.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        If you didn't request this, please ignore this email.<br>
        This link will expire in 1 hour.
      </p>
    </div>
  `;

  return { text, html };
}

// Helper function to create order confirmation email
export function createOrderConfirmationEmail(
  order: any,
  isAdmin: boolean = false
) {
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const orderItemsHtml = order.orderItems
    .map(
      (item: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.product.name} 
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ${formatCurrency(item.product.price)}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ${formatCurrency(item.subtotal)}
      </td>
    </tr>
  `
    )
    .join("");

  const subject = isAdmin
    ? `New Order Received (#${order._id})`
    : `Order Confirmation (#${order._id})`;

  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: #333; text-align: center;">
        ${isAdmin ? "New Order Received" : "Thank You for Your Order!"}
      </h2>
      
      <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
        <h3 style="margin: 0 0 15px 0; color: #666;">Order Details</h3>
        <p style="margin: 5px 0; color: #666;">Order ID: ${order._id}</p>
        <p style="margin: 5px 0; color: #666;">Date: ${new Date(
          order.createdAt
        ).toLocaleString()}</p>
        <p style="margin: 5px 0; color: #666;">Payment Method: ${
          order.paymentMethod
        }</p>
      </div>

      <div style="margin: 20px 0;">
        <h3 style="margin: 0 0 15px 0; color: #666;">Items Ordered</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: center;">Quantity</th>
              <th style="padding: 10px; text-align: right;">Price</th>
              <th style="padding: 10px; text-align: right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">
                ${formatCurrency(order.totalPriceAfterDiscount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
        <h3 style="margin: 0 0 15px 0; color: #666;">Shipping Information</h3>
        <p style="margin: 5px 0; color: #666;">
          ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}<br>
          ${order.shippingInfo.address}   ${order.shippingInfo.landmark}<br>
          ${order.shippingInfo.city}, ${order.shippingInfo.state} ${
    order.shippingInfo.pincode
  }<br>
          Phone: ${order.shippingInfo.phone}
        </p>
      </div>

      ${
        isAdmin
          ? `
        <div style="margin: 20px 0; text-align: center;">
          <a href="${process.env.NEXTAUTH_URL}/admin/orders/${order._id}" 
             style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            View Order Details
          </a>
        </div>
      `
          : ""
      }

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666;">
        <p style="margin: 5px 0; font-size: 14px;">
          ${
            isAdmin
              ? "This is an automated notification for a new order."
              : "Thank you for shopping with us!"
          }
        </p>
      </div>
    </div>
  `;

  const text = isAdmin
    ? `New order received (#${order._id})\nTotal: ${formatCurrency(
        order.totalPriceAfterDiscount
      )}`
    : `Thank you for your order (#${order._id})\nTotal: ${formatCurrency(
        order.totalPriceAfterDiscount
      )}`;

  return { subject, text, html };
}
