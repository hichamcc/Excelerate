import React from 'react';

export default function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <h1 className="text-6xl font-bold mb-4 text-gray-900">
                Coming Soon
            </h1>
            <p className="text-lg text-gray-700 mb-6">
                We're working hard on this feature. Stay tuned!
            </p>
            <div className="bg-gray-300 h-1 w-32 rounded-full mb-6"></div>
            <p className="text-sm text-gray-600">
                More exciting updates are on the way.
            </p>
        </div>
    );
}