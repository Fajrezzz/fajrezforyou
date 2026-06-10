import { useEffect, useState, useRef } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Loading screen timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Create particles
    const createParticles = () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = "";
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement("div");
          particle.className = "absolute w-1 h-1 bg-gold rounded-full animate-float";
          particle.style.left = Math.random() * 100 + "vw";
          particle.style.animationDuration = 3 + Math.random() * 7 + "s";
          particle.style.animationDelay = Math.random() * 5 + "s";
          particlesRef.current.appendChild(particle);
        }
      }
    };

    // Create floating hearts
    const createHearts = () => {
      if (heartsRef.current) {
        const heart = document.createElement("div");
        heart.className = "absolute text-red-500 text-2xl animate-float-heart";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 8 + Math.random() * 4 + "s";
        heart.style.fontSize = 1.5 + Math.random() * 1.5 + "rem";
        heart.innerHTML = "❤";
        heartsRef.current.appendChild(heart);

        setTimeout(() => {
          if (heart.parentNode) heart.parentNode.removeChild(heart);
        }, 12000);
      }
    };

    // Create falling stars
    const createStars = () => {
      if (starsRef.current) {
        const star = document.createElement("div");
        star.className = "absolute text-yellow-300 text-lg animate-twinkle";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 50 + "vh";
        star.style.animationDuration = 1 + Math.random() * 2 + "s";
        star.innerHTML = "★";
        starsRef.current.appendChild(star);

        setTimeout(() => {
          if (star.parentNode) star.parentNode.removeChild(star);
        }, 5000);
      }
    };

    createParticles();
    const heartInterval = setInterval(createHearts, 1500);
    const starInterval = setInterval(createStars, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(heartInterval);
      clearInterval(starInterval);
    };
  }, []);

  const scrollToVideo = () => {
    const videoSection = document.getElementById("video-section");
    videoSection?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-romantic-piano-loop-286.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4 animate-pulse-slow">
            FAJREZZZ <span className="text-red-500">❤️</span>
          </h1>
          <p className="text-xl text-gray-300 animate-fade-in">Preparing something special...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* Floating Particles Container */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0" />
      <div ref={heartsRef} className="fixed inset-0 pointer-events-none z-0" />
      <div ref={starsRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-zoom-bg"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gold drop-shadow-2xl">
            FAJREZZZ — FOR YOU <span className="text-red-500">❤️</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
            A small corner of the internet created for someone truly special.
          </p>
          <button
            onClick={scrollToVideo}
            className="px-8 py-4 bg-gold text-black font-semibold rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-yellow-500/30 animate-shimmer"
          >
            Watch My Message
          </button>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">
            A Message From Me
          </h2>
          <div className="glassmorphism rounded-3xl p-4 golden-glow animate-fade-in">
            <div className="relative pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/MLX11dz4ObY?autoplay=1&loop=1&playlist=MLX11dz4ObY"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-3xl mx-auto glassmorphism rounded-3xl p-8 md:p-12 golden-glow">
          <div className="text-center space-y-6">
            <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light">
              Jujur saja,<br />
              aku sangat menyukaimu.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Aku sadar aku masih memiliki banyak kekurangan.<br />
              Namun setiap hari aku berusaha menjadi lebih baik.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Bukan karena aku sempurna,<br />
              tetapi karena ada seseorang yang membuatku ingin terus berkembang.
            </p>
            <p className="text-xl md:text-2xl text-gold leading-relaxed font-medium pt-4">
              Terima kasih karena tanpa sadar,<br />
              kamu telah menjadi alasan untuk terus melangkah.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">
            Moments We Cherish
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1529626455599-420b3a75a436?w=600&h=800&fit=crop",
              "https://images.unsplash.com/photo-1518806118475-4c5c9b6c4f5c?w=600&h=800&fit=crop",
              "https://images.unsplash.com/photo-1508264165352-25e40e306365?w=600&h=800&fit=crop",
              "https://images.unsplash.com/photo-1507594658963-5c5d8b1b2b5c?w=600&h=800&fit=crop",
              "https://images.unsplash.com/photo-1504703673-1172a4d4e8f5?w=600&h=800&fit=crop",
              "https://images.unsplash.com/photo-1494831758665-7c5b1c5c5b5c?w=600&h=800&fit=crop",
            ].map((photo, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:rotate-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                  src={photo}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <p className="text-sm font-light">Cherished Moment</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            <img
              src="/final-photo.jpg"
              alt="Special"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-gold animate-glow"
            />
            <div className="absolute -inset-4 rounded-full border border-yellow-500/30 animate-pulse-slow" />
          </div>
          <p className="text-2xl md:text-3xl text-gray-200 italic mb-4">
            Some people enter our lives and quietly make everything feel different.
          </p>
          <p className="text-3xl text-gold font-semibold">
            Thank you for being you <span className="text-red-500">❤️</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 relative">
        <div className="max-w-2xl mx-auto text-center glassmorphism rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-gold mb-2">
            FAJREZZZ <span className="text-red-500">❤️</span>
          </h3>
          <p className="text-gray-400">
            Made with sincerity, respect, and admiration.
          </p>
        </div>
      </footer>

      {/* Music Player */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className="glassmorphism rounded-full p-4 text-gold hover:text-yellow-300 transition-all duration-300 shadow-lg shadow-yellow-500/20"
        >
          {musicPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.816a3.75 3.75 0 014.234 0l.766.5a3.75 3.75 0 011.766 3.224v7.772a3.75 3.75 0 01-1.766 3.224l-.766.5a3.75 3.75 0 01-4.234 0L8.617 17.95a3.75 3.75 0 01-1.766-3.224V7.54a3.75 3.75 0 011.766-3.224l.766-.5zM12 15.75a5.75 5.75 0 10-11.5 0 5.75 5.75 0 0011.5 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.816a3.75 3.75 0 014.234 0l.766.5a3.75 3.75 0 011.766 3.224v7.772a3.75 3.75 0 01-1.766 3.224l-.766.5a3.75 3.75 0 01-4.234 0L8.617 17.95a3.75 3.75 0 01-1.766-3.224V7.54a3.75 3.75 0 011.766-3.224l.766-.5z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}