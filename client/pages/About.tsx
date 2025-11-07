import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Target, Users, Lightbulb, Heart, Award, Zap, TrendingUp, Globe } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Client-Focused",
    description: "We put our clients' success at the heart of everything we do, building long-term partnerships based on trust."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of the curve, embracing new technologies and creative approaches to solve complex problems."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We're committed to delivering exceptional quality in every project, no matter the size or scope."
  },
  {
    icon: Zap,
    title: "Agility",
    description: "We adapt quickly to changing needs, ensuring fast delivery without compromising on quality."
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Co-Founder & CEO",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/bfe592fa3a536dca7180a97d84a4277b4425749e?width=400",
    bio: "15+ years leading digital transformation projects for Fortune 500 companies."
  },
  {
    name: "Michael Chen",
    role: "Co-Founder & CTO",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/8ad56858487bd9dab5772d3a41679523ffcccb86?width=400",
    bio: "Former lead engineer at tech giants, passionate about scalable architecture."
  },
  {
    name: "Emma Williams",
    role: "Creative Director",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/3cea6b8aa10780c952b755fd64ef305cd4a63ae8?width=400",
    bio: "Award-winning designer with a keen eye for detail and user experience."
  },
  {
    name: "David Martinez",
    role: "Head of Strategy",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/254c96de53aa74e5e9d6c9ead451840f868809db?width=400",
    bio: "Expert in digital strategy and helping businesses scale in competitive markets."
  }
];

const stats = [
  { number: "200+", label: "Projects Completed" },
  { number: "50+", label: "Happy Clients" },
  { number: "15+", label: "Team Members" },
  { number: "8", label: "Years Experience" }
];

const timeline = [
  { year: "2016", title: "Founded", description: "Started as a two-person team with a vision to create impactful digital products." },
  { year: "2018", title: "First Major Client", description: "Partnered with a Fortune 500 company, establishing our reputation for excellence." },
  { year: "2020", title: "Team Expansion", description: "Grew to 15+ talented professionals across design, development, and strategy." },
  { year: "2023", title: "Global Reach", description: "Expanded services internationally, working with clients across 3 continents." },
  { year: "2024", title: "Innovation Hub", description: "Launched R&D division focused on emerging technologies like AI and Web3." }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lime/20 via-white to-blue-50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-black/60 font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-4">Who We Are</p>
            <h1 className="text-5xl lg:text-[72px] font-['Work_Sans'] font-bold mb-6 leading-tight">We Build Digital Products That Matter</h1>
            <p className="text-xl text-black/70 leading-relaxed mb-8">
              Onend is a product-focused digital agency that helps brands create meaningful experiences. We combine design, engineering, and strategy to build products that people love and businesses need.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-lime/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-lime mb-2">{stat.number}</div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-lime/10 to-lime/5 p-10 rounded-3xl">
              <div className="w-16 h-16 bg-lime rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-3xl font-['Work_Sans'] font-bold mb-4">Our Mission</h2>
              <p className="text-black/70 text-lg leading-relaxed">
                To craft thoughtful digital experiences that solve real problems and drive measurable results. We believe in the power of technology to transform businesses and improve lives.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-transparent p-10 rounded-3xl border-2 border-gray-200">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-['Work_Sans'] font-bold mb-4">Our Vision</h2>
              <p className="text-black/70 text-lg leading-relaxed">
                To become the go-to partner for companies looking to innovate and scale through digital transformation, known for our creativity, reliability, and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-black/60 font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-3">What Drives Us</p>
            <h2 className="text-3xl lg:text-5xl font-['Work_Sans'] font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-black/70 max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-lime rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-black/70 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-black/60 font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-3">Our Journey</p>
            <h2 className="text-3xl lg:text-5xl font-['Work_Sans'] font-bold mb-4">The Story So Far</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-lime/30 hidden lg:block"></div>

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row gap-8 items-center ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                      <div className="text-lime font-bold text-sm mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-black/70">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 bg-lime rounded-full flex items-center justify-center font-bold z-10 flex-shrink-0 shadow-lg">
                    {idx + 1}
                  </div>
                  
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-lime font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-3">Meet The Team</p>
            <h2 className="text-3xl lg:text-5xl font-['Work_Sans'] font-bold mb-4">The People Behind Onend</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">A cross-disciplinary team of designers, engineers, and strategists passionate about building great products.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square bg-gradient-to-br from-lime to-lime/60">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-lime font-medium mb-3">{member.role}</p>
                <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-['Work_Sans'] font-bold mb-6">Why Work With Us?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-lime rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Proven Track Record</h3>
                    <p className="text-black/70">200+ successful projects across diverse industries with measurable ROI.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-lime rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Dedicated Team</h3>
                    <p className="text-black/70">Expert professionals committed to your project's success from start to finish.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-lime rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Fast & Efficient</h3>
                    <p className="text-black/70">Agile methodology ensures rapid delivery without compromising quality.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-lime/20 to-blue-50 overflow-hidden">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/254c96de53aa74e5e9d6c9ead451840f868809db?width=800" 
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-lime rounded-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-lime to-lime/80">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-['Work_Sans'] font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life and drive real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-xl hover:bg-black/90 transition-colors font-bold text-lg"
            >
              Get in Touch
            </Link>
            <Link 
              to="/work" 
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-xl hover:bg-gray-100 transition-colors font-bold text-lg"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
