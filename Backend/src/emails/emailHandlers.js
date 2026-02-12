import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chat App",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Failed to send welcome email:", error);
  }
  console.log("welcome to chat app", data);
};
