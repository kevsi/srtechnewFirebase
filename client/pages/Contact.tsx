import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Linkedin, Twitter, Instagram } from "lucide-react";
import { isFirebaseEnabled, initializeFirebase } from "@/lib/firebase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle'|'error'|'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    if (!validate()) {
      setStatus('error');
      return;
    }

    try {
      if (isFirebaseEnabled) {
        const { db } = await initializeFirebase();
        if (db) {
          const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
          await addDoc(collection(db, 'contacts'), {
            ...formData,
            status: 'new',
            createdAt: serverTimestamp(),
          });
        }
      } else {
        // Fallback: persist locally
        const existing = JSON.parse(localStorage.getItem('_contacts') || '[]');
        existing.push({ ...formData, status: 'new', createdAt: Date.now() });
        localStorage.setItem('_contacts', JSON.stringify(existing));
        // small delay for UX
        await new Promise((r) => setTimeout(r, 300));
      }

      setStatus('success');
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: ""
      });
      setErrors({});
    } catch (err) {
      console.error('Failed to submit contact', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lime/20 via-white to-blue-50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-black/60 font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-4">Get In Touch</p>
            <h1 className="text-5xl lg:text-[72px] font-['Work_Sans'] font-bold mb-6 leading-tight">Let's Start a Conversation</h1>
            <p className="text-xl text-black/70 leading-relaxed">
              Have a project in mind? We'd love to hear about it. Tell us about your vision and let's create something extraordinary together.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-lime/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information - Left Side */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-['Work_Sans'] font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:srtechnologie0@gmail.com" className="text-black/70 hover:text-lime transition-colors">
                        srtechnologie0@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <div className="flex flex-col">
                        <a href="tel:+2290140527263" className="text-black/70 hover:text-lime transition-colors">+229 01 40 52 72 63</a>
                        <a href="tel:+2290147881173" className="text-black/70 hover:text-lime transition-colors">+229 01 47 88 11 73</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office</h3>
                      <p className="text-black/70">
                        Ancienne Gendarmerie<br />
                        Avotrou – Cotonou<br />
                        Bénin
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-black/70">
                        Monday - Friday<br />
                        9:00 AM - 6:00 PM PST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-lime transition-colors group">
                    <Twitter className="w-5 h-5 text-white group-hover:text-black" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-lime transition-colors group">
                    <Linkedin className="w-5 h-5 text-white group-hover:text-black" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-lime transition-colors group">
                    <Instagram className="w-5 h-5 text-white group-hover:text-black" />
                  </a>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-lime/10 to-lime/5 p-6 rounded-2xl">
                <MessageCircle className="w-8 h-8 text-lime mb-3" />
                <h3 className="font-bold mb-2">Prefer to chat?</h3>
                <p className="text-sm text-black/70 mb-4">Schedule a free 30-minute consultation call with our team.</p>
                <button className="text-sm font-semibold text-lime hover:underline">Book a Call →</button>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 lg:p-12 shadow-xl">
                <h2 className="text-3xl font-['Work_Sans'] font-bold mb-6">Send Us a Message</h2>
                <p className="text-black/70 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                <form onSubmit={submit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-3 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none`}
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone and Company Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold mb-2">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  {/* Service and Budget Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none bg-white"
                      >
                        <option value="">Select a service</option>
                        <option value="web">Web Design & Development</option>
                        <option value="mobile">Mobile App Development</option>
                        <option value="branding">Branding & Design</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none bg-white"
                      >
                        <option value="">Select budget</option>
                        <option value="5-10k">$5k - $10k</option>
                        <option value="10-25k">$10k - $25k</option>
                        <option value="25-50k">$25k - $50k</option>
                        <option value="50-100k">$50k - $100k</option>
                        <option value="100k+">$100k+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full border-2 ${errors.message ? 'border-red-500' : 'border-gray-300'} px-4 py-3 rounded-xl focus:ring-2 focus:ring-lime focus:border-transparent transition-all outline-none resize-none`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  {/* Status Messages */}
                  {status === 'error' && !Object.keys(errors).length && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-700 font-medium">Something went wrong. Please try again.</p>
                    </div>
                  )}
                  
                  {status === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-green-700 font-medium">✓ Thanks! We've received your message and will get back to you within 24 hours.</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-lime hover:bg-lime/90 text-black font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                    >
                      Send Message
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-['Work_Sans'] font-bold mb-8 text-center">Visit Our Office</h2>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] bg-gray-200">
            {/* Replace with actual map embed or image */}
            <div className="w-full h-full flex items-center justify-center text-black/40">
              <MapPin className="w-16 h-16" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl font-['Work_Sans'] font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-white border-2 border-gray-200 rounded-xl p-6">
              <summary className="cursor-pointer font-bold text-lg list-none flex items-center justify-between">
                How long does a typical project take?
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-black/70">Most projects take 6-12 weeks from kickoff to launch, depending on scope and complexity. We'll provide a detailed timeline during our initial consultation.</p>
            </details>

            <details className="group bg-white border-2 border-gray-200 rounded-xl p-6">
              <summary className="cursor-pointer font-bold text-lg list-none flex items-center justify-between">
                What is your pricing structure?
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-black/70">We offer both fixed-price and hourly engagement models. Project costs typically range from $10k to $100k+ depending on requirements. Contact us for a custom quote.</p>
            </details>

            <details className="group bg-white border-2 border-gray-200 rounded-xl p-6">
              <summary className="cursor-pointer font-bold text-lg list-none flex items-center justify-between">
                Do you offer ongoing support?
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-black/70">Yes! We offer maintenance and support packages to keep your product running smoothly. This includes updates, bug fixes, and feature enhancements.</p>
            </details>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
