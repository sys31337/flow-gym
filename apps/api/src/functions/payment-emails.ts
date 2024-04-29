import sendEmail from '../utils/send-email';

interface OfferSubscriptionProps {
  paymenthMethod: string;
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number
  productName?: string;
  offerName?: string;
  email: string;
  invoiceId: string;
  amount: number;
  transactionDate: Date;
  actionUrl?: string;
}

export const offerSubscriptionEmail = async ({
  paymenthMethod, productName, offerName, email, invoiceId, amount, transactionDate, brand, last4, expMonth, expYear,
}: OfferSubscriptionProps) => {
  try {
    const paymenthMethodName = paymenthMethod.replace('card', 'Carte de crédit')
      .replace('apple_pay', 'Apple Pay')
      .replace('google_pay', 'Google Pay');
    const offerLabel = offerName?.replace('business', 'Offre Business').replace('pro', 'Offre PRO');
    const emailContext = {
      to: email,
      subject: `${process.env.SITE_NAME} - Payment successful`,
      context: {
        amount,
        invoiceId,
        paymenthMethodName,
        ...(paymenthMethod === 'card' && { brand, last4, expMonth, expYear }),
        ...(offerName && { offerLabel }),
        ...(productName && { productName }),
        transactionDate: transactionDate.toLocaleDateString('fr'),
        actionUrl: `${process.env.FRONT_URL}`,
      },
    };
    await sendEmail(emailContext, 'payment-success');
    return true;
  } catch (error) {
    return error;
  }
};

export const holder = '';
