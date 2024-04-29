import dotenv from 'dotenv';
import path from 'path';
import { logError } from '.';
import transporter from '../config/nodemailer';

dotenv.config({ path: path.join(__dirname, '../../.env') });

declare interface EmailContextSchema {
  to: string | string[];
  cc?: string | string[];
  context: { [key: string]: string | number | Date };
  subject: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendEmail = async (emailContext: EmailContextSchema, template: string, calendarObj = null as any) => {
  try {
    const { to, cc, context, subject } = emailContext;
    const from = process.env.EMAIL_SENDER;
    const mailOptions = {
      from: `"${process.env.SITE_NAME}" ${from}`,
      to,
      cc,
      context,
      subject,
      template,
      ...(calendarObj && ({
        alternatives: [{
          contentType: 'text/calendar',
          'Content-Type': 'text/calendar',
          'Content-Class': 'urn:content-classes:calendarmessage',
          method: 'REQUEST',
          content: Buffer.from(calendarObj.toString()),
          component: 'VEVENT',
        }],
      })),
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') logError(error as string);
    return false;
  }
};

export default sendEmail;
