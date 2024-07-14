'use client';

import React from 'react';
import FormulaGenerator from '../components/FormulaGenerator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExcelTipsPage from '../components/ExcelTips';
import ChartWizard from '../components/ChartWizard';

export default function FormulaGeneratorPage() {
    return (
        <div className="min-h-screen bg-green-50 pb-32">
            <Header />
            <ChartWizard />
            <Footer />
        </div>
    );
}