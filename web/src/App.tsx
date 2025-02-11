import { Shield, Lock, AlertTriangle, Phone, Mail, ChevronRight, Scale } from "lucide-react";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section with Animation */}
      <section className="relative px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(14,165,233,0.1),transparent)]" />
          <h1 className="mb-6 text-6xl font-bold text-gray-900 animate-fade-in tracking-tight">
            Safe <span className="text-sky-500">Payment</span> Protection
          </h1>
          <p className="mb-8 text-xl text-gray-700 leading-relaxed">
            Secure your online purchases with our escrow service. We hold your payment safely until you receive and verify your product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/secure_payment/new"
              className="inline-flex items-center bg-sky-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg 
              text-base sm:text-lg font-semibold hover:bg-sky-600 transition duration-300 shadow-lg hover:shadow-xl">
              <span className="text-base sm:text-lg">Try It Now</span> <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="px-4 py-12 border-y border-gray-100">
        <div className="flex flex-wrap justify-center gap-12 items-center text-gray-700">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6" />
            <span>Fair Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6" />
            <span>Encrypted Data</span>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
          How We Protect Your Purchase
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Secure Payment Holding",
              description: "Your payment is held safely in a dedicated escrow account until you confirm receipt of your purchase.",
            },
            {
              icon: Lock,
              title: "Down Payment Protection",
              description: "Secure partial payments for custom orders or deposits, releasing funds according to agreed milestones.",
            },
            {
              icon: AlertTriangle,
              title: "Purchase Protection",
              description: "If you don't receive your item or it's not as described, your payment remains protected.",
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <feature.icon className="w-12 h-12 text-sky-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-sky-900 text-white py-20">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Simple Protection Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Make Agreement",
                description: "Agree on price and terms with your seller",
              },
              {
                step: 2,
                title: "Secure Payment",
                description: "Send payment to our secure escrow account",
              },
              {
                step: 3,
                title: "Delivery",
                description: "Seller ships the item to you",
              },
              {
                step: 4,
                title: "Release",
                description: "Confirm receipt and we release payment to seller",
              },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-sky-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sky-200 leading-relaxed">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-2/3 w-full h-0.5 bg-sky-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-20">
        <div className="px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Questions?</h2>
            <p className="mb-12 text-gray-700">
              We're here to help you understand how our escrow service works
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-lg">
                <Phone className="w-8 h-8 text-sky-500" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-700">Contact our support team</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-lg">
                <Mail className="w-8 h-8 text-sky-500" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-700">support@escrow.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sky-100 py-20">
        <div className="px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Start Protecting Your Purchases</h2>
          <p className="mb-8 text-xl text-gray-700 max-w-2xl mx-auto">
            Use our escrow service for your next online purchase or down payment
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/auth/login"
              className="inline-flex items-center bg-sky-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sky-600 
              transition duration-300 shadow-lg hover:shadow-xl" >
              Get Started
            </Link>
            <a
              href="#"
              className="inline-flex items-center bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition duration-300 shadow-lg hover:shadow-xl border border-gray-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-12">
        <div className="px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sky-200 hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="text-sky-200 hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sky-200 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-sky-200 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sky-200 hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="text-sky-200 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sky-800 pt-8 text-center">
            <p>&copy; 2025 SecurePay Escrow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}