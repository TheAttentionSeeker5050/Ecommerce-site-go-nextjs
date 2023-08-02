// maintenance mode page component
// render maintenance mode page 

import React from 'react';

export default function MaintenanceModePage() {
    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen bg-background-light  dark:bg-background-dark'>
            <h1 className='text-3xl font-bold text-center text-gray-700 dark:text-white'>Maintenance Mode</h1>
            <p className='text-lg font-bold text-center text-gray-700 dark:text-white'>Sorry, this site is currently under maintenance. Please come back later.</p>
        </div>
    );
};