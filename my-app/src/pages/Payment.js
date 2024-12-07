import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const amountToPay = "20.00"; // Amount to be paid

  const handlePayClick = () => {
    setShowPaymentSection(true); // Show the PayPal button after clicking "Pay"
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "ATqitXJDc5JNEb2DrEQY0Qa5KykfjEsjYT2eKLRzmEHNPO0tUS-ELHIOC6C4eboU-J7kGmSw4Fe7CZ4j" }}>
      <div className="container">
        <div className="header">RouteIQ</div>

        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Vehicle Number</th>
              <th>Amount</th>
              <th>From</th> {/* New Column */}
              <th>To</th> {/* New Column */}
              <th>Date/Time</th> {/* New Column */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TX12345</td>
              <td>TN01AB1234</td>
              <td>₹1500</td>
              <td>Mumbai</td> {/* Example Data */}
              <td>Kolkata</td> {/* Example Data */}
              <td>2024-12-06 10:30 AM</td> {/* Example Data */}
              <td><button className="paid-btn">Paid</button></td>
            </tr>
            <tr>
              <td>TX12346</td>
              <td>KA01XY5678</td>
              <td>₹2000</td>
              <td>Chennai</td> {/* Example Data */}
              <td>Delhi</td> {/* Example Data */}
              <td>2024-12-06 11:15 AM</td> {/* Example Data */}
              <td>
                <button className="unpaid-btn" onClick={handlePayClick}>
                  Pay
                </button>
              </td>
            </tr>
            <tr>
              <td>TX12347</td>
              <td>TN01LM9101</td>
              <td>₹2500</td>
              <td>Kanyakumari</td> {/* Example Data */}
              <td>Jammu</td> {/* Example Data */}
              <td>2024-12-06 12:00 PM</td> {/* Example Data */}
              <td><button className="paid-btn">Paid</button></td>
            </tr>
          </tbody>
        </table>

        {showPaymentSection && (
          <div id="payment-section" className="payment-section">
            <h3>Payment Form</h3>
            <label htmlFor="amount">Amount to Pay: ${amountToPay}</label>
            <br />
            <input type="text" id="amount" name="amount" value={amountToPay} disabled />
            <br />
            <br />
            {/* PayPal Button component */}
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amountToPay,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(`Payment successful! Thank you, ${details.payer.name.given_name}`);
                });
              }}
              onError={(err) => {
                console.error("PayPal payment error: ", err);
                alert("Payment failed. Please try again.");
              }}
            />
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default Payment;
