'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const FeatureCard = ({ title, description, icon, link }: any) => (
  <Link href={link}>
    <motion.div
      className="bg-white backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      variants={fadeIn}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3 text-green-600">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  </Link>
);




export default function Home() {
  return (
    <div className="min-h-screen bg-green-50">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Simplify Your Excel Experience</h2>
          <p className="text-xl text-gray-600 mb-8">Powerful tools to boost your productivity and streamline your workflow.</p>

        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 "
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ staggerChildren: 0.1 }}
        >
          <FeatureCard
            title="Formula Generator"
            description="Create complex Excel formulas with ease using our intuitive generator."
            icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
            link="/formula-generator"
          />
          <FeatureCard
            title="Excel Tips and Shortcuts"
            description="Discover useful Excel tips and keyboard shortcuts to boost your productivity."
            icon={<svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
            link="/excel-tips"
          />

          <FeatureCard
            title="Excel Template Gallery"
            description="Access a wide range of pre-built Excel templates for various business and personal needs."
            icon={<svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            link="/excel-template"
          />
          <FeatureCard
            title="Custom Function Library"
            description="Access a wide range of custom functions to enhance your Excel experience."
            icon={<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            link="/custom-function-library"
          />

        </motion.div>


        <ContactForm />

      </main>

      <Footer />
    </div>
  );
}