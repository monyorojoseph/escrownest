import { Shield, Lock, AlertTriangle, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900">
            How Escrownest <span className="text-sky-500">Works</span>
          </h1>
          <p className="mb-8 text-xl text-gray-700 leading-relaxed">
            Our escrow service ensures safe transactions between buyers and sellers. 
            Learn how we protect your payments every step of the way.
          </p>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              {
                step: 1,
                title: "Agreement Creation",
                icon: Shield,
                description: "Start by creating a secure agreement that outlines all transaction details:",
                details: [
                  "Specify item description and condition",
                  "Set the agreed price and payment terms",
                  "Define shipping method and timeframe",
                  "Both parties review and accept terms"
                ]
              },
              {
                step: 2,
                title: "Secure Payment",
                icon: Lock,
                description: "Buyer sends payment to our secure escrow account:",
                details: [
                  "Multiple payment methods accepted",
                  "Funds held in regulated financial institutions",
                  "Real-time transaction monitoring",
                  "Instant payment confirmation"
                ]
              },
              {
                step: 3,
                title: "Verified Delivery",
                icon: AlertTriangle,
                description: "Seller ships the item and provides tracking:",
                details: [
                  "Shipping updates tracked in real-time",
                  "Delivery confirmation required",
                  "Inspection period begins upon delivery",
                  "Buyer verifies item condition"
                ]
              }
            ].map((step) => (
              <div key={step.step} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start gap-6">
                  <div className="bg-sky-100 rounded-full p-3">
                    <step.icon className="w-8 h-8 text-sky-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-sky-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Step {step.step}
                      </span>
                      <h2 className="text-2xl font-semibold text-gray-900">{step.title}</h2>
                    </div>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <ChevronRight className="w-5 h-5 text-sky-500" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protection Features */}
      <section className="bg-sky-900 text-white py-16 px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Built-in Protection Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Buyer Protection",
                features: [
                  "Money-back guarantee",
                  "Item verification period",
                  "Dispute resolution support",
                  "No hidden fees"
                ]
              },
              {
                title: "Seller Protection",
                features: [
                  "Guaranteed payment",
                  "Fraud prevention",
                  "Shipping protection",
                  "Clear release terms"
                ]
              },
              {
                title: "Transaction Security",
                features: [
                  "Bank-level encryption",
                  "Identity verification",
                  "24/7 monitoring",
                  "Secure data storage"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-sky-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sky-100">
                      <ChevronRight className="w-4 h-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Ready to Start Your Protected Transaction?
          </h2>
          <p className="mb-8 text-xl text-gray-700">
            Create your first escrow agreement in minutes
          </p>
          <Link
            to="/secure_payment/new"
            className="inline-flex items-center bg-sky-500 text-white px-8 py-4 rounded-lg 
            text-lg font-semibold hover:bg-sky-600 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Start Now <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
} 