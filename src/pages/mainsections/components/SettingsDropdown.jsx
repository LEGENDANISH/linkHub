import React, { useEffect } from "react";
import { User, ArrowLeftRight, Plus, UserCircle, Zap, HelpCircle, BookOpen, MessageSquare, LogOut, X } from "lucide-react";

export default function SettingsDropdown({ onClose }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
useEffect(()=>{
    console.log("hiii")
})
  return (
    <div className="fixed inset-0 bg-black/40 z-[500] flex items-end">
      {/* Backdrop - click to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Dropdown panel */}
      <div className="relative w-full bg-white rounded-t-3xl shadow-2xl border border-gray-200 py-3 max-h-[85vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition z-10"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Profile header */}
        <div className="flex items-center justify-between px-5 py-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-base">0504anish2</p>
              <p className="text-sm text-gray-500">
                linktr.ee/0504anis...
              </p>
            </div>
          </div>

          <span className="text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
            Free
          </span>
        </div>

        {/* menu items */}
        <div className="py-1">
          <MenuItem 
            icon={<ArrowLeftRight className="w-5 h-5" />} 
            text="Switch Linkhubs" 
            onClick={onClose}
          />
          <MenuItem 
            icon={<Plus className="w-5 h-5" />} 
            text="Create new Linkhub" 
            onClick={onClose}
          />

          <div className="my-3 border-t border-gray-200" />

          <MenuItem 
            icon={<UserCircle className="w-5 h-5" />} 
            text="Account" 
            onClick={onClose}
          />
          <MenuItem 
            icon={<Zap className="w-5 h-5" />} 
            text="Upgrade" 
            onClick={onClose}
          />

          <div className="my-3 border-t border-gray-200" />

          <MenuItem 
            icon={<HelpCircle className="w-5 h-5" />} 
            text="Ask a question" 
            onClick={onClose}
          />
          <MenuItem 
            icon={<BookOpen className="w-5 h-5" />} 
            text="Help topics" 
            onClick={onClose}
          />
          <MenuItem 
            icon={<MessageSquare className="w-5 h-5" />} 
            text="Share feedback" 
            onClick={onClose}
          />

          <div className="my-3 border-t border-gray-200" />

          <MenuItem 
            icon={<LogOut className="w-5 h-5" />} 
            text="Log out" 
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, text, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
    >
      <span className="text-gray-700">{icon}</span>
      <span className="text-[15px] font-medium text-gray-900">{text}</span>
    </div>
  );
}