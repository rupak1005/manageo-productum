import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="w-full bg-primary text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-lg font-bold">My Application</h1>
      </div>
    </div>
  );
};

export default TopBar; 