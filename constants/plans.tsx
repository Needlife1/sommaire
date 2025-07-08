export const plans = [
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
    paymentLink: '',
    priceId: '',
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
    // paymentLink:
    //   process.env.NODE_ENV === 'development'
    //     ? 'https://buy.stripe.com/test_bIY3eFcIugYp3YYeV0'
    //     : 'https://buy.stripe.com/28o00DgLf2P26DeV7',
    // priceId:
    //   process.env.NODE_ENV === 'development'
    //     ? 'price_1qkUfPBPnsISnc828hqeP9Lm'
    //     : 'price_1QktFBPnsISnc82t18EHibb',
    paymentLink: '',
    priceId: '',
  },
];
