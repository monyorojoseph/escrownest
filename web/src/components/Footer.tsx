import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-sky-900 text-white py-12">
      <div className="px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-sky-200 hover:text-white transition">How It Works</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-sky-200 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-sky-200 hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sky-800 pt-8 text-center">
          <p>&copy; 2025 escrownest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


