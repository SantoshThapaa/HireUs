import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with your public key (ensure it's in quotes as it's a string)
const stripePromise = loadStripe("pk_test_51PB5UvBTLGU4hBnY76iV1ZDcAAaTS4qKMvoI4GJ0o833RmRr7GDuKePTSLSkq88QyVcjo8UYkWzhQNM8nttrqEMQ00cT5rejSj");

const Payment = ({ isOpen, applicant, onClose, onPaymentSuccess }) => {
  if (!isOpen) return null;

  // Calculate the amount to pay (25% of the salary)
  const amountToPay = (applicant.salary || 0) * 0.25;

  const makePayment = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: amountToPay }),  // Corrected variable name
      });

      const session = await response.json();

      if (session.error) {
        console.error("Error:", session.error);
        alert('Error: ' + session.error);  // Display error alert
        return;
      }

      console.log('Session ID received:', session.id);  // Log the session ID

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

      if (error) {
        console.log("Error during Stripe Checkout:", error.message);
        alert("Error during Stripe Checkout: " + error.message);  // Display error alert
      } else {
        // Trigger the success callback if payment is successful
        onPaymentSuccess(applicant.id);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert('Payment error: ' + error.message);  // Display error alert
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Pay with Card</h2>
        <p className="mb-2">Applicant Name: <strong>{applicant.fullname}</strong></p>
        <p className="mb-2">Salary: NRs.{applicant.salary}k</p>
        <p className="mb-4">Amount to Pay: NRs.{amountToPay}k</p>

        <button
          type="button"
          onClick={makePayment}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Pay NRs.{amountToPay}k
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

Payment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  applicant: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default Payment;
