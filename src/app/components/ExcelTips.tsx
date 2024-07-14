'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

type ExcelTip = {
    id: number;
    category: 'shortcut' | 'tip';
    title: string;
    description: string;
};

const excelTips: ExcelTip[] = [
    {
        id: 1,
        category: 'shortcut',
        title: 'Quick Sum',
        description: 'Select a range of cells and press Alt + = to quickly sum them.',
    },
    {
        id: 2,
        category: 'tip',
        title: 'Custom Number Formatting',
        description: 'Use Ctrl + 1 to open the Format Cells dialog for advanced number formatting options.',
    },
    {
        id: 3,
        category: 'shortcut',
        title: 'Fill Down',
        description: 'Use Ctrl + D to fill the selected cells with the contents of the topmost cell.',
    },
    {
        id: 4,
        category: 'tip',
        title: 'Freeze Panes',
        description: 'Use View > Freeze Panes to keep certain rows or columns visible while scrolling.',
    },
    {
        id: 5,
        category: 'shortcut',
        title: 'Insert Current Date',
        description: 'Press Ctrl + ; to insert the current date into a cell.',
    },
    {
        id: 6,
        category: 'shortcut',
        title: 'Quick Copy',
        description: 'Use Ctrl + D to quickly copy the contents of the cell above.',
    },
    {
        id: 7,
        category: 'tip',
        title: 'Absolute Cell References',
        description: 'Use $ before the column letter or row number (e.g., $A$1) to create an absolute reference that doesn\'t change when copied.',
    },
    {
        id: 8,
        category: 'shortcut',
        title: 'Move Between Worksheets',
        description: 'Use Ctrl + PgUp or Ctrl + PgDn to move between worksheets in a workbook.',
    },
    {
        id: 9,
        category: 'tip',
        title: 'Quick Analysis',
        description: 'Select a range of data and look for the Quick Analysis button that appears in the bottom-right corner for instant charts and analysis.',
    },
    {
        id: 10,
        category: 'shortcut',
        title: 'Select Entire Column',
        description: 'Press Ctrl + Spacebar to select the entire column of the active cell.',
    },
    {
        id: 11,
        category: 'tip',
        title: 'Custom Lists',
        description: 'Create custom lists (e.g., for project phases or departments) in Excel options for easy data entry and sorting.',
    },
    {
        id: 12,
        category: 'shortcut',
        title: 'Format as Table',
        description: 'Use Ctrl + T to quickly format a range of cells as a table with filtering and sorting capabilities.',
    },
    {
        id: 13,
        category: 'tip',
        title: 'Sparklines',
        description: 'Use Sparklines (Insert > Sparklines) to create small charts within a single cell, great for showing trends.',
    },
    {
        id: 14,
        category: 'shortcut',
        title: 'Go To Special',
        description: 'Use Ctrl + G, then click "Special" to quickly select cells with specific properties like formulas or constants.',
    },
    {
        id: 15,
        category: 'tip',
        title: 'Conditional Formatting',
        description: 'Use Conditional Formatting to automatically format cells based on their content, great for highlighting important data.',
    },
    {
        id: 16,
        category: 'shortcut',
        title: 'Insert Comment',
        description: 'Press Shift + F2 to quickly insert a comment in the active cell.',
    },
    {
        id: 17,
        category: 'tip',
        title: 'Data Validation',
        description: 'Use Data Validation (Data > Data Validation) to control what users can enter into a cell, like creating a dropdown list.',
    },
    {
        id: 18,
        category: 'shortcut',
        title: 'AutoSum',
        description: 'Select a range of cells and press Alt + = to automatically sum the numbers.',
    },
    {
        id: 19,
        category: 'tip',
        title: 'Remove Duplicates',
        description: 'Use the Remove Duplicates feature (Data > Remove Duplicates) to quickly clean up data by removing duplicate rows.',
    },
    {
        id: 20,
        category: 'shortcut',
        title: 'Group Rows or Columns',
        description: 'Select rows or columns and press Shift + Alt + Right Arrow to group them for easy collapsing and expanding.',
    },
    {
        id: 21,
        category: 'tip',
        title: 'Flash Fill',
        description: 'Excel can automatically fill data for you based on patterns. Start typing in a column next to existing data and look for the Flash Fill preview.',
    },
    {
        id: 22,
        category: 'shortcut',
        title: 'Quickly Insert Charts',
        description: 'Select your data range and press Alt + F1 to instantly create a chart.',
    },
    {
        id: 23,
        category: 'tip',
        title: 'Pivot Tables',
        description: 'Use Pivot Tables (Insert > Pivot Table) to quickly summarize large amounts of data and gain insights.',
    },
    {
        id: 24,
        category: 'shortcut',
        title: 'Edit Cell in Formula Bar',
        description: 'Press F2 to edit the active cell directly in the formula bar.',
    },
    {
        id: 25,
        category: 'tip',
        title: 'Custom Number Formats',
        description: 'Create custom number formats to display data exactly how you want, like showing negative numbers in red or adding text to numbers.',
    },
    {
        id: 26,
        category: 'shortcut',
        title: 'Select Visible Cells Only',
        description: 'Use Alt + ; to select only visible cells in a filtered range.',
    },
    {
        id: 27,
        category: 'tip',
        title: 'Custom Views',
        description: 'Use View > Custom Views to save and quickly switch between different view settings, great for reports.',
    },
    {
        id: 28,
        category: 'shortcut',
        title: 'Create Named Range',
        description: 'Select a range and press Ctrl + Alt + F3 to quickly create a named range.',
    },
    {
        id: 29,
        category: 'tip',
        title: 'Goal Seek',
        description: 'Use Data > What-If Analysis > Goal Seek to find the input value needed to achieve a desired result.',
    },
    {
        id: 30,
        category: 'shortcut',
        title: 'Insert or Delete Cells',
        description: 'Press Ctrl + + to insert cells, or Ctrl + - to delete cells.',
    },
    {
        id: 31,
        category: 'tip',
        title: 'Array Formulas',
        description: 'Use array formulas (enter with Ctrl + Shift + Enter) to perform multiple calculations in one formula.',
    },
    {
        id: 32,
        category: 'shortcut',
        title: 'Select to Last Cell',
        description: 'Press Ctrl + Shift + Arrow key to select all cells to the last non-empty cell in that direction.',
    },
    {
        id: 33,
        category: 'tip',
        title: 'Paste Special Transpose',
        description: 'Use Paste Special > Transpose to flip copied data from rows to columns or vice versa.',
    },
    {
        id: 34,
        category: 'shortcut',
        title: 'Open VBA Editor',
        description: 'Press Alt + F11 to open the Visual Basic Editor for macros and advanced customization.',
    },
    {
        id: 35,
        category: 'tip',
        title: 'Consolidate Data',
        description: 'Use Data > Consolidate to combine data from multiple ranges or worksheets.',
    },
    {
        id: 36,
        category: 'shortcut',
        title: 'Create Chart on New Sheet',
        description: 'Select data and press F11 to create a chart on a new sheet instantly.',
    },
    {
        id: 37,
        category: 'tip',
        title: 'Text to Columns',
        description: 'Use Data > Text to Columns to split cell contents into multiple columns based on delimiters.',
    },
    {
        id: 38,
        category: 'shortcut',
        title: 'Toggle Formula View',
        description: 'Press Ctrl + ` (backtick) to toggle between showing formulas and their results in cells.',
    },
    {
        id: 39,
        category: 'tip',
        title: 'Camera Tool',
        description: 'Add the Camera tool to your Quick Access Toolbar to create live, linked pictures of ranges.',
    },
    {
        id: 40,
        category: 'shortcut',
        title: 'Trace Precedents/Dependents',
        description: 'Use Ctrl + [ to select all precedent cells, or Ctrl + ] for dependent cells in formulas.',
    },
    {
        id: 41,
        category: 'tip',
        title: 'Scenario Manager',
        description: 'Use Data > What-If Analysis > Scenario Manager to create and switch between different data scenarios.',
    },
    {
        id: 42,
        category: 'shortcut',
        title: 'Repeat Last Action',
        description: 'Press F4 to repeat the last action you performed.',
    },
    {
        id: 43,
        category: 'tip',
        title: 'Slicers for Tables',
        description: 'Use Insert > Slicer to add interactive filtering controls to tables and PivotTables.',
    },
    {
        id: 44,
        category: 'shortcut',
        title: 'Create 3D References',
        description: 'Hold Shift while selecting sheets to create 3D references in formulas across multiple sheets.',
    },
    {
        id: 45,
        category: 'tip',
        title: 'Power Query',
        description: 'Use Data > Get & Transform Data to access Power Query for advanced data importing and transformation.',
    },
    {
        id: 46,
        category: 'shortcut',
        title: 'Apply Table Style',
        description: 'Press Ctrl + T to quickly convert a range into a formatted table.',
    },
    {
        id: 47,
        category: 'tip',
        title: 'Dynamic Arrays',
        description: 'In newer versions of Excel, formulas can spill results into multiple cells automatically, creating dynamic arrays.',
    },
    {
        id: 48,
        category: 'shortcut',
        title: 'Fill Across Worksheets',
        description: 'Select multiple sheets, enter data in one cell, and press Ctrl + Enter to fill that cell across all selected sheets.',
    },
    {
        id: 49,
        category: 'tip',
        title: 'Form Controls',
        description: 'Use Developer > Insert to add form controls like buttons and checkboxes for interactive worksheets.',
    },
    {
        id: 50,
        category: 'shortcut',
        title: 'Quick Access to Format Painter',
        description: 'Double-click the Format Painter button to apply the same formatting to multiple selections.',
    }

];

const TipCard: React.FC<{ tip: ExcelTip }> = ({ tip }) => (
    <motion.div
        className="bg-white rounded-lg shadow-md p-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <h3 className="text-xl font-semibold text-green-600 mb-2">{tip.title}</h3>
        <p className="text-gray-600 mb-2">{tip.description}</p>
        <p className="text-sm text-gray-500 italic">
            Category: {tip.category === 'shortcut' ? 'Keyboard Shortcut' : 'Excel Tip'}
        </p>
    </motion.div>
);

export default function ExcelTipsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTips = useMemo(() => {
        return excelTips.filter(tip =>
            tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tip.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-600 mb-6">Excel Tips and Shortcuts</h1>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search tips and shortcuts..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTips.map(tip => (
                    <TipCard key={tip.id} tip={tip} />
                ))}
            </div>

            {filteredTips.length === 0 && (
                <p className="text-center text-gray-600 mt-8">No tips found matching your search.</p>
            )}
        </div>
    );
}