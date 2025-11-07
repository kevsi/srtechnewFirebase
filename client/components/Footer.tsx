import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle'|'error'|'success'>('idle');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    // Mock success
    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="relative bg-black pt-16 lg:pt-20 pb-12 lg:pb-16 overflow-hidden">
      <img src="https://api.builder.io/api/v1/image/assets/TEMP/88d5d57240399d9ef6220d9670086c47ceda434b?width=1024" alt="" className="absolute left-[-100px] lg:left-0 bottom-0 w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] pointer-events-none opacity-30" />
      <img src="https://api.builder.io/api/v1/image/assets/TEMP/a9db40ffb7ac374439ab902467bfca14c7482c7c?width=1024" alt="" className="absolute right-[-100px] lg:right-[100px] top-[-50px] lg:top-0 w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] pointer-events-none opacity-30" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-[101px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo et réseaux sociaux */}
          <div className="space-y-6">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2Fccaf1859a5814530a30af1beb12dece7?format=webp&width=800" alt="SR Technologies logo" className="w-[100px] h-auto object-contain" />
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/ebeccab871c6afaee9558f88cecadef69f31b2d9?width=48" alt="" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/0d4e5c4dd0d3e8b3caa5df982668335325295496?width=48" alt="" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/a1cd6c87b105d5957b344b193ef6c0d3fcf073cc?width=48" alt="" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Colonne 1 */}
          <div className="space-y-3">
            <Link to="/work" className="block text-white text-base font-medium hover:text-lime transition-colors">Work</Link>
            <Link to="/about" className="block text-white text-base font-medium hover:text-lime transition-colors">About</Link>
          </div>

          {/* Colonne 2 */}
          <div className="space-y-3">
            <Link to="/services" className="block text-white text-base font-medium hover:text-lime transition-colors">Services</Link>
            <Link to="/contact" className="block text-white text-base font-medium hover:text-lime transition-colors">Contact us</Link>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Subscribe to our Newsletter</h3>
            <form onSubmit={submit} className="space-y-3">
              <label htmlFor="footer-email" className="sr-only">Enter your email</label>
              <div className="space-y-2">
                <div className={`rounded bg-white px-4 py-3 flex items-center ${status === 'error' ? 'ring-2 ring-red-500' : ''}`}>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-black text-sm placeholder:text-black/60 focus:outline-none"
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'footer-email-error' : undefined}
                  />
                </div>
                <button type="submit" className="w-full bg-lime rounded px-4 py-3 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lime">
                  <span className="text-black font-medium text-sm">Submit</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.172 10.9999L10.808 5.63592L12.222 4.22192L20 11.9999L12.222 19.7779L10.808 18.3639L16.172 12.9999H4V10.9999H16.172Z" fill="black" />
                  </svg>
                </button>
              </div>
              {status === 'error' && <p id="footer-email-error" className="text-red-400 text-sm">Please enter a valid email address.</p>}
              {status === 'success' && <p className="text-green-400 text-sm">Thanks for subscribing!</p>}
            </form>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/20 mt-12 mb-6"></div>
        <p className="text-center text-white/70 text-sm">All Rights Reserved @ <span className="text-lime">Onend Solutions</span></p>
      </div>
    </footer>
  );
}