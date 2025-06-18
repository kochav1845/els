import React, { useState } from 'react';
import { Music, Camera, Video, Calendar, ChevronRight, Mail, Phone, MapPin, Play, Pause } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleVideo = () => {
    const video = document.querySelector('.feature-video') as HTMLVideoElement;
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                StageStudio
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#info" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a>
              <a href="#video" className="text-gray-600 hover:text-indigo-600 transition-colors">Video</a>
              <a href="#gallery" className="text-gray-600 hover:text-indigo-600 transition-colors">Gallery</a>
              <a href="#book" className="text-gray-600 hover:text-indigo-600 transition-colors">Book a Show</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 pb-4">
              <a href="#info" className="block text-gray-600 hover:text-indigo-600">About</a>
              <a href="#video" className="block text-gray-600 hover:text-indigo-600">Video</a>
              <a href="#gallery" className="block text-gray-600 hover:text-indigo-600">Gallery</a>
              <a href="#book" className="block text-gray-600 hover:text-indigo-600">Book a Show</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute min-w-full min-h-full object-cover"
          >
            <source src="https://res.cloudinary.com/dizjzyhwp/video/upload/f_auto:video,q_auto/v1/on%20stage/cuxb2r73iqx08giskjgk" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Create Unforgettable Musical Memories
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We bring the magic of music creation to Jewish camps, composing and recording songs with children in real-time.
          </p>
          <a 
            href="#book" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book Your Show
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Music className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Collaborative Songwriting</h3>
              <p className="text-gray-600">Work with campers to compose original songs that reflect their creativity and spirit.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional Recording</h3>
              <p className="text-gray-600">Record and produce high-quality tracks right on the spot with our mobile studio.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Video className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Memory Making</h3>
              <p className="text-gray-600">Capture the entire creative process on video for lasting memories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section id="video" className="py-24 bg-gradient-to-br from-slate-100 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Watch Us in Action
          </h2>
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <video 
              className="w-full feature-video"
              src="https://res.cloudinary.com/dizjzyhwp/video/upload/f_auto:video,q_auto/v1/on%20stage/cuxb2r73iqx08giskjgk"
              poster="https://images.unsplash.com/photo-1516280440614-37939bbacd81"
            />
            <button
              onClick={toggleVideo}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
            >
              {!isVideoPlaying ? (
                <Play className="w-16 h-16 text-white transform group-hover:scale-110 transition-transform" />
              ) : (
                <Pause className="w-16 h-16 text-white transform group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Gallery
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81" 
                alt="Recording session" 
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618" 
                alt="Kids singing" 
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae" 
                alt="Summer camp music" 
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Book a Show Section */}
      <section id="book" className="py-24 bg-gradient-to-br from-slate-100 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Book a Show
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6 bg-white p-8 rounded-2xl shadow-xl">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Camp Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your camp name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="date">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Tell us about your camp and what you're looking for"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Music className="w-6 h-6 text-indigo-400" />
                <span className="text-xl font-bold text-white">StageStudio</span>
              </div>
              <p className="text-gray-400">
                Bringing musical creativity to Jewish camps across the country.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <a href="mailto:contact@stagestudio.com" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                  <span>contact@stagestudio.com</span>
                </a>
                <a href="tel:+15551234567" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                  <span>(555) 123-4567</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span>Based in New York</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <div className="space-y-4">
                <a href="#info" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#video" className="block text-gray-400 hover:text-white transition-colors">Video</a>
                <a href="#gallery" className="block text-gray-400 hover:text-white transition-colors">Gallery</a>
                <a href="#book" className="block text-gray-400 hover:text-white transition-colors">Book a Show</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} StageStudio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;