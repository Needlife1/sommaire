export const pricingPlans = [
  {
    name: 'Basic',
    price: 9,
    description: 'Perfect for occasional use',
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    id: 'basic',
    paymentLink:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_aFa3cv1ZBckn4Rs0b83ks00'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'price_1RsdUlHLUFB4hd6OCJDRLQtC'
        : '',
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For professionals and teams',
    items: [
      'Unlimited PDF summaries',
      'Priority processing',
      '24/7 priority support',
      'Markdown Export',
    ],
    id: 'pro',
    paymentLink:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_dRmfZh47JesvabM9LI3ks01'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'price_1RsdUlHLUFB4hd6Ox27neeST'
        : '',
  },
];
