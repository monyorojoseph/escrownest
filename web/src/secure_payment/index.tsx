import { Outlet } from "react-router";

const SecurePayment = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SecurePayment;