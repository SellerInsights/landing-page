import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, BarChart2, Shield, Zap, Mail, Users, PieChart, Send } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Create refs for each section
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });
  const [pricingRef, pricingInView] = useInView({ threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ threshold: 0.1 });

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const navigationLinks = [
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-3xl font-bold text-blue-600 flex items-center hover:text-blue-700 transition-colors cursor-pointer" onClick={() => scrollToSection('hero')}>
                <BarChart2 className="mr-2" size={32} />
                DataViz
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Get Started <ArrowRight size={16} />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-6 h-0.5 bg-gray-600 my-1 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 md:hidden">
              <div className="flex flex-col p-4">
                {navigationLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="py-3 text-gray-600 hover:text-blue-600 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                  Get Started <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <section 
          id="hero" 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center"
        >
          <motion.div
            className="container mx-auto px-6 py-24 text-center"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Transform Your Store Data Into Insights
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Powerful dashboards and analytics tools designed for modern merchants.
              Get real-time insights into your store performance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Get Started <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section 
          id="features" 
          ref={featuresRef}
          className="py-24 bg-white"
        >
          <motion.div
            className="container mx-auto px-6"
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <BarChart2 size={32} />, title: "Real-time Analytics", description: "Monitor your store performance in real-time with interactive dashboards" },
                { icon: <Shield size={32} />, title: "Secure Data", description: "Enterprise-grade security to protect your sensitive business information" },
                { icon: <Zap size={32} />, title: "Fast Insights", description: "Get instant insights with our lightning-fast data processing" },
                { icon: <Users size={32} />, title: "Team Collaboration", description: "Share insights and collaborate with your team members seamlessly" },
                { icon: <PieChart size={32} />, title: "Custom Reports", description: "Create and schedule custom reports tailored to your needs" },
                { icon: <Mail size={32} />, title: "Alert Systems", description: "Set up custom alerts for important metrics and never miss a trend" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section 
          id="pricing" 
          ref={pricingRef}
          className="py-24 bg-gray-50"
        >
          <motion.div
            className="container mx-auto px-6"
            initial="hidden"
            animate={pricingInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">Simple Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Starter",
                  price: "$49",
                  features: ["5 Dashboards", "Basic Analytics", "Email Support", "1 Team Member"],
                  highlighted: false
                },
                {
                  title: "Professional",
                  price: "$99",
                  features: ["Unlimited Dashboards", "Advanced Analytics", "Priority Support", "5 Team Members"],
                  highlighted: true
                },
                {
                  title: "Enterprise",
                  price: "Custom",
                  features: ["Custom Solutions", "Dedicated Support", "API Access", "Unlimited Team Members"],
                  highlighted: false
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`p-8 rounded-xl ${plan.highlighted ? 'bg-blue-600 text-white' : 'bg-white'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                  <div className="text-3xl font-bold mb-6">{plan.price}</div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2">
                        <ArrowRight size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg ${plan.highlighted ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'} hover:opacity-90 transition-opacity`}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          ref={contactRef}
          className="py-24"
        >
          <motion.div
            className="container mx-auto px-6"
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>
            <div className="max-w-2xl mx-auto">
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg"
                >
                  Thanks for your message! We will get back to you soon.
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent h-32"
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  Send Message <Send size={20} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-white/30 backdrop-blur-md border-t border-gray-200">
          <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col items-center justify-center text-center">
              {/* Logo */}
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-blue-600 flex items-center hover:text-blue-700 transition-colors cursor-pointer" onClick={() => scrollToSection('hero')}>
                  <BarChart2 className="mr-2" size={32} />
                  DataViz
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-wrap justify-center"></div>

              {/* Copyright */}
              <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} DataViz. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
  
export default App;
