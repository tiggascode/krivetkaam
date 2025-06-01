import React from 'react';

const Hero = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden bg-gradient-to-br from-premium-onyx-800 via-premium-sapphire-800 to-premium-onyx-700">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
      <div className="container mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h2 className="text-6xl md:text-8xl font-playfair font-bold text-premium-pearl-50 mb-8 leading-tight tracking-tight">
            <span className="text-premium-gold-400">Krivetka</span>
            <span className="text-premium-pearl-50">.am</span>
          </h2>
          <p className="text-xl md:text-2xl text-premium-pearl-200 mb-12 max-w-3xl mx-auto font-inter leading-relaxed">
            Experience the epitome of luxury seafood. Each catch is a testament to our commitment to excellence and sustainable practices.
          </p>
        </div>
      </div>

      {/* Premium decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🐟</div>
      <div className="absolute top-40 right-16 text-4xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🦐</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🦀</div>

      {/* Premium decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-premium-gold-500 to-transparent"></div>
    </section>
  );
};

export default Hero;
