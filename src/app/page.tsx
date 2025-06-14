import CardGrid from "@/components/hero/card-grid";
import ContactForm from "@/components/hero/contact-form";
import { Card } from "@/types";

export default function Home() {
  const cards: Card[] = [
    {
      id: 1,
      date: "02/18/2074",
      title: "Code CR-4519: Anomaly Detection in Array",
      link: "#",
      image: "/images/img1.jpg"
    },
    {
      id: 2,
      date: "02/20/2074",
      title: "Case Log 3X-782: Malfunction Analysis of Drone Units",
      link: "#",
      image: "/images/img2.jpg"
    },
    {
      id: 3,
      date: "03/17/2074",
      title: "Code CR-3037: Data Flow Optimization for Transmission",
      link: "#",
      image: "/images/img3.jpg"
    },
  ];

  return (
    <main className="bg-[#0c0b10] text-[rgba(255,255,255,0.95)] min-h-screen">
      <div className="container mx-auto px-4 py-8">
      <div className="frame py-8">
        <h1 className="text-xl font-normal">
          Starlog Entry: Design distortion inspired by <span className="text-[rgb(124,20,244,0.9)] hover:text-[rgb(94,54,176,0.75)]">Mulverse Network</span>
        </h1>
        <span className="text-[rgb(124,20,244,0.9)] hover:text-[rgb(94,54,176,0.75)]">Initiate visual matrix</span>
      </div>


        
        <div className="title flex justify-center text-[clamp(2rem,8.5vw,8rem)] my-[14vh] mx-auto w-min border-b border-[rgba(177,177,177,0.3)]">
          <span className="first-letter:opacity-50 font-mono">Mulverse</span> 
        </div>
        
        <p className="subtitle text-center uppercase">
          ⧉ Our digital world is being reset - expect to see new dimensions. ⧉
        </p>

        <CardGrid cards={cards} />
        <ContactForm />
        
        <div className="frame py-8 text-center">
          <h2 className="text-xl font-medium text-purple-300">☄️ Incoming Transmission</h2>
          <p className="mt-2 text-sm text-gray-400 max-w-xl mx-auto">
            Signal detected from deep within the Mulverse. Visual systems are aligning.  
            Prepare for an experience woven across time and code. The sequence will commence shortly.
          </p>
        </div>
      </div>
    </main>
  );
}
