// app/page.tsx

"use client";

import { Container } from '@/app/components/ui/Container';
import { Card } from '@/app/components/ui/card';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

export default function HomePage() {
  const scrollTypes = [
    { 
      type: "SINGLE", 
      prefix: "SGL-", 
      replies: "No", 
      views: "5 views (fixed)",
      description: "One-time private message. Cannot be replied to"
    },
    { 
      type: "SECURE_SINGLE", 
      prefix: "SSL-", 
      replies: "No", 
      views: "1 view (fixed)",
      description: "Self-destructs after a single read"
    },
    { 
      type: "BROADCAST", 
      prefix: "BRC-", 
      replies: "No", 
      views: "1-1B (custom)",
      description: "Announcement to many. Sender defines views"
    },
    { 
      type: "THREAD", 
      prefix: "THD-", 
      replies: "Yes", 
      views: "Custom",
      description: "Private 1-to-1 conversation. Unlimited replies"
    },
    { 
      type: "GROUP", 
      prefix: "GRP-", 
      replies: "Yes", 
      views: "Custom",
      description: "Secure group discussion. Unlimited replies"
    }
  ];

  const algorithms = [
    { name: "AES_256", key: "256 bits", cipher: "AES/GCM/NoPadding" },
    { name: "CHACHA20", key: "256 bits", cipher: "ChaCha20-Poly1305" },
    { name: "TWOFISH", key: "256 bits", cipher: "Twofish/GCM/NoPadding" }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-primary-900 py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
          <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-purple-500 rounded-full filter blur-[80px] opacity-15"></div>
        </div>
        
        <Container className="relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn}>
              <div className="inline-flex items-center bg-blue-900/20 px-4 py-1 rounded-full mb-6">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-blue-300 text-sm font-medium">MILITARY-GRADE ENCRYPTION</span>
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Secure Your Messages with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Zero-Trust Encryption</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
            >
              Send self-destructing, end-to-end encrypted messages with military-grade security. 
              Control access, views, and expiration with unparalleled privacy.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/create-ticket">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Send Secure Message
                </button>
              </Link>
              <a
                href="https://github.com/pkp245464/SecureMsgX/blob/main/SecureMsgX%20documentations.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 hover:bg-gray-800 text-white font-medium rounded-xl transition-all duration-300 inline-block text-center"
              >
                Explore Documentation
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Security Experts Choose SecureMsgX
          </h2>
          <p className="text-gray-600 text-lg">
            Enterprise-grade security features designed for uncompromising privacy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "End-to-End Encryption",
              description: "AES-256, ChaCha20, or Twofish encryption - only sender and recipient can read messages",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )
            },
            {
              title: "Self-Destructing Messages",
              description: "Control views from 1 to 1 billion - messages vanish after reading or expiration",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            {
              title: "Zero Server Visibility",
              description: "Client-side encryption ensures servers never see your content",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )
            },
            {
              title: "Flexible Scroll Types",
              description: "SINGLE, SECURE_SINGLE, BROADCAST, THREAD, GROUP - tailor to your needs",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )
            },
            {
              title: "API-Ready Integration",
              description: "Well-structured endpoints for automating secure message flows",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              )
            },
            {
              title: "Globally Scalable",
              description: "AWS infrastructure with containerized backend - reliable worldwide access",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="h-full p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-200 transition-all hover:shadow-lg">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Scroll Types Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <Container>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Secure Scroll Types
            </h2>
            <p className="text-gray-600 text-lg">
              Tailor your security with specialized message formats
            </p>
          </motion.div>

          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefix</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Replies</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Views</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scrollTypes.map((scroll, index) => (
                  <motion.tr 
                    key={index}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {scroll.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{scroll.prefix}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{scroll.replies}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{scroll.views}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">{scroll.description}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Example: BRC-0000019834af0d3cd3c7b79d97eb7f4c55d3
            </p>
          </div>
        </Container>
      </div>

      {/* Encryption Algorithms */}
      <Container className="py-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Military-Grade Encryption
          </h2>
          <p className="text-gray-600 text-lg">
            Industry-standard algorithms protecting your communications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {algorithms.map((algo, index) => (
            <motion.div
              key={index}
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-200 transition-all h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{algo.name}</h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {algo.key}
                  </span>
                </div>
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Cipher</div>
                  <div className="font-mono text-gray-800 bg-gray-100 p-2 rounded text-sm">{algo.cipher}</div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Supported in all scroll types
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* API Endpoints CTA */}
      <div className="py-20 bg-gradient-to-r from-gray-900 to-primary-900">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Integrate with Our Secure API
              </h2>
              <p className="text-blue-200 max-w-2xl mx-auto">
                Doors of Durin endpoints for creating, viewing, and managing encrypted scrolls
              </p>
            </motion.div>

            <motion.div 
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm text-left">
                <div className="md:col-span-1 font-mono text-blue-400">POST</div>
                <div className="md:col-span-4 font-mono text-gray-300">
                  /doors-of-durin/sigil-scrolls/new-ticket
                </div>
                
                <div className="md:col-span-1 font-mono text-blue-400">POST</div>
                <div className="md:col-span-4 font-mono text-gray-300">
                  /doors-of-durin/sigil-scrolls/view
                </div>
                
                <div className="md:col-span-1 font-mono text-blue-400">POST</div>
                <div className="md:col-span-4 font-mono text-gray-300">
                  /doors-of-durin/sigil-scrolls/replies
                </div>
                
                <div className="md:col-span-1 font-mono text-blue-400">DELETE</div>
                <div className="md:col-span-4 font-mono text-gray-300">
                  /doors-of-durin/sigil-scrolls/delete/&#123;ticketId&#125;
                </div>
                
                <div className="md:col-span-1 font-mono text-blue-400">GET</div>
                <div className="md:col-span-4 font-mono text-gray-300">
                  /doors-of-durin/sigil-scrolls/api-usage-metrics
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <a
                href="https://github.com/pkp245464/SecureMsgX/blob/main/SecureMsgX%20documentations.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all inline-block text-center"
              >
                Explore Full API Documentation
              </a>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Final CTA */}
      <Container className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Send Secure Messages?
            </h2>
            <p className="text-gray-600">
              Join thousands of security professionals trusting SecureMsgX for their sensitive communications
            </p>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Link href="/create-ticket">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                Start Protecting Your Messages Now
              </button>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="mt-8 flex flex-wrap justify-center gap-4 text-gray-500 text-sm"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No account required
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              End-to-end encryption
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Open source
            </span>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}