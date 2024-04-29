import dotenv from 'dotenv';
import path from 'path';
import nodeMailer from 'nodemailer';
import hbs, { HbsTransporter } from 'nodemailer-express-handlebars';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const transporter: HbsTransporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    partialsDir: path.join(__dirname, '../views/'),
    layoutsDir: path.join(__dirname, '../views/'),
    defaultLayout: '',
  },
  viewPath: path.join(__dirname, '../views/'),
  extName: '.hbs',
}));

export default transporter;
