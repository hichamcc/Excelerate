'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ExcelTemplate = {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnailUrl: string;
    downloadUrl: string;
};

const excelTemplates: ExcelTemplate[] = [
    {
        id: '1',
        title: 'Monthly Budget',
        description: 'Track your monthly income and expenses with this easy-to-use budget template.',
        category: 'Finance',
        thumbnailUrl: '/images/templates/monthly-budget-thumb.png',
        downloadUrl: '/templates/monthly_budget_template.xlsx',
    },
    {
        id: '2',
        title: 'Project Timeline',
        description: 'Visualize your project schedule with this Gantt chart template.',
        category: 'Project Management',
        thumbnailUrl: '/images/templates/project-timeline-thumb.png',
        downloadUrl: '/templates/project_timeline_template.xlsx',
    },
    {
        id: '3',
        title: 'Invoice Generator',
        description: 'Create professional invoices quickly with this customizable template.',
        category: 'Business',
        thumbnailUrl: '/images/templates/invoice-generator-thumb.png',
        downloadUrl: '/templates/invoice_generator_template.xlsx',
    },
    {
        id: '4',
        title: 'Inventory Tracker',
        description: 'Manage your inventory levels and track stock movements efficiently.',
        category: 'Business',
        thumbnailUrl: '/images/templates/inventory-tracker-thumb.png',
        downloadUrl: '/templates/inventory_tracker_template.xlsx',
    },
    {
        id: '5',
        title: 'Employee Shift Schedule',
        description: 'Organize employee shifts and work hours with this easy-to-use schedule template.',
        category: 'Human Resources',
        thumbnailUrl: '/images/templates/employee-shift-schedule-thumb.png',
        downloadUrl: '/templates/employee_shift_schedule_template.xlsx',
    },
    {
        id: '6',
        title: 'Personal Workout Log',
        description: 'Track your fitness progress and plan your workouts with this comprehensive log.',
        category: 'Health & Fitness',
        thumbnailUrl: '/images/templates/workout-log-thumb.png',
        downloadUrl: '/templates/personal_workout_log_template.xlsx',
    },
    {
        id: '7',
        title: 'Sales Pipeline',
        description: 'Manage and forecast your sales pipeline with this intuitive template.',
        category: 'Sales',
        thumbnailUrl: '/images/templates/sales-pipeline-thumb.png',
        downloadUrl: '/templates/sales_pipeline_template.xlsx',
    },
    {
        id: '8',
        title: 'Event Planning Checklist',
        description: 'Stay organized while planning events with this detailed checklist template.',
        category: 'Event Management',
        thumbnailUrl: '/images/templates/event-planning-checklist-thumb.png',
        downloadUrl: '/templates/event_planning-checklist_template.xlsx',
    },
    {
        id: '9',
        title: 'Meal Planner and Grocery List',
        description: 'Plan your meals for the week and generate a grocery list automatically.',
        category: 'Personal',
        thumbnailUrl: '/images/templates/meal-planner-thumb.png',
        downloadUrl: '/templates/meal_planner_template.xlsx',
    },
    {
        id: '10',
        title: 'Student Grade Tracker',
        description: 'Help students or teachers track academic performance across multiple subjects.',
        category: 'Education',
        thumbnailUrl: '/images/templates/grade-tracker-thumb.png',
        downloadUrl: '/templates/grade_tracker_template.xlsx',
    },
    {
        id: '11',
        title: 'Home Renovation Budget',
        description: 'Plan and track expenses for your home renovation project.',
        category: 'Finance',
        thumbnailUrl: '/images/templates/renovation-budget-thumb.png',
        downloadUrl: '/templates/home_renovation_budget_template.xlsx',
    },
    {
        id: '12',
        title: 'Social Media Content Calendar',
        description: 'Plan and schedule your social media posts across multiple platforms.',
        category: 'Marketing',
        thumbnailUrl: '/images/templates/social-media-calendar-thumb.png',
        downloadUrl: '/templates/social_media_content_calendar_template.xlsx',
    },

    {
        id: '16',
        title: 'Project Cost Estimator',
        description: 'Estimate costs for projects with this detailed breakdown template.',
        category: 'Project Management',
        thumbnailUrl: '/images/templates/cost-estimator-thumb.png',
        downloadUrl: '/templates/project_cost_estimator_template.xlsx',
    },
    {
        id: '17',
        title: 'Customer Database',
        description: 'Manage customer information and interactions with this CRM-like template.',
        category: 'Business',
        thumbnailUrl: '/images/templates/customer-database-thumb.png',
        downloadUrl: '/templates/customer_database_template.xlsx',
    },
    {
        id: '18',
        title: 'Habit Tracker',
        description: 'Track and build positive habits with this visual tracking template.',
        category: 'Personal',
        thumbnailUrl: '/images/templates/habit-tracker-thumb.png',
        downloadUrl: '/templates/habit_tracker_template.xlsx',
    },
    {
        id: '19',
        title: 'KPI Dashboard',
        description: 'Monitor key performance indicators for your business with this dashboard template.',
        category: 'Business',
        thumbnailUrl: '/images/templates/kpi-dashboard-thumb.png',
        downloadUrl: '/templates/kpi_dashboard_template.xlsx',
    },
    {
        id: '20',
        title: 'Travel Itinerary Planner',
        description: 'Plan your trips and organize travel details with this comprehensive template.',
        category: 'Travel',
        thumbnailUrl: '/images/templates/travel-planner-thumb.png',
        downloadUrl: '/templates/travel_itinerary_planner_template.xlsx',
    },
];

const TemplateCard: React.FC<{ template: ExcelTemplate }> = ({ template }) => (
    <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
    >
        <img src={template.thumbnailUrl} alt={template.title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{template.title}</h3>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full mb-4">
                {template.category}
            </span>
            <a
                href={template.downloadUrl}
                download
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center transition duration-300"
            >
                Download Template
            </a>
        </div>
    </motion.div>
);

export default function ExcelTemplateGallery() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(excelTemplates.map(template => template.category))];

    const filteredTemplates = excelTemplates.filter(template =>
        (selectedCategory === 'All' || template.category === selectedCategory) &&
        (template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Excel Template Gallery</h1>

            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search templates..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full ${selectedCategory === category
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>

            {filteredTemplates.length === 0 && (
                <p className="text-center text-gray-600 mt-8">No templates found matching your search.</p>
            )}
        </div>
    );
}