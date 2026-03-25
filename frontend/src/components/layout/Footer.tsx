const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-xl font-bold tracking-tight text-blue-600 mb-4">LOGO</h3>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Making the world a better place through constructing elegant hierarchies and functional interfaces.
            </p>
          </div>

          {/* Links Section 1 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Links Section 3 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Social</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
