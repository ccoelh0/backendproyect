import { createTransport } from "nodemailer";
import twilio from "twilio";

export const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL_ADMIN,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const emailToConfirmLogin = (body) => ({
  from: process.env.NODEMAILER_EMAIL_ADMIN,
  to: process.env.NODEMAILER_EMAIL_ADMIN,
  subject: "Nuevo usuario dado de alta",
  html: `
    <h1>Nuevo usuario dado de alta</h1>
    <div>
      <h4>Informacion:</h4>
      <ul>
        <li>Email: ${body.username}</li>
      </ul>
    </div>
  `,
});

export const emailOptionsConfirmPurchase = (username, items) => ({
  from: process.env.NODEMAILER_EMAIL_ADMIN,
  to: process.env.NODEMAILER_EMAIL_ADMIN,
  subject: `Nuevo pedido de ${username}`,
  html: `
    <h1>Nuevo pedido de ${username}</h1>
    <div>
      <h4>Informacion:</h4>
      <ul>${items.map((x) => `<li>Producto con codigo: ${x}</li>`).join(" ")}</ul>
    </div>
  `,
});

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export const sendWp = (body) => {
  return client.messages.create({
    body: `
      Nuevo pedido de ${body.email}
      Informacion: ${body.items.map((x) => x).join(" ")}
      `,
    from: "whatsapp:+14155238886",
    to: `whatsapp:${process.env.ADMIN_PHONE}`,
  });
};

export const sendMsg = (body, phone) => {
  return client.messages.create({
    to: `+54${phone}`,
    from: "+12512996293",
    body: `
      Nuevo pedido de ${body.email}
      Informacion: ${body.items.map((x) => x.name).join(" ")} `,
  });
};
