import React from "react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();

  const isAuthenticated = user && user.verified;
  const brandLogos = [
    {
      alt: "Logitech",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2F940771edf6ca43eda8cbac5a0663bf31?format=webp&width=800",
    },
    {
      alt: "MikroTik",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2F179110718be946bbbf3d6245c4dcfba7?format=webp&width=800",
    },
    {
      alt: "NetApp",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2F0c46ca050a87486f99b35d6574f357d5?format=webp&width=800",
    },
    {
      alt: "Oracle",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2Fa55eee7c99f84020b5291b2712d07cae?format=webp&width=800",
    },
    {
      alt: "Ruckus CommScope",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2Fa36a5ce7373743959518b02ceec5baa0?format=webp&width=800",
    },
    {
      alt: "Ubiquiti Networks",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2Fa1167bc4be874412a604d5de6a054c80?format=webp&width=800",
    },
    {
      alt: "Dell",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2F05af6b7e8f1e4c7dbb954a7d9f87ade4?format=webp&width=800",
    },
    {
      alt: "EMC",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2Fd8da32b3c9014692b8b3229133f9fcdc?format=webp&width=800",
    },
    {
      alt: "HP",
      src: "https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2Fee66b07f31284a4f8d45587347e91618?format=webp&width=800",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-lime overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/bb46636c94217d4a50ee353409ba0a4a20b5af10?width=1316"
          alt="decor"
          loading="lazy"
          className="absolute left-0 top-[220px] w-[360px] lg:w-[658px] opacity-40 lg:opacity-100 pointer-events-none"
        />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-[97px] py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h1 className="font-['Work_Sans'] font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[81px] leading-tight md:leading-[1.05] lg:leading-[1.05] tracking-[-2px]">
                Développons des solutions ensemble, pour durer.
              </h1>
              <p className="font-['Josefin_Sans'] text-lg md:text-xl lg:text-[30px] max-w-xl text-black/80">
                Nous sommes une entreprise béninoise de prestation de services,
                spécialisée dans les solutions technologiques, et numériques.
              </p>

            </div>

            <div className="hidden lg:flex justify-end items-start">
              <div className="relative w-full max-w-[520px]">
                <svg
                  className="w-[292px] h-[263px] mx-auto"
                  viewBox="0 0 1073 394"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1073.86 1.3562H781.397V131.712H1073.86V1.3562Z"
                    fill="black"
                  />
                  <path
                    d="M781.397 121.685V262.069L933.48 126.699L781.397 121.685Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video/Portfolio Preview Section */}
      <section className="relative py-12 lg:py-20 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl aspect-[16/10]">
            {!isPlaying ? (
              <>
                <div className="absolute inset-0 grid grid-cols-2 opacity-30">
                  <div className="grid grid-rows-2">
                    <img
                      loading="lazy"
                      src="https://api.builder.io/api/v1/image/assets/TEMP/254c96de53aa74e5e9d6c9ead451840f868809db?width=1274"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <img
                      loading="lazy"
                      src="https://api.builder.io/api/v1/image/assets/TEMP/95ad8dc98ab52cd728fa90b2acc0ff7c21557b1d?width=1274"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-rows-2">
                    <img
                      loading="lazy"
                      src="https://api.builder.io/api/v1/image/assets/TEMP/f53dca0b421643e6689834667f30625f6923ee2c?width=1248"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <img
                      loading="lazy"
                      src="https://api.builder.io/api/v1/image/assets/TEMP/99765e1af9c47da17880562b254c2330f1ccf7ff?width=1240"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    aria-label="Play demo"
                    onClick={() => setIsPlaying(true)}
                    className="w-[80px] h-[80px] bg-lime rounded-full flex items-center justify-center hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime/40"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 70 70"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.9805 24.5438C30.805 24.4266 30.601 24.3593 30.3902 24.349C30.1794 24.3386 29.9698 24.3856 29.7836 24.485C29.5975 24.5844 29.4418 24.7324 29.3331 24.9132C29.2243 25.0941 29.1667 25.3011 29.1663 25.5121V44.4879C29.1667 44.6989 29.2243 44.9059 29.3331 45.0868C29.4418 45.2676 29.5975 45.4156 29.7836 45.515C29.9698 45.6144 30.1794 45.6614 30.3902 45.651C30.601 45.6407 30.805 45.5734 30.9805 45.4562L45.2109 35.9713C45.371 35.8648 45.5022 35.7204 45.593 35.5509C45.6837 35.3815 45.7312 35.1922 45.7312 35C45.7312 34.8078 45.6837 34.6185 45.593 34.4491C45.5022 34.2796 45.371 34.1352 45.2109 34.0287L30.9776 24.5438H30.9805Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="https://cdn.pixabay.com/vimeo/239488055/coffee-13027.mp4?width=1280&hash=ebc2518f69c271df235e1f2e9b969c8ffbe69df2"
                controls
                autoPlay
              />
            )}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <p className="text-lime font-['Josefin_Sans'] text-xs lg:text-sm font-bold uppercase tracking-[0.2em] mb-2">
                Qui Sommes Nous ?
              </p>
              <div className="h-0.5 w-16 bg-lime mx-auto"></div>
            </div>

            <h2 className="text-black font-['Work_Sans'] text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed max-w-[900px] mx-auto">
              SR Technologies est une entreprise béninoise experte en{' '}
              <span className="text-lime font-bold">services numériques</span> et{' '}
              <span className="text-lime font-bold">technologiques</span>.
            </h2>

            <p className="text-black/70 font-['Work_Sans'] text-base md:text-lg leading-relaxed max-w-[800px] mx-auto">
              Nous fournissons des solutions innovantes et sur mesure ainsi que la vente d'équipements                et de pièces détachées pour accompagner votre transformation numérique et opérationnelle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/get-started"
                className="inline-flex bg-lime rounded-lg px-8 py-4 items-center gap-3 hover:bg-lime/90 hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
              >
                <span className="text-black font-['Josefin_Sans'] font-semibold uppercase text-sm tracking-wide">
                  Consultation Gratuite
                </span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to="/about"
                className="inline-flex border-2 border-black/20 rounded-lg px-8 py-4 items-center gap-3 hover:border-lime hover:bg-lime/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
              >
                <span className="text-black font-['Josefin_Sans'] font-semibold uppercase text-sm tracking-wide">
                  En Savoir Plus
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-20 bg-black px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-white/80 font-['Josefin_Sans'] text-sm lg:text-base font-medium uppercase tracking-wide mb-3">
              Our Best Services
            </p>
            <h2 className="text-white font-['Work_Sans'] text-2xl lg:text-[60px] font-medium leading-tight">
              We provide end-to-end solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Web Design and Development",
              "Branded Mobile Apps",
              "Strategy and Planning",
              "Photography and Video",
              "Digital Marketing",
              "AR and 3D Animation",
            ].map((title) => (
              <div
                key={title}
                className="bg-black/40 rounded-lg p-6 flex gap-4 items-start hover:scale-[1.01] transition-transform"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded bg-lime flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" fill="none" />
                    <path
                      d="M3 12h18"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium">{title}</h3>
                  <p className="text-white/70">
                    Product agency that makes people relations
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work/Portfolio Section */}
      <section className="py-12 lg:py-20 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-black font-['Work_Sans'] text-4xl lg:text-[56px] font-medium leading-tight">
              Our Latest
              <br />
              Work
            </h2>
            <Link
              to="/work"
              className="text-black font-medium uppercase flex items-center gap-3"
            >
              Our Case Studies{" "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16.172 11L10.808 5.63598L12.222 4.22198L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                img: "https://api.builder.io/api/v1/image/assets/TEMP/bfe592fa3a536dca7180a97d84a4277b4425749e?width=2042",
                title: "Conlete - Mobile App",
              },
              {
                img: "https://api.builder.io/api/v1/image/assets/TEMP/8ad56858487bd9dab5772d3a41679523ffcccb86?width=1800",
                title: "NFT - Website",
              },
              {
                img: "https://api.builder.io/api/v1/image/assets/TEMP/3cea6b8aa10780c952b755fd64ef305cd4a63ae8?width=1458",
                title: "Nursury - Website",
              },
            ].map((p) => (
              <article
                key={p.title}
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img
                  loading="lazy"
                  src={p.img}
                  alt={p.title}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/50 opacity-100 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-medium mb-3">
                    {p.title}
                  </h3>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-3 text-lime font-medium uppercase"
                  >
                    Case Study
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M16.172 11L10.808 5.63598L12.222 4.22198L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
                        fill="#0B6EF0"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-lime py-12 lg:py-20 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-black/80 font-['Josefin_Sans'] text-sm lg:text-base uppercase mb-4">
            Start a project
          </p>
          <h3 className="text-black text-3xl lg:text-[60px] font-['Work_Sans'] font-medium mb-6">
            Let's work together
          </h3>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-8 lg:py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-center text-black/80 uppercase mb-8 font-['Josefin_Sans']">
            Brands the real deal
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {brandLogos.map((b) => (
              <img
                key={b.alt}
                loading="lazy"
                src={b.src}
                alt={b.alt}
                className="h-12 lg:h-20 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
