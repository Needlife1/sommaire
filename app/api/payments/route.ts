// import Stripe from 'stripe';

// import { NextRequest, NextResponse } from 'next/server';
// import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from '@/lib/paymants';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// export const POST = async (req: NextRequest) => {
//     const payload = await req.text();
//     const sig = req.headers.get('stripe-signature');

//     let event;

//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//     try {
//         event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//         switch (event.type) {
//             case 'checkout.session.completed':
//                 console.log('Checkout session completed');
                
//                 const sessionId = event.data.object.id;
//                 const session = await stripe.checkout.sessions.retrieve(
//                   sessionId,
//                   {
//                       expand: ['line_items'],
//                   }
//                 );
//                 await handleCheckoutSessionCompleted({ session, stripe });
//                 break;
            
//             case 'customer.subscription.deleted':
//                 console.log('Customer subscription deleted');
//                 const subscription = event.data.object;
//                 const subscriptionId = event.data.object.id;

//                 await handleSubscriptionDeleted({
//                     subscriptionId,
//                     stripe,
//                 });
//                 console.log(subscription);



//                 break;
            
//             default:
//                 console.log(`Unhandled event type ${event.type}`);
                
//         }
    
//     } catch (err) {
//         console.log(err);
        
//         return NextResponse.json({
//             error: 'Failed to trigger webhook', err
//         },
//         { status: 400 });
//     }

//     return NextResponse.json({
//       status: 'success',
//     });
// }
  
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from '@/lib/paymants';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    return NextResponse.json(
      { error: 'Missing STRIPE_WEBHOOK_SECRET' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const sessionId = (event.data.object as Stripe.Checkout.Session).id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items'],
        });
        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted({ subscriptionId: sub.id, stripe });
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to trigger webhook' },
      { status: 400 }
    );
  }

  return NextResponse.json({ status: 'success' });
};
