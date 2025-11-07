import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-black font-['Work_Sans'] text-6xl lg:text-[100px] font-medium mb-6">
            404
          </h1>
          <p className="text-black/80 font-['Work_Sans'] text-2xl lg:text-3xl mb-8">
            Page not found
          </p>
          <p className="text-black/60 font-['Work_Sans'] text-lg mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-lime rounded px-12 py-5 hover:opacity-90 transition-opacity"
          >
            <span className="text-black font-['Work_Sans'] text-base font-medium uppercase">
              Back to Home
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.172 11L10.808 5.63598L12.222 4.22198L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
                fill="black"
              />
            </svg>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
