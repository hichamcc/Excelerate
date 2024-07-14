import React, { useState, useEffect } from 'react';

const ExcelChartWizard = () => {
    const [step, setStep] = useState(1);
    const [chartType, setChartType] = useState('');
    const [dataRange, setDataRange] = useState('');
    const [chartTitle, setChartTitle] = useState('');
    const [xAxisLabel, setXAxisLabel] = useState('');
    const [yAxisLabel, setYAxisLabel] = useState('');
    const [exampleData, setExampleData] = useState<{ category: string; value: number; }[]>([]);

    useEffect(() => {
        if (step === 4) {
            generateExampleData();
        }
    }, [step]);

    const handleChartTypeSelect = (type: any) => {
        setChartType(type);
        setStep(2);
    };

    const handleDataRangeInput = (e: any) => {
        e.preventDefault();
        setDataRange(e.target.dataRange.value);
        setStep(3);
    };

    const handleCustomization = (e: any) => {
        e.preventDefault();
        setChartTitle(e.target.chartTitle.value);
        setXAxisLabel(e.target.xAxisLabel.value);
        setYAxisLabel(e.target.yAxisLabel.value);
        setStep(4);
    };

    const generateExampleData = () => {
        const categories = ['A', 'B', 'C', 'D', 'E'];
        const data = categories.map(category => ({
            category,
            value: Math.floor(Math.random() * 100) + 1
        }));
        setExampleData(data);
    };

    const getExcelInstructions = () => {
        let instructions = [
            `1. Select your data range (${dataRange}).`,
            `2. Go to the 'Insert' tab in Excel.`,
            `3. In the 'Charts' section, click on '${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart'.`,
            `4. Right-click on the chart and select 'Select Data'.`,
            `5. Ensure your data range is correct (${dataRange}).`,
            `6. Click 'OK' to create the basic chart.`,
            `7. To add a title, click on the chart, go to the 'Chart Tools' tab, click 'Add Chart Element' > 'Chart Title' > 'Above Chart'.`,
            `8. Enter the title: "${chartTitle}".`,
            `9. To add axis labels, use 'Add Chart Element' > 'Axis Titles'.`,
            `10. For the X-axis, enter: "${xAxisLabel}".`,
            `11. For the Y-axis, enter: "${yAxisLabel}".`,
        ];

        return instructions;
    };

    const getExcelFormula = () => {
        // This is a simplified example. In a real application, you'd need more complex logic to generate accurate Excel formulas.
        return `=CHART("${chartType}",${dataRange},"${chartTitle}","${xAxisLabel}","${yAxisLabel}")`;
    };

    const renderExampleChart = () => {
        if (chartType === 'pie') {
            return (
                <div className="w-64 h-64 relative rounded-full overflow-hidden">
                    {exampleData.map((item, index) => {
                        const startAngle = index / exampleData.length * 360;
                        const endAngle = (index + 1) / exampleData.length * 360;
                        return (
                            <div key={item.category} className="absolute inset-0" style={{
                                background: `conic-gradient(from ${startAngle}deg to ${endAngle}deg, ${getRandomColor()} 0deg, ${getRandomColor()} 360deg)`
                            }}></div>
                        );
                    })}
                </div>
            );
        } else {
            const maxValue = Math.max(...exampleData.map(d => d.value));
            return (
                <div className="w-64 h-64 flex items-end justify-between border-l-2 border-b-2 border-gray-400">
                    {exampleData.map((item) => (
                        <div key={item.category} className="w-8 bg-blue-500" style={{ height: `${(item.value / maxValue) * 100}%` }}></div>
                    ))}
                </div>
            );
        }
    };

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Excel Chart Wizard</h1>

            {step === 1 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Step 1: Select Chart Type</h2>
                    <div className="flex space-x-4">
                        <button onClick={() => handleChartTypeSelect('column')} className="px-4 py-2 bg-blue-500 text-white rounded">Column Chart</button>
                        <button onClick={() => handleChartTypeSelect('line')} className="px-4 py-2 bg-blue-500 text-white rounded">Line Chart</button>
                        <button onClick={() => handleChartTypeSelect('pie')} className="px-4 py-2 bg-blue-500 text-white rounded">Pie Chart</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Step 2: Enter Data Range</h2>
                    <form onSubmit={handleDataRangeInput} className="space-y-4">
                        <input type="text" name="dataRange" placeholder="e.g., A1:B10" className="border p-2 rounded w-full" required />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Step 3: Customize Chart</h2>
                    <form onSubmit={handleCustomization} className="space-y-4">
                        <input type="text" name="chartTitle" placeholder="Chart Title" className="border p-2 rounded w-full" required />
                        <input type="text" name="xAxisLabel" placeholder="X-Axis Label" className="border p-2 rounded w-full" required />
                        <input type="text" name="yAxisLabel" placeholder="Y-Axis Label" className="border p-2 rounded w-full" required />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Generate Instructions</button>
                    </form>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Excel Chart Instructions</h2>
                    <div className="bg-gray-100 p-4 rounded">
                        <h3 className="text-lg font-medium mb-2">Steps to create your {chartType} chart in Excel:</h3>
                        <ol className="list-decimal list-inside space-y-2">
                            {getExcelInstructions().map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Excel Formula (for advanced users):</h3>
                        <code className="bg-gray-200 p-2 rounded block">{getExcelFormula()}</code>
                        <p className="mt-2 text-sm text-gray-600">Note: This formula is a simplified representation and may not work directly in Excel. Use it as a reference for creating charts programmatically.</p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Example Chart Output:</h3>
                        <p className="mb-2 text-sm text-gray-600">This is a simplified representation using random data. Your actual Excel chart will look more polished.</p>
                        <div className="border p-4 rounded">
                            <h4 className="text-center font-bold mb-2">{chartTitle}</h4>
                            {renderExampleChart()}
                            <div className="text-center mt-2">
                                <span className="font-bold">{xAxisLabel}</span>
                            </div>
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 mt-4">
                                <span className="font-bold">{yAxisLabel}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setStep(1)} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Create Another Chart</button>
                </div>
            )}
        </div>
    );
};

export default ExcelChartWizard;