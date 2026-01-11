
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-indigo">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">1. Information Collection</h2>
        <p className="text-gray-600 leading-relaxed">
          We collect information you provide directly to us, such as when you create an account, purchase a service, or fill out a design brief. This may include your name, email address, and payment information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">2. Use of Information</h2>
        <p className="text-gray-600 leading-relaxed">
          The information we collect is used to process your orders, provide customer support, and improve our services. We do not sell your personal data to third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">3. Cookies</h2>
        <p className="text-gray-600 leading-relaxed">
          We use cookies to enhance your experience on our website, remember your preferences, and analyze site traffic.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
        <p className="text-gray-600 leading-relaxed">
          We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.
        </p>
      </section>
    </div>
  );
};

export default Privacy;
