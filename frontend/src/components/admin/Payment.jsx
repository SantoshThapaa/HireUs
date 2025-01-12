// import React from 'react';
import PropTypes from 'prop-types';

const Payment = ({ isOpen, onClose, applicant, amount, onPaymentSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <div className="mb-4">
          <p><strong>Applicant Name:</strong> {applicant.fullname}</p>  {/* Access fullname from applicant */}
          <p><strong>Salary:</strong> ${applicant.salary}</p>  {/* Access salary from applicant */}
          <p><strong>Amount to Pay:</strong> ${amount}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Card Details</label>
          {/* This can be a placeholder for the Stripe Card Element */}
          <div className="border p-2 rounded-lg">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Card Number"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => { onPaymentSuccess(); onClose(); }}
            className="py-2 px-4 bg-blue-600 text-white rounded-md"
          >
            Pay ${amount}
          </button>
        </div>
      </div>
    </div>
  );
};

// Adding PropTypes to validate props
Payment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  applicant: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default Payment;
