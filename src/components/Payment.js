// // PaymentComponent.js
// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';


// // Replace with your Stripe publishable key
// const stripePromise = loadStripe('your_publishable_key');

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     if (!stripe || !elements) {
//       return;
//     }

//     setLoading(true);
//     setErrorMessage(null);

//     try {
//       // Create payment intent on your backend
//       const response = await fetch('/api/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: 1000, // Amount in smallest currency unit (e.g., cents)
//           currency: 'inr',
//         }),
//       });

//       const { clientSecret } = await response.json();

//       const { error } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: `${window.location.origin}/payment-success`,
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message);
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred while processing your payment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement 
//         options={{
//           paymentMethodOrder: ['card', 'upi', 'netbanking', 'wallet'],
//           fields: {
//             billingDetails: {
//               name: 'auto',
//               email: 'auto',
//             },
//           },
//         }}
//       />
//       {errorMessage && (
//         <div className="text-red-500 text-sm">{errorMessage}</div>
//       )}
//       <button 
//         type="submit" 
//         disabled={!stripe || loading}
//         className="w-full"
//       >
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//     </form>
//   );
// };

// const PaymentComponent = () => {
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     // Fetch payment intent client secret when component mounts
//     const fetchClientSecret = async () => {
//       try {
//         const response = await fetch('/api/create-payment-intent', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             amount: 1000,
//             currency: 'inr',
//           }),
//         });
//         const data = await response.json();
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         console.error('Error fetching client secret:', error);
//       }
//     };

//     fetchClientSecret();
//   }, []);

//   const options = {
//     clientSecret,
//     appearance: {
//       theme: 'stripe',
//     },
//   };

//   return (
//     <div style={{width:'500px',height:'500px',borderRadius:'8px',border:'1px solid red',marginLeft:'250px'}}>
      
//         <h1>Payment Details</h1>
      
//       <div>
//         {clientSecret && (
//           <Elements stripe={stripePromise} options={options}>
//             <CheckoutForm />
//           </Elements>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentComponent;