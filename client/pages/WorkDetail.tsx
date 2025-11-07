import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Users, Star, Play, CheckCircle, BookOpen, Award, Download } from "lucide-react";

// Base de données des formations
const coursesData: Record<string, any> = {
  conlete: {
    title: "Complete Mobile App Development",
    subtitle: "Build Professional iOS & Android Apps from Scratch",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "12 weeks",
    students: "2,500+",
    rating: "4.8",
    price: "$299",
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Mobile Developer",
      company: "Tech Solutions Inc.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/bfe592fa3a536dca7180a97d84a4277b4425749e?width=200"
    },
    description: "Master mobile app development with React Native and build real-world applications. Learn to create beautiful, performant apps for both iOS and Android platforms.",
    whatYouLearn: [
      "Build cross-platform mobile apps with React Native",
      "Implement advanced UI/UX patterns and animations",
      "Integrate APIs and manage application state",
      "Deploy apps to App Store and Google Play",
      "Implement push notifications and offline functionality",
      "Master mobile app debugging and performance optimization"
    ],
    curriculum: [
      {
        module: "Module 1: Getting Started",
        lessons: [
          "Introduction to Mobile Development",
          "Setting up Development Environment",
          "React Native Fundamentals",
          "Building Your First App"
        ]
      },
      {
        module: "Module 2: UI/UX Design",
        lessons: [
          "Styling and Layout",
          "Navigation Patterns",
          "Animations and Gestures",
          "Responsive Design"
        ]
      },
      {
        module: "Module 3: Advanced Features",
        lessons: [
          "API Integration",
          "State Management",
          "Authentication & Security",
          "Push Notifications"
        ]
      },
      {
        module: "Module 4: Deployment",
        lessons: [
          "App Store Submission",
          "Google Play Deployment",
          "CI/CD Pipeline",
          "Monitoring & Analytics"
        ]
      }
    ],
    requirements: [
      "Basic JavaScript knowledge",
      "Understanding of React concepts",
      "A computer with macOS (for iOS development) or Windows/Linux",
      "Motivation to learn and build apps"
    ],
    features: [
      "12 weeks of comprehensive content",
      "50+ hours of video lessons",
      "30+ hands-on projects",
      "Certificate of completion",
      "Lifetime access to course materials",
      "Private community access"
    ],
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/bfe592fa3a536dca7180a97d84a4277b4425749e?width=2042",
      "https://api.builder.io/api/v1/image/assets/TEMP/254c96de53aa74e5e9d6c9ead451840f868809db?width=1274",
      "https://api.builder.io/api/v1/image/assets/TEMP/95ad8dc98ab52cd728fa90b2acc0ff7c21557b1d?width=1274",
    ],
    testimonials: [
      {
        quote: "This course transformed my career. I went from knowing nothing about mobile development to building professional apps in just 3 months!",
        author: "Michael Chen",
        role: "Mobile Developer at Startup Inc.",
        rating: 5
      },
      {
        quote: "The instructor explains complex concepts in a simple way. The projects are challenging but rewarding.",
        author: "Emma Williams",
        role: "Freelance Developer",
        rating: 5
      }
    ]
  },
  nft: {
    title: "Web3 & NFT Development Masterclass",
    subtitle: "Build Decentralized Applications and NFT Marketplaces",
    category: "Blockchain Development",
    level: "Advanced",
    duration: "10 weeks",
    students: "1,800+",
    rating: "4.9",
    price: "$399",
    instructor: {
      name: "Alex Thompson",
      title: "Blockchain Architect",
      company: "Crypto Solutions",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/8ad56858487bd9dab5772d3a41679523ffcccb86?width=200"
    },
    description: "Learn to build cutting-edge Web3 applications and NFT marketplaces. Master smart contracts, blockchain integration, and decentralized technologies.",
    whatYouLearn: [
      "Write and deploy smart contracts with Solidity",
      "Build NFT marketplaces from scratch",
      "Integrate Web3 wallets (MetaMask, WalletConnect)",
      "Work with IPFS for decentralized storage",
      "Implement token standards (ERC-721, ERC-1155)",
      "Master gas optimization techniques"
    ],
    curriculum: [
      {
        module: "Module 1: Blockchain Basics",
        lessons: [
          "Introduction to Blockchain",
          "Ethereum & Smart Contracts",
          "Solidity Fundamentals",
          "Development Tools Setup"
        ]
      },
      {
        module: "Module 2: Smart Contract Development",
        lessons: [
          "Writing Smart Contracts",
          "Testing & Debugging",
          "Security Best Practices",
          "Gas Optimization"
        ]
      },
      {
        module: "Module 3: NFT Development",
        lessons: [
          "NFT Standards (ERC-721/1155)",
          "Minting & Trading Logic",
          "Metadata & IPFS",
          "Royalties Implementation"
        ]
      },
      {
        module: "Module 4: Full-Stack DApp",
        lessons: [
          "Frontend Integration",
          "Wallet Connection",
          "Transaction Management",
          "Deployment to Mainnet"
        ]
      }
    ],
    requirements: [
      "Strong JavaScript/TypeScript skills",
      "Experience with React or similar framework",
      "Basic understanding of blockchain concepts",
      "Willingness to experiment with new technologies"
    ],
    features: [
      "10 weeks of intensive training",
      "40+ hours of expert instruction",
      "Build 3 complete NFT projects",
      "Smart contract templates included",
      "Access to private Discord community",
      "Job placement assistance"
    ],
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/8ad56858487bd9dab5772d3a41679523ffcccb86?width=1800",
      "https://api.builder.io/api/v1/image/assets/TEMP/f53dca0b421643e6689834667f30625f6923ee2c?width=1248",
      "https://api.builder.io/api/v1/image/assets/TEMP/99765e1af9c47da17880562b254c2330f1ccf7ff?width=1240",
    ],
    testimonials: [
      {
        quote: "The most comprehensive Web3 course I've taken. Now I'm building NFT projects professionally!",
        author: "David Lee",
        role: "Blockchain Developer",
        rating: 5
      },
      {
        quote: "Worth every penny. The smart contract templates alone are incredibly valuable.",
        author: "Sofia Rodriguez",
        role: "Full-Stack Developer",
        rating: 5
      }
    ]
  },
  nursury: {
    title: "E-commerce Website Development",
    subtitle: "Create Beautiful Online Stores with Modern Technologies",
    category: "Web Development",
    level: "Beginner",
    duration: "8 weeks",
    students: "3,200+",
    rating: "4.7",
    price: "$199",
    instructor: {
      name: "Emma Wilson",
      title: "E-commerce Specialist",
      company: "Digital Commerce Co.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3cea6b8aa10780c952b755fd64ef305cd4a63ae8?width=200"
    },
    description: "Build professional e-commerce websites from scratch. Learn to create stunning online stores with payment integration, inventory management, and SEO optimization.",
    whatYouLearn: [
      "Build complete e-commerce websites",
      "Integrate payment gateways (Stripe, PayPal)",
      "Implement shopping cart functionality",
      "Create admin dashboards for inventory",
      "Optimize for search engines (SEO)",
      "Deploy and maintain live stores"
    ],
    curriculum: [
      {
        module: "Module 1: Foundations",
        lessons: [
          "E-commerce Fundamentals",
          "Platform Selection (Shopify vs Custom)",
          "Design Principles for Online Stores",
          "User Experience Best Practices"
        ]
      },
      {
        module: "Module 2: Building the Store",
        lessons: [
          "Product Pages & Catalog",
          "Shopping Cart Implementation",
          "Checkout Process",
          "Order Management"
        ]
      },
      {
        module: "Module 3: Advanced Features",
        lessons: [
          "Payment Integration",
          "Email Automation",
          "Inventory Management",
          "Customer Accounts"
        ]
      },
      {
        module: "Module 4: Growth & Marketing",
        lessons: [
          "SEO Optimization",
          "Analytics Setup",
          "Marketing Integrations",
          "Scaling Your Store"
        ]
      }
    ],
    requirements: [
      "Basic HTML & CSS knowledge",
      "Familiarity with JavaScript",
      "No prior e-commerce experience needed",
      "Passion for building online businesses"
    ],
    features: [
      "8 weeks of practical learning",
      "35+ hours of video content",
      "Build 2 complete e-commerce sites",
      "Ready-to-use templates included",
      "Marketing strategies & tools",
      "Private Slack community"
    ],
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/3cea6b8aa10780c952b755fd64ef305cd4a63ae8?width=1458",
      "https://api.builder.io/api/v1/image/assets/TEMP/254c96de53aa74e5e9d6c9ead451840f868809db?width=1274",
      "https://api.builder.io/api/v1/image/assets/TEMP/bfe592fa3a536dca7180a97d84a4277b4425749e?width=2042",
    ],
    testimonials: [
      {
        quote: "Started with zero knowledge, now I run my own successful online store. This course changed my life!",
        author: "James Miller",
        role: "E-commerce Entrepreneur",
        rating: 5
      },
      {
        quote: "Clear, practical, and beginner-friendly. Highly recommend for anyone wanting to start an online business.",
        author: "Lisa Anderson",
        role: "Store Owner",
        rating: 5
      }
    ]
  }
};

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? coursesData[slug] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="max-w-[1200px] mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-black/70 mb-8">The course you're looking for doesn't exist.</p>
          <Link to="/work" className="inline-flex items-center gap-2 text-lime font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main>
        {/* Back Button */}
        <div className="max-w-[1200px] mx-auto px-6 pt-8">
          <Link to="/work" className="inline-flex items-center gap-2 text-black/70 hover:text-black font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              <span className="inline-block bg-lime text-black text-sm font-semibold px-4 py-2 rounded-full mb-4">
                {course.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-['Work_Sans'] font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-black/70 mb-6 leading-relaxed">
                {course.subtitle}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-black/60">({course.students} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-black/60" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-black/60" />
                  <span>{course.level}</span>
                </div>
              </div>

              {/* Video Preview */}
              <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-video bg-black">
                <img 
                  src={course.images[0]} 
                  alt={course.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-20 h-20 bg-lime rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-black ml-1" fill="black" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-bold mb-4">{course.price}</div>
                <Link 
                  to="/contact"
                  className="w-full bg-lime text-black font-bold py-4 px-6 rounded-xl hover:bg-lime/90 transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  Enroll Now
                </Link>
                <Link 
                  to="/contact"
                  className="w-full border-2 border-black text-black font-bold py-4 px-6 rounded-xl hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 mb-6"
                >
                  Free Preview
                </Link>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-black/70">Students enrolled</span>
                    <span className="font-semibold">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/70">Duration</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/70">Level</span>
                    <span className="font-semibold">{course.level}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                <h3 className="font-bold mb-3">This course includes:</h3>
                <div className="space-y-2 text-sm">
                  {course.features.slice(0, 4).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                      <span className="text-black/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-['Work_Sans'] font-bold mb-8">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.whatYouLearn.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-lime flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8" />
              <h2 className="text-3xl font-['Work_Sans'] font-bold">Course Curriculum</h2>
            </div>
            
            <div className="space-y-4">
              {course.curriculum.map((module: any, idx: number) => (
                <details key={idx} className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <summary className="cursor-pointer p-6 font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <span>{module.module}</span>
                    <span className="text-black/40 text-sm">{module.lessons.length} lessons</span>
                  </summary>
                  <div className="px-6 pb-6 space-y-2">
                    {module.lessons.map((lesson: string, lessonIdx: number) => (
                      <div key={lessonIdx} className="flex items-center gap-3 py-2 text-black/70">
                        <Play className="w-4 h-4" />
                        <span>{lesson}</span>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-['Work_Sans'] font-bold mb-8">Requirements</h2>
            <div className="bg-white rounded-2xl p-8">
              <ul className="space-y-3">
                {course.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-lime rounded-full mt-2"></div>
                    <span className="text-black/70">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Instructor */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-['Work_Sans'] font-bold mb-8">Your Instructor</h2>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 bg-gradient-to-br from-lime to-lime/60 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                <p className="text-black/70 mb-1">{course.instructor.title}</p>
                <p className="text-black/60 text-sm mb-4">{course.instructor.company}</p>
                <p className="text-black/70 leading-relaxed">{course.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-black text-white py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-['Work_Sans'] font-bold mb-12 text-center">Student Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {course.testimonials.map((testimonial: any, idx: number) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="bg-gradient-to-br from-lime to-lime/80 rounded-3xl p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-['Work_Sans'] font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students and transform your career today.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-xl hover:bg-black/90 transition-all font-bold text-lg"
                >
                  Enroll for {course.price}
                  <Award className="w-6 h-6" />
                </Link>
                <Link 
                  to="/work" 
                  className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-xl hover:bg-gray-100 transition-all font-bold text-lg"
                >
                  View All Courses
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}