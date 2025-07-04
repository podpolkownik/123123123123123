import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Results from './components/Results';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Results />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;