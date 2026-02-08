import React from 'react';
import { X, Copy } from 'lucide-react';

const StatsSection = ({ link, onClose }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Link insights</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
          <span>📅</span>
          <span className="text-sm">Feb 2nd to Feb 8th</span>
        </div>
      </div>

      <div className="flex gap-4 border-b mb-6">
        <button className="pb-3 px-1 border-b-2 border-black font-semibold">Insights</button>
        <button className="pb-3 px-1 text-gray-600">Subscribers</button>
        <button className="pb-3 px-1 text-gray-600">Top Locations</button>
      </div>

      <p className="text-center text-gray-600 mb-8">Looks like this link hasn't been clicked in the last 7 days</p>

      <div className="h-64 border-b border-l border-gray-200 mb-8 relative bg-white rounded-lg p-4">
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          <span>1</span>
          <span>0</span>
        </div>
        <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-500">
          <span>Feb 02</span>
          <span>Feb 03</span>
          <span>Feb 04</span>
          <span>Feb 05</span>
          <span>Feb 06</span>
          <span>Feb 07</span>
          <span>Today</span>
        </div>
      </div>

      <div className="space-y-4 bg-white rounded-lg p-4">
        <div className="flex justify-between items-center pb-4 border-b">
          <span className="text-gray-600">Click type</span>
          <div className="flex gap-16">
            <span className="text-gray-600">Lifetime</span>
            <span className="text-gray-600">Last 7 days</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-black"></div>
            <span>Total</span>
          </div>
          <div className="flex gap-24">
            <span className="font-semibold">0</span>
            <span className="font-semibold">0</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>On your Linktree</span>
          </div>
          <div className="flex gap-24">
            <span className="font-semibold">0</span>
            <span className="font-semibold">0</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="flex items-center gap-2">
              Direct via tree short link
              <Copy className="w-4 h-4 text-gray-400" />
            </span>
          </div>
          <div className="flex gap-24">
            <span className="font-semibold">0</span>
            <span className="font-semibold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;