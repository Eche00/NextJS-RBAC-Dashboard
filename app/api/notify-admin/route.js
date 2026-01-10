import { mailer } from "@/lib/mailer";
import { notifyAdminEmail } from "@/email-templates/notify-admin";

export async function POST(req) {
  const user = await req.json();

  await mailer.sendMail({
    to: process.env.ADMIN_EMAIL,
    from: process.env.EMAIL_USER,
    subject: "New Registration",
    html: notifyAdminEmail(user)
  });

  return Response.json({ sent: true });
}
