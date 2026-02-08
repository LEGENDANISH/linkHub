import React from 'react';
import { X } from 'lucide-react';

const ScheduleSection = ({ onClose }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Schedule</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-600 mb-4">Schedule when this link is active</p>
      <div className="bg-white p-4 rounded-lg border border-gray-300">
        <p className="text-sm text-gray-500">Scheduling feature coming soon</p>
      </div>
    </div>
  );
};

export default ScheduleSection;