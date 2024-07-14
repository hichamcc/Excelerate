"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import excelFunctions from './excelFunctions';

const FormulaGenerator: React.FC = () => {
    const [selectedFunction, setSelectedFunction] = useState<ExcelFunction | null>(null);
    const [parameters, setParameters] = useState<string[]>([]);
    const [formula, setFormula] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...new Set(excelFunctions.map(func => func.category))];

    const handleFunctionSelect = (func: ExcelFunction) => {
        setSelectedFunction(func);
        setParameters([]);
    };

    const handleParameterChange = (index: number, value: string) => {
        const newParameters = [...parameters];
        newParameters[index] = value;
        setParameters(newParameters);
    };

    const generateFormula = () => {
        if (selectedFunction) {
            const newFormula = `${selectedFunction.name}(${parameters.join(', ')})`;
            setFormula(newFormula);
        }
    };

    const filteredFunctions = selectedCategory === 'All'
        ? excelFunctions
        : excelFunctions.filter(func => func.category === selectedCategory);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-8 ">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Formula Generator</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 1: Choose a category (optional)</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            className={`px-3 py-1 rounded ${selectedCategory === category ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 2: Choose a function</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredFunctions.map((func) => (
                        <motion.button
                            key={func.name}
                            className={`p-2 rounded ${selectedFunction?.name === func.name ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFunctionSelect(func)}
                        >
                            {func.name}
                        </motion.button>
                    ))}
                </div>
            </div>

            {selectedFunction && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 3: Understand the function</h3>
                    <p className="text-gray-600 mb-2"><strong>Description:</strong> {selectedFunction.description}</p>
                    <p className="text-gray-600 mb-2"><strong>Syntax:</strong> {selectedFunction.syntax}</p>
                    <p className="text-gray-600 mb-4"><strong>Example:</strong> {selectedFunction.example}</p>

                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 4: Enter parameters</h3>
                    {selectedFunction.syntax.split(',').map((param: any, index: any) => (
                        <div key={index} className="mb-2">
                            <label className="block text-gray-700 mb-1">{param.trim()}:</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={parameters[index] || ''}
                                onChange={(e) => handleParameterChange(index, e.target.value)}
                                placeholder="Enter a cell reference or value"
                            />
                        </div>
                    ))}
                    <motion.button
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={generateFormula}
                    >
                        Generate Formula
                    </motion.button>
                </div>
            )}

            {formula && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Generated Formula:</h3>
                    <div className="p-4 bg-gray-100 rounded">
                        <code className="text-lg font-mono">=
                            {formula}</code>
                    </div>
                    <p className="mt-2 text-gray-600">You can now copy this formula and paste it into your Excel spreadsheet.</p>
                </div>
            )}
        </div>
    );
};

export default FormulaGenerator;