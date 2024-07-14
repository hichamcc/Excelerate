"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';


type ExcelFunction = {
    name: string;
    description: string;
    syntax: string;
    example: string;
    category: string;
};

const excelFunctions: ExcelFunction[] = [
    {
        name: 'SUM',
        description: 'Adds up a series of numbers',
        syntax: 'SUM(number1, [number2], ...)',
        example: 'SUM(A1:A10) adds up the values in cells A1 through A10',
        category: 'Math',
    },
    {
        name: 'AVERAGE',
        description: 'Calculates the average (arithmetic mean) of a series of numbers',
        syntax: 'AVERAGE(number1, [number2], ...)',
        example: 'AVERAGE(B1:B20) calculates the average of values in cells B1 through B20',
        category: 'Math',
    },
    {
        name: 'COUNT',
        description: 'Counts the number of cells that contain numbers',
        syntax: 'COUNT(value1, [value2], ...)',
        example: 'COUNT(A1:A10) counts how many cells in A1:A10 contain numbers',
        category: 'Math',
    },
    {
        name: 'MAX',
        description: 'Returns the largest value in a set of numbers',
        syntax: 'MAX(number1, [number2], ...)',
        example: 'MAX(C1:C50) returns the largest value in cells C1 through C50',
        category: 'Math',
    },
    {
        name: 'MIN',
        description: 'Returns the smallest value in a set of numbers',
        syntax: 'MIN(number1, [number2], ...)',
        example: 'MIN(D1:D100) returns the smallest value in cells D1 through D100',
        category: 'Math',
    },
    {
        name: 'IF',
        description: 'Performs a logical test and returns one value for TRUE, another for FALSE',
        syntax: 'IF(logical_test, value_if_true, value_if_false)',
        example: 'IF(A1>10, "High", "Low") returns "High" if A1 is greater than 10, otherwise "Low"',
        category: 'Logical',
    },
    {
        name: 'AND',
        description: 'Returns TRUE if all arguments are TRUE',
        syntax: 'AND(logical1, [logical2], ...)',
        example: 'AND(A1>10, B1<20) returns TRUE if both conditions are met',
        category: 'Logical',
    },
    {
        name: 'OR',
        description: 'Returns TRUE if any argument is TRUE',
        syntax: 'OR(logical1, [logical2], ...)',
        example: 'OR(A1>10, B1<5) returns TRUE if either condition is met',
        category: 'Logical',
    },
    {
        name: 'CONCATENATE',
        description: 'Combines text from multiple cells into one cell',
        syntax: 'CONCATENATE(text1, [text2], ...)',
        example: 'CONCATENATE(A1, " ", B1) joins the text from A1 and B1 with a space between',
        category: 'Text',
    },
    {
        name: 'LEFT',
        description: 'Returns a specified number of characters from the start of a text string',
        syntax: 'LEFT(text, [num_chars])',
        example: 'LEFT(A1, 3) returns the first 3 characters from the text in A1',
        category: 'Text',
    },
    {
        name: 'RIGHT',
        description: 'Returns a specified number of characters from the end of a text string',
        syntax: 'RIGHT(text, [num_chars])',
        example: 'RIGHT(B1, 4) returns the last 4 characters from the text in B1',
        category: 'Text',
    },
    {
        name: 'UPPER',
        description: 'Converts text to uppercase',
        syntax: 'UPPER(text)',
        example: 'UPPER(A1) converts the text in A1 to all uppercase letters',
        category: 'Text',
    },
    {
        name: 'LOWER',
        description: 'Converts text to lowercase',
        syntax: 'LOWER(text)',
        example: 'LOWER(B1) converts the text in B1 to all lowercase letters',
        category: 'Text',
    },
    {
        name: 'TODAY',
        description: 'Returns the current date',
        syntax: 'TODAY()',
        example: 'TODAY() returns the current date',
        category: 'Date',
    },
    {
        name: 'DATEDIF',
        description: 'Calculates the number of days, months, or years between two dates',
        syntax: 'DATEDIF(start_date, end_date, unit)',
        example: 'DATEDIF(A1, B1, "Y") calculates the number of complete years between dates in A1 and B1',
        category: 'Date',
    },
    {
        name: 'VLOOKUP',
        description: 'Looks up a value in the first column of a table and returns a value in the same row from a specified column',
        syntax: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
        example: 'VLOOKUP(A1, B1:D10, 2, FALSE) looks up the value of A1 in the first column of B1:D10 and returns the corresponding value from the second column',
        category: 'Lookup',
    },
    {
        name: 'INDEX',
        description: 'Returns the value at a specified position in a range or array',
        syntax: 'INDEX(array, row_num, [column_num])',
        example: 'INDEX(A1:C10, 2, 3) returns the value in the 2nd row and 3rd column of the range A1:C10',
        category: 'Lookup',
    },
    {
        name: 'MATCH',
        description: 'Looks up a value in a range and returns its relative position',
        syntax: 'MATCH(lookup_value, lookup_array, [match_type])',
        example: 'MATCH("Apple", A1:A10, 0) returns the position of "Apple" in the range A1:A10',
        category: 'Lookup',
    },
    {
        name: 'ROUND',
        description: 'Rounds a number to a specified number of digits',
        syntax: 'ROUND(number, num_digits)',
        example: 'ROUND(A1, 2) rounds the number in A1 to 2 decimal places',
        category: 'Math',
    },
    {
        name: 'MEDIAN',
        description: 'Returns the median of the given numbers',
        syntax: 'MEDIAN(number1, [number2], ...)',
        example: 'MEDIAN(A1:A100) returns the median value in the range A1:A100',
        category: 'Statistical',
    },
    {
        name: 'MODE.SNGL',
        description: 'Returns the most frequently occurring, or repetitive, value in an array or range of data',
        syntax: 'MODE.SNGL(number1, [number2], ...)',
        example: 'MODE.SNGL(B1:B50) returns the most common value in the range B1:B50',
        category: 'Statistical',
    },
    {
        name: 'STDEV.P',
        description: 'Calculates standard deviation based on the entire population',
        syntax: 'STDEV.P(number1, [number2], ...)',
        example: 'STDEV.P(C1:C100) calculates the standard deviation for the population in C1:C100',
        category: 'Statistical',
    },
    {
        name: 'PERCENTILE.INC',
        description: 'Returns the k-th percentile of values in a range, where k is in the range 0..1, inclusive',
        syntax: 'PERCENTILE.INC(array, k)',
        example: 'PERCENTILE.INC(D1:D100, 0.75) returns the 75th percentile of the values in D1:D100',
        category: 'Statistical',
    },
    {
        name: 'PMT',
        description: 'Calculates the payment for a loan based on constant payments and a constant interest rate',
        syntax: 'PMT(rate, nper, pv, [fv], [type])',
        example: 'PMT(0.08/12, 360, 200000) calculates the monthly payment for a $200,000 loan at 8% annual interest over 30 years',
        category: 'Financial',
    },
    {
        name: 'FV',
        description: 'Calculates the future value of an investment based on periodic, constant payments and a constant interest rate',
        syntax: 'FV(rate, nper, pmt, [pv], [type])',
        example: 'FV(0.06/12, 10*12, -200, -500) calculates the future value of an investment with $200 monthly deposits and $500 initial investment at 6% annual interest over 10 years',
        category: 'Financial',
    },
    {
        name: 'NPV',
        description: 'Calculates the net present value of an investment using a discount rate and a series of future payments and income',
        syntax: 'NPV(rate, value1, [value2], ...)',
        example: 'NPV(0.1, -10000, 3000, 4200, 6800) calculates the net present value of an investment with initial cost of $10,000 and returns of $3,000, $4,200, and $6,800 over the next three years, using a 10% discount rate',
        category: 'Financial',
    },
    {
        name: 'IRR',
        description: 'Calculates the internal rate of return for a series of cash flows',
        syntax: 'IRR(values, [guess])',
        example: 'IRR(A1:A5) calculates the internal rate of return for the cash flows in cells A1 through A5',
        category: 'Financial',
    },
    {
        name: 'TRIM',
        description: 'Removes all spaces from text except for single spaces between words',
        syntax: 'TRIM(text)',
        example: 'TRIM("  Hello   World  ") returns "Hello World"',
        category: 'Text',
    },
    {
        name: 'SUBSTITUTE',
        description: 'Replaces old text with new text in a text string',
        syntax: 'SUBSTITUTE(text, old_text, new_text, [instance_num])',
        example: 'SUBSTITUTE(A1, "World", "Excel") replaces "World" with "Excel" in the text from cell A1',
        category: 'Text',
    },
    {
        name: 'LEN',
        description: 'Returns the number of characters in a text string',
        syntax: 'LEN(text)',
        example: 'LEN(A1) returns the number of characters in the text from cell A1',
        category: 'Text',
    },
    {
        name: 'FIND',
        description: 'Finds one text string within another (case-sensitive)',
        syntax: 'FIND(find_text, within_text, [start_num])',
        example: 'FIND("World", A1) returns the starting position of "World" in the text from cell A1',
        category: 'Text',
    },
    {
        name: 'NETWORKDAYS',
        description: 'Returns the number of whole working days between two dates',
        syntax: 'NETWORKDAYS(start_date, end_date, [holidays])',
        example: 'NETWORKDAYS(A1, B1) returns the number of working days between the dates in A1 and B1',
        category: 'Date',
    },
    {
        name: 'WORKDAY',
        description: 'Returns a date that is a specified number of working days before or after a given date',
        syntax: 'WORKDAY(start_date, days, [holidays])',
        example: 'WORKDAY(A1, 10) returns the date that is 10 working days after the date in A1',
        category: 'Date',
    },
    {
        name: 'EOMONTH',
        description: 'Returns the last day of the month, X months before or after a specified date',
        syntax: 'EOMONTH(start_date, months)',
        example: 'EOMONTH(A1, 1) returns the last day of the month that follows the date in A1',
        category: 'Date',
    },
    {
        name: 'WEEKNUM',
        description: 'Returns the week number of a specific date',
        syntax: 'WEEKNUM(serial_number, [return_type])',
        example: 'WEEKNUM(A1) returns the week number of the date in A1',
        category: 'Date',
    },
    {
        name: 'HLOOKUP',
        description: 'Looks for a value in the top row of a table or an array of values, and then returns a value in the same column from a row you specify in the table or array',
        syntax: 'HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])',
        example: 'HLOOKUP("Apple", A1:D4, 3, FALSE) looks for "Apple" in the first row of A1:D4 and returns the value from the 3rd row of the same column',
        category: 'Lookup',
    },
    {
        name: 'INDIRECT',
        description: 'Returns the reference specified by a text string',
        syntax: 'INDIRECT(ref_text, [a1])',
        example: 'INDIRECT("A" & B1) returns the value of the cell referenced by combining "A" with the value in B1',
        category: 'Lookup',
    },
    {
        name: 'OFFSET',
        description: 'Returns a reference to a range that is a specified number of rows and columns from a cell or range of cells',
        syntax: 'OFFSET(reference, rows, cols, [height], [width])',
        example: 'OFFSET(A1, 2, 3, 1, 1) returns the value of the cell 2 rows below and 3 columns to the right of A1',
        category: 'Lookup',
    },
    {
        name: 'SUMIF',
        description: 'Adds the cells specified by a given criteria',
        syntax: 'SUMIF(range, criteria, [sum_range])',
        example: 'SUMIF(A1:A10,">5",B1:B10) sums values in B1:B10 where the corresponding value in A1:A10 is greater than 5',
        category: 'Math',
    },
    {
        name: 'RANDBETWEEN',
        description: 'Returns a random integer between two specified numbers',
        syntax: 'RANDBETWEEN(bottom, top)',
        example: 'RANDBETWEEN(1, 100) returns a random integer between 1 and 100',
        category: 'Math',
    },
    {
        name: 'SUMPRODUCT',
        description: 'Multiplies corresponding components in the given arrays, and returns the sum of those products',
        syntax: 'SUMPRODUCT(array1, [array2], [array3], ...)',
        example: 'SUMPRODUCT(A1:A10, B1:B10) multiplies corresponding values in A1:A10 and B1:B10, then sums the results',
        category: 'Math',
    },
    {
        name: 'MOD',
        description: 'Returns the remainder after number is divided by divisor',
        syntax: 'MOD(number, divisor)',
        example: 'MOD(A1, 3) returns the remainder when A1 is divided by 3',
        category: 'Math',
    },
    {
        name: 'ISBLANK',
        description: 'Returns TRUE if the value is blank',
        syntax: 'ISBLANK(value)',
        example: 'ISBLANK(A1) returns TRUE if cell A1 is empty',
        category: 'Information',
    },
    {
        name: 'ISNUMBER',
        description: 'Returns TRUE if the value is a number',
        syntax: 'ISNUMBER(value)',
        example: 'ISNUMBER(A1) returns TRUE if cell A1 contains a number',
        category: 'Information',
    },
    {
        name: 'ISTEXT',
        description: 'Returns TRUE if the value is text',
        syntax: 'ISTEXT(value)',
        example: 'ISTEXT(A1) returns TRUE if cell A1 contains text',
        category: 'Information',
    },
    {
        name: 'ISFORMULA',
        description: 'Returns TRUE if there is a reference to a cell that contains a formula',
        syntax: 'ISFORMULA(reference)',
        example: 'ISFORMULA(A1) returns TRUE if cell A1 contains a formula',
        category: 'Information',
    },
];

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