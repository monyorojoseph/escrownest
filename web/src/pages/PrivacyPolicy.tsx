import { Shield, Lock } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-sky-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Protection Commitment</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              At escrownest, we take your privacy seriously. We are committed to protecting your personal 
              and financial information with the highest standards of security and confidentiality.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Government-issued identification (for verification)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transaction Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Purchase history and transaction details</li>
                <li>Payment information</li>
                <li>Escrow agreement details</li>
                <li>Communication records related to transactions</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-sky-500" />
              <h2 className="text-2xl font-semibold text-gray-900">How We Protect Your Data</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                We employ industry-leading security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>End-to-end encryption for all sensitive data</li>
                <li>Regular security audits and penetration testing</li>
                <li>Strict access controls and authentication measures</li>
                <li>Compliance with international data protection standards</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Your Rights</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Access your personal data</li>
                <li>Request corrections to your information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our privacy policy or how we handle your data, 
              please contact our Data Protection Officer at privacy@escrownest.com
            </p>
          </section>

          <div className="text-sm text-gray-600">
            Last updated: March 2024
          </div>
        </div>
      </div>
    </div>
  );
} 