  import React from 'react';
  import { X, Trash2 } from 'lucide-react';

  const DeleteSection = ({ link, onClose, onDelete }) => {
    const handleDelete = () => {
      onDelete?.(link.id);
      onClose();
    };

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Delete</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDelete}
            className="py-4 px-6 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white"
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-semibold">Delete</span>
          </button>
          
          <button
            onClick={onClose}
            className="py-4 px-6 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded"></div>
            </div>
            <span className="font-semibold">Archive</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 text-center text-sm text-gray-600">
          <p>Delete forever.</p>
          <p>Reduce clutter, keep your insights and restore anytime.</p>
        </div>
      </div>
    );
  };

  export default DeleteSection;