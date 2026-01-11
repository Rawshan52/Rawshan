
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-indigo">
      <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">1. Service Delivery</h2>
        <p className="text-gray-600 leading-relaxed">
          View Agency provides Social Media Marketing (SMM) and Graphics Design services. By purchasing our services, you agree that delivery times are estimated and not guaranteed. Most SMM orders are initiated within 1-2 hours.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">2. Graphics Design & Revisions</h2>
        <p className="text-gray-600 leading-relaxed">
          Logo design packages come with a fixed number of revisions as stated in the package description. Once the final files are delivered and the order is marked as complete, additional revisions may incur extra costs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">3. Refund Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          Refunds are only issued if the service fails to deliver within the timeframe specified in the "Refund Policy" section (typically 72 hours of non-start). No refunds will be issued once the service (Followers/Likes) has been successfully delivered.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">4. Payment Security</h2>
        <p className="text-gray-600 leading-relaxed">
          We use secure payment gateways (Stripe, PayPal, bKash). View Agency does not store your credit card or payment sensitive information.
        </p>
      </section>
    </div>
  );
};

export default Terms;
