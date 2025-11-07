import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const projects = [
  { 
    slug: "conlete", 
    title: "Conlete - Mobile App", 
    category: "Mobile App",
    description: "A modern task management app with intuitive design and powerful features.",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/bfe592fa3a536dca7180a97d84a4277b4425749e?width=2042" 
  },
  { 
    slug: "nft", 
    title: "NFT - Website", 
    category: "Web Design",
    description: "A cutting-edge NFT marketplace with seamless user experience.",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/8ad56858487bd9dab5772d3a41679523ffcccb86?width=1800" 
  },
  { 
    slug: "nursury", 
    title: "Nursury - Website", 
    category: "E-commerce",
    description: "An elegant online store for plant enthusiasts with smooth checkout.",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/3cea6b8aa10780c952b755fd64ef305cd4a63ae8?width=1458" 
  },
];

export default function Work() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-[97px] py-12 lg:py-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
          <div>
            <p className="text-black/60 font-['Josefin_Sans'] text-sm font-medium uppercase tracking-wide mb-2">Our Portfolio</p>
            <h1 className="text-4xl lg:text-[56px] font-['Work_Sans'] font-medium">Our Latest Work</h1>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-lime text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
            Let's work together
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <Link 
              key={p.slug} 
              to={`/work/${p.slug}`}
              className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <article>
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                  <img 
                    loading="lazy" 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-lime text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-['Work_Sans'] font-semibold mb-2 group-hover:text-lime transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-black/70 text-sm mb-4 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-2 text-black font-medium text-sm group-hover:gap-3 transition-all">
                    <span>View Case Study</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.172 11L10.808 5.63598L12.222 4.22198L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-br from-lime/20 to-transparent rounded-2xl p-12">
          <h2 className="text-3xl lg:text-4xl font-['Work_Sans'] font-bold mb-4">
            Have a project in mind?
          </h2>
          <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life with our expertise and creativity.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-lg hover:bg-black/90 transition-colors font-medium"
          >
            Start Your Project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.172 11L10.808 5.63598L12.222 4.22198L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z" fill="currentColor"/>
            </svg>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}