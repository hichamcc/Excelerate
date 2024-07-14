'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <motion.h1

                    className="text-3xl font-bold text-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" >Excelerate</Link>
                </motion.h1>
                <nav>
                    <ul className="flex space-x-6">
                        <motion.li whileHover={{ scale: 1.1 }}><Link href="/" className="text-gray-600 hover:text-green-500">Home</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1 }}><Link href="#" className="text-gray-600 hover:text-green-500">Features</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1 }}><Link href="#" className="text-gray-600 hover:text-green-500">Contact</Link></motion.li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;