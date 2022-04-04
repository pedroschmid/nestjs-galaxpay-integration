const { GALAXPAY_ID, GALAXPAY_HASH }: NodeJS.ProcessEnv = process.env;

const scopeArray = [
  'customers.read',
  'customers.write',
  'plans.read',
  'plans.write',
  'transactions.read',
  'transactions.write',
  'webhooks.write',
  'cards.read',
  'cards.write',
  'card-brands.read',
  'subscriptions.read',
  'subscriptions.write',
  'charges.read',
  'charges.write',
  'boletos.read',
];

export const accessTokenBody = {
  grant_type: 'authorization_code',
  scope: scopeArray.join(' '),
};

export const accessTokenHeaders = () => {
  const token = `${GALAXPAY_ID}:${GALAXPAY_HASH}`;
  const base64Token: string = Buffer.from(token, 'binary').toString('base64');

  return { Authorization: `Basic ${base64Token}` };
};
