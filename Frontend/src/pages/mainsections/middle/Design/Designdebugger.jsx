import React from 'react';
import { useDesign } from './DesignSelectionManager';

// Simple test component to verify Zustand is working
export default function DesignDebugger() {
  const { design, updateDesign } = useDesign();

  return (
    <div className="fixed top-4 right-4 bg-white border-2 border-black p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Design State Debugger</h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>wallpaperStyle:</strong> {design.wallpaperStyle || 'undefined'}
        </div>
        <div>
          <strong>backgroundColor:</strong> 
          <span 
            className="inline-block w-4 h-4 ml-2 border border-gray-300"
            style={{ backgroundColor: design.backgroundColor }}
          />
          {design.backgroundColor || 'undefined'}
        </div>
        <div>
          <strong>gradientStyle:</strong> {design.gradientStyle || 'undefined'}
        </div>
        <div>
          <strong>gradientColor:</strong> 
          <span 
            className="inline-block w-4 h-4 ml-2 border border-gray-300"
            style={{ backgroundColor: design.gradientColor }}
          />
          {design.gradientColor || 'undefined'}
        </div>
        <div>
          <strong>gradientDirection:</strong> {design.gradientDirection || 'undefined'}
        </div>
        <div>
          <strong>pattern:</strong> {design.pattern || 'undefined'}
        </div>
        <div>
          <strong>noise:</strong> {design.noise ? 'true' : 'false'}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => updateDesign('backgroundColor', '#FF0000')}
          className="w-full px-3 py-1 bg-red-500 text-white rounded text-xs"
        >
          Test: Set BG to Red
        </button>
        <button
          onClick={() => updateDesign('wallpaperStyle', 'gradient')}
          className="w-full px-3 py-1 bg-blue-500 text-white rounded text-xs"
        >
          Test: Set to Gradient
        </button>
        <button
          onClick={() => console.log('Full design object:', design)}
          className="w-full px-3 py-1 bg-gray-500 text-white rounded text-xs"
        >
          Log to Console
        </button>
      </div>
    </div>
  );
}