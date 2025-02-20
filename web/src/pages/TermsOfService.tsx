import { Scale, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-sky-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Agreement Overview</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              By using escrownest services, you agree to these terms and conditions. 
              Our service provides secure payment protection for online transactions between buyers and sellers.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Service Terms</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Escrow Process</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Buyer and seller must agree on transaction terms</li>
                <li>Funds must be transferred to our secure escrow account</li>
                <li>Seller must provide proof of shipment</li>
                <li>Buyer must verify receipt and condition of items</li>
                <li>Funds are released according to agreement terms</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fees and Charges</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Standard escrow fee: 2.5% of transaction value</li>
                <li>International transaction fee: Additional 1%</li>
                <li>Currency conversion fees may apply</li>
                <li>Cancellation fee: $25 or 1% of transaction value</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-sky-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Dispute Resolution</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                In case of disputes, we follow these procedures:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Both parties must provide evidence supporting their claims</li>
                <li>Our dispute resolution team will review all documentation</li>
                <li>Decision will be made based on provided evidence</li>
                <li>Appeals must be filed within 5 business days</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">User Responsibilities</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Security</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Maintain accurate account information</li>
                <li>Keep login credentials secure</li>
                <li>Enable two-factor authentication</li>
                <li>Report suspicious activities immediately</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Fraudulent transactions</li>
                <li>Money laundering</li>
                <li>Sale of illegal goods or services</li>
                <li>Multiple accounts for the same user</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate accounts that violate these terms. 
              Users may also terminate their accounts at any time, subject to completing any 
              ongoing transactions.
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