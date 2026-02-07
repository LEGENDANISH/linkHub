import React from 'react';
import { GripVertical, Pencil, Share2, Play, Image, Star, Copy, Lock, BarChart3, Trash2 } from 'lucide-react';

const LinkCard = ({ link, onToggleActive, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-4">
        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab active:cursor-grabbing" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900">{link.name}</span>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Pencil className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{link.url}</span>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Pencil className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Share2 className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={() => onToggleActive?.(link.id)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              link.active ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              link.active ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4 px-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Play className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Image className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Star className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Copy className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Lock className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <BarChart3 className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1" />
        <span className="text-sm text-gray-500">{link.clicks} clicks</span>
        <button 
          onClick={() => onDelete?.(link.id)}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default LinkCard;