import Navbar from '@/components/nav-bar'
import Footer from '@/components/ui/footer'
import React, { useEffect, useState } from 'react'

function Shop() {
  const videoList = [
    "/videos/bg1.mp4",
    "/videos/bg2.mp4",
    "/videos/bg3.mp4",
    "/videos/bg4.mp4",
    "/videos/bg5.mp4",
  ];

  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoList.length);
    setSelectedVideo(videoList[randomIndex]);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center pt-14 min-h-screen bg-gray-100">
        <div className="relative z-10 flex flex-col w-[190vh] h-[35vh] bg-black/60 text-white p-14 rounded-2xl shadow-lg items-center justify-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white z-20 overflow-hidden whitespace-nowrap border-r-4 border-white w-[23ch] animate-typing">
            Breathe Easy. Plant More.
          </h1>

          <video
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            src={selectedVideo}
          />
        </div>

        {/* Plant Section */}
        <div className="w-4/5 mb-10">
          <h1
            className="ml-0 text-black mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem" }}
          >
            Some Plant Collection for You
          </h1>

          
            <div className="flex gap-x-6 min-w-max">
              {[
                { name: "Aloe Vera", desc: "Indoor Plant" },
                { name: "Peace Lily", desc: "Air Purifying" },
                { name: "Snake Plant", desc: "Low Maintenance" },
                { name: "Fern", desc: "Shade Friendly" },
                { name: "Succulent", desc: "Drought Resistant" },
                { name: "Money Plant", desc: "Good Luck Charm" },
              ].map((plant, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md w-48 flex-shrink-0">
                  <img
                    src="/images/pianta.jpg"
                    alt={plant.name}
                    className="w-full h-28 object-cover rounded-md mb-2"
                  />
                  <h2 className="text-lg font-semibold text-black">{plant.name}</h2>
                  <p className="text-sm text-gray-600">{plant.desc}</p>
                </div>
              ))}
            </div>
        
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
