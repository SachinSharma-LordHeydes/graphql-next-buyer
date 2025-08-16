const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">ABOUT</h3>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">HELP</h3>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Cancellation & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">POLICY</h3>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
          <p className="text-sm md:text-base">&copy; 2024 E-Commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
