import { mailer } from "@/lib/mailer";
import { welcomeEmail } from "@/email-templates/welcome";

export async function POST(req) {
  const { email, name } = await req.json();

  await mailer.sendMail({
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Welcome!",
    html: welcomeEmail(name)
  });

  return Response.json({ sent: true });
}
