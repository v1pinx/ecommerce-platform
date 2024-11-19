'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="bg-black min-h-screen pt-6">
      <div
        className="bg-cover bg-center min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url(//techno-workdo.myshopify.com/cdn/shop/files/common-banner.png?v=1714735867)",
        }}
      >
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white p-8 backdrop-blur-md bg-black/50 rounded-lg shadow-lg max-w-2xl"
          >
            <h1 className="text-4xl font-extrabold tracking-wider mb-4">Contact Us</h1>
            <p className="text-lg font-light">We're here to help! Send us your queries and we'll get back to you as soon as possible.</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form - Light Theme */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                  placeholder="How can we help?"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-teal-600 transition-colors shadow-lg"
              >
                <Send className="h-5 w-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information - Dark Theme */}
          <div className="space-y-8">
            {[
              {
                icon: <Phone className="text-white h-6 w-6" />,
                title: "Phone",
                lines: ["+1 (555) 123-4567", "+1 (555) 765-4321"]
              },
              {
                icon: <Mail className="text-white h-6 w-6" />,
                title: "Email",
                lines: ["support@techstore.com", "sales@techstore.com"]
              },
              {
                icon: <MapPin className="text-white h-6 w-6" />,
                title: "Address",
                lines: ["123 Tech Street", "Silicon Valley, CA 94025"]
              },
              {
                icon: <Clock className="text-white h-6 w-6" />,
                title: "Business Hours",
                lines: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"]
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-lg flex items-start gap-4 group hover:bg-gray-800 transition-colors"
              >
                <div className="bg-teal-500 p-3 rounded-lg group-hover:bg-teal-400 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className=" mt-1">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;