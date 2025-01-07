"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { Sparkles, Zap, Brain, Clock, Layout } from 'lucide-react';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { isLoaded } = useAuth(); // Get the signIn method
  const { user } = useUser(); // Get the current user
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    if (!user) {
      window.location.href = "/sign-in"; // Redirect to sign-in page
    } else {
      window.location.href = "/dashboard"; // Redirect to dashboard
    }
  };

  // Check if the user is already logged in, and redirect to the dashboard if logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Loading state to ensure Clerk is fully loaded
  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 px-4">
        <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-6 leading-tight">
              Transform Your Ideas Into
              <span className="block">Brilliant Content</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Harness the power of advanced AI to create exceptional content that captivates your audience. From blogs to social media, deliver compelling stories in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 text-xl font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Start Creating Now
                <Zap className="inline-block ml-2 h-5 w-5 animate-bounce" />
              </button>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">
                Learn More ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Unleash Your Creative Potential
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              {
                icon: <Brain className="h-8 w-8 text-purple-400" />,
                title: "AI-Powered Intelligence",
                description: "Advanced algorithms understand context and tone to generate human-like content that resonates with your audience."
              },
              {
                icon: <Clock className="h-8 w-8 text-purple-400" />,
                title: "Smart Customization",
                description: "Fine-tune every aspect of your content with intelligent controls for tone, style, and format."
              },
              {
                icon: <Layout className="h-8 w-8 text-purple-400" />,
                title: "Lightning Fast",
                description: "Generate weeks worth of content in minutes. Save time while maintaining quality and consistency."
              }
            ].map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/50 to-gray-900/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-purple-300">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/10 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Loved by Content Creators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[ 
              {
                quote: "This tool has revolutionized my content creation process. What used to take days now takes minutes, and the quality is outstanding.",
                author: "Sarah Johnson",
                role: "Content Marketing Manager"
              },
              {
                quote: "The AI understands exactly what I need. It's like having a professional writer on standby 24/7. Absolutely game-changing!",
                author: "Michael Chen",
                role: "Digital Entrepreneur"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/30 to-gray-900/30 backdrop-blur-sm border border-purple-500/20">
                <p className="text-xl text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-purple-300">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-lg py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-6">© AI Content Generator, 2025. All rights reserved.</p>
          <div className="flex justify-center space-x-8">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
