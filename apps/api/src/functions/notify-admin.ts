import sendEmail from '../utils/send-email';

const notifyAdmin = async (notification: { title: string; information: string }) => {
  const { title, information } = notification;
  const ADMINS_EMAILS = process.env.ADMINS_EMAILS.split(' ');
  const emailContext = {
    to: ADMINS_EMAILS,
    subject: `[ADMIN] ${process.env.SITE_NAME} - ${title}`,
    context: { title, information },
  };
  await sendEmail(emailContext, 'notify-admin');
};

export default notifyAdmin;
