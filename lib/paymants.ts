import Stripe from 'stripe';
import { getDbConnection } from './db';

export const handleSubscriptionDeleted = async ({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
    }) => {
    console.log('Subscription deleted:', subscriptionId);
    
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const sql = await getDbConnection();

        await sql`UPDATE users SET status = 'canceled' WHERE customer_id = ${subscription.customer}`;

    console.log('Subscription canceled successfully:', subscription);

    } catch (error) {
        console.error('Error handling subscription deletion', error);
        throw error;
    }
};

export const handleCheckoutSessionCompleted = async ({
    session,
    stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) => {
    console.log('Handling checkout session completed for session:', session.id);
    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    const priceId = session.line_items?.data[0]?.price?.id;

    if ('email' in customer && priceId) {
        const { email, name } = customer;

        const sql = await getDbConnection();

        
        await createOrUpdateUser({
            sql,
            email: email as string,
            fullName: name as string,
            customerId,
            priceId: priceId as string,
            status: 'active',
        });
        await createPayment({
            sql,
            session,
            priceId: priceId as string,
            userEmail: email as string,
        });
    }
};


const createOrUpdateUser = async ({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  sql: any;
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) => {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (user.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) 
                VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
    }
  } catch (error) {
    console.error('Error creating or updating user', error);
  }
};

const createPayment = async ({
    sql,
    session,
    priceId,
    userEmail,
}: {
    sql: any;
    session: Stripe.Checkout.Session;
    priceId: string;
    userEmail: string;
    }) => {
    try {
        const { amount_total, id, status } = session;

        await sql`INSERT INTO payments (price_id, amount, user_email, status, stripe_payment_id)
                    VALUES (${id}, ${amount_total}, ${userEmail}, ${status}, ${priceId})`;
    } catch (error) {
        console.error('Error creating payment', error);
        
    }
}

