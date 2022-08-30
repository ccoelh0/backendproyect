import {createTransport} from 'nodemailer'

const password = "dxoocsplpxjfrjru"

export const transporter = createTransport({
  service: 'gmail',
  port: 587, 
  auth: {
      user: process.env.NODEMAILER_EMAIL_ADMIN,
      pass: password
  }
});

export const emailOptionsLogin = (body) => ({
  from: process.env.NODEMAILER_EMAIL_ADMIN,
  to: process.env.NODEMAILER_EMAIL_ADMIN,
  subject: 'Nuevo usuario dado de alta',
  html: `
    <h1>Nuevo usuario dado de alta</h1>
    <div>
      <h4>Informacion:</h4>
      <ul>
        <li>Nombre: ${body.name}</li>
        <li>Email: ${body.username}</li>
        <li>Phone: ${body.phone}</li>
        <li>Adress: ${body.phone}</li>
      </ul>
    </div>
  `,
})

export const emailOptionsConfirmPurchase = (body) => ({
  from: process.env.NODEMAILER_EMAIL_ADMIN,
  to: process.env.NODEMAILER_EMAIL_ADMIN,
  subject: `Nuevo pedido de ${body.email}`,
  html: `
    <h1>Nuevo pedido de ${body.email}</h1>
    <div>
      <h4>Informacion:</h4>
      <ul>${body.items.map(x => `<li>${x.name}</li>`).join(' ')}</ul>
    </div>
  `,
})