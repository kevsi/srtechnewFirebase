import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Code, Smartphone, Target, Camera, TrendingUp, Box, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  { 
    icon: Code,
    title: 'Web Design and Development', 
    desc: 'Beautiful, accessible websites and products.',
    details: 'We craft responsive, high-performance websites that combine stunning design with flawless functionality. From e-commerce platforms to corporate sites, we build digital experiences that convert.',
    features: ['Responsive Design', 'SEO Optimization', 'Performance Tuning', 'CMS Integration']
  },
  { 
    icon: Smartphone,
    title: 'Branded Mobile Apps', 
    desc: 'High-performance native-like experiences.',
    details: 'Transform your ideas into powerful mobile applications. We develop iOS and Android apps that deliver seamless user experiences and drive engagement.',
    features: ['iOS & Android', 'Cross-Platform', 'App Store Optimization', 'Push Notifications']
  },
  { 
    icon: Target,
    title: 'Strategy and Planning', 
    desc: 'Product strategy, roadmaps and user research.',
    details: 'We help you define clear product strategies backed by data and user insights. Our planning process ensures your digital products meet market needs and business goals.',
    features: ['User Research', 'Market Analysis', 'Product Roadmaps', 'Competitive Analysis']
  },
  { 
    icon: Camera,
    title: 'Photography and Video', 
    desc: 'Visual storytelling and production.',
    details: 'Captivating visual content that tells your brand story. From product photography to promotional videos, we create content that resonates with your audience.',
    features: ['Product Photography', 'Brand Videos', 'Social Content', 'Post-Production']
  },
  { 
    icon: TrendingUp,
    title: 'Digital Marketing', 
    desc: 'Growth, performance and analytics.',
    details: 'Drive measurable results with data-driven marketing strategies. We optimize every channel to maximize your ROI and accelerate business growth.',
    features: ['SEO & SEM', 'Social Media', 'Email Marketing', 'Analytics & Reporting']
  },
  { 
    icon: Box,
    title: 'AR and 3D Animation', 
    desc: 'Immersive experiences and animations.',
    details: 'Push the boundaries of digital experiences with augmented reality and stunning 3D animations. We create immersive content that captivates and engages.',
    features: ['AR Experiences', '3D Modeling', 'Animation', 'Interactive Content']
  },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'We learn about your business, goals, and target audience' },
  { step: '02', title: 'Strategy', desc: 'We develop a comprehensive plan tailored to your needs' },
  { step: '03', title: 'Design', desc: 'Our team creates beautiful, functional designs' },
  { step: '04', title: 'Development', desc: 'We build your product with cutting-edge technology' },
  { step: '05', title: 'Launch', desc: 'We deploy and monitor for a successful release' },
  { step: '06', title: 'Support', desc: 'Ongoing maintenance and optimization' },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lime/20 to-white py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-black/60 font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-4">What We Do</p>
            <h1 className="text-5xl lg:text-[72px] font-['Work_Sans'] font-bold mb-6 leading-tight">Our Services</h1>
            <p className="text-xl text-black/70 leading-relaxed mb-8">We provide end-to-end digital solutions to help businesses launch, scale, and succeed in the digital age. From strategy to execution, we're your partner in innovation.</p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-lg hover:bg-black/90 transition-colors font-medium">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-lime/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
        <div className="text-center mb-16">
          <p className="text-black/60 font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-3">Comprehensive Solutions</p>
          <h2 className="text-3xl lg:text-5xl font-['Work_Sans'] font-bold mb-4">What We Offer</h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">Each service is designed to deliver exceptional results and drive your business forward.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="group p-8 border-2 border-gray-200 rounded-2xl hover:border-lime hover:shadow-xl transition-all duration-300 bg-white">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-lime rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-['Work_Sans'] font-semibold mb-2">{s.title}</h3>
                    <p className="text-black/70 font-medium">{s.desc}</p>
                  </div>
                </div>
                
                <p className="text-black/60 mb-6 leading-relaxed">{s.details}</p>
                
                <div className="space-y-2">
                  {s.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-lime flex-shrink-0" />
                      <span className="text-black/70">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="inline-flex items-center gap-2 text-black font-medium mt-6 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-black text-white py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-lime font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-3">How We Work</p>
            <h2 className="text-3xl lg:text-5xl font-['Work_Sans'] font-bold mb-4">Our Process</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">A proven methodology that delivers results every time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((p, idx) => (
              <div key={p.step} className="relative">
                <div className="text-6xl font-bold text-lime/20 mb-4">{p.step}</div>
                <h3 className="text-2xl font-semibold mb-3">{p.title}</h3>
                <p className="text-white/70 leading-relaxed">{p.desc}</p>
                {idx < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-lime/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-lime py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-['Work_Sans'] font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">Let's discuss how we can help bring your vision to life. Schedule a free consultation today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-lg hover:bg-black/90 transition-colors font-medium">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/work" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '200+', label: 'Projects Completed' },
              { num: '50+', label: 'Happy Clients' },
              { num: '15+', label: 'Team Members' },
              { num: '98%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-black mb-2">{stat.num}</div>
                <div className="text-black/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}