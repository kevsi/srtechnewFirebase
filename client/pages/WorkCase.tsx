import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";

export default function WorkCase() {
  const { slug } = useParams();
  const data = {
    conlete: {
      title: 'Conlete - Mobile App',
      img: 'https://api.builder.io/api/v1/image/assets/TEMP/bfe592fa3a536dca7180a97d84a4277b4425749e?width=2042',
      content: 'Full case study describing goals, process, results and learnings.'
    },
    nft: {
      title: 'NFT - Website',
      img: 'https://api.builder.io/api/v1/image/assets/TEMP/8ad56858487bd9dab5772d3a41679523ffcccb86?width=1800',
      content: 'Full case study describing goals, process, results and learnings.'
    },
    nursury: {
      title: 'Nursury - Website',
      img: 'https://api.builder.io/api/v1/image/assets/TEMP/3cea6b8aa10780c952b755fd64ef305cd4a63ae8?width=1458',
      content: 'Full case study describing goals, process, results and learnings.'
    }
  } as Record<string, any>;

  const project = slug ? data[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="max-w-[800px] mx-auto px-6 py-20">
          <h1 className="text-3xl font-medium mb-4">Case Study not found</h1>
          <p className="mb-6">We couldn't find that case study.</p>
          <Link to="/work" className="text-lime">Back to work</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="max-w-[1000px] mx-auto px-6 py-12 lg:py-20">
        <h1 className="text-4xl font-medium mb-6">{project.title}</h1>
        <img loading="lazy" src={project.img} alt={project.title} className="w-full h-64 object-cover rounded mb-6" />
        <p className="text-black/80">{project.content}</p>
      </main>
      <Footer />
    </div>
  );
}
