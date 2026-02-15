import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import {
  MdLightbulb,
  MdShoppingBag,
  MdFavorite,
  MdPlayCircle,
  MdContactMail,
  MdEvent,
  MdTextFields,
  MdOutlineShoppingBag,MdLink ,MdEmail 
} from "react-icons/md";

import LinkCard from './LinkCard';

import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaSpotify,
  FaFacebook,
  FaPinterest,
  FaDiscord,
  FaWhatsapp,
  FaApple,
  FaVimeo
} from "react-icons/fa";

import {
  HiOutlineDocumentText,
  HiOutlineCalendar
} from "react-icons/hi";

import { BsTwitterX } from "react-icons/bs";

const AddLinkModal = ({ onClose, onAddLink }) => {
  const [activeCategory, setActiveCategory] = useState('suggested');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLink, setSelectedLink] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');

const categories = [
  { id: 'suggested', label: 'Suggested', icon: MdLightbulb },
  { id: 'commerce', label: 'Commerce', icon: MdShoppingBag },
  { id: 'social', label: 'Social', icon: MdFavorite },
  { id: 'media', label: 'Media', icon: MdPlayCircle },
  { id: 'contact', label: 'Contact', icon: MdContactMail },
  { id: 'events', label: 'Events', icon: MdEvent },
  { id: 'text', label: 'Text', icon: MdTextFields },
];


const categoryContent = {
  suggested: {
    sections: [
      {
        title: 'Suggested',
        items: [
          { name: 'Instagram', description: 'Display your posts and reels', icon: FaInstagram, color: 'from-purple-500 to-pink-500' },
          { name: 'TikTok', description: 'Share your TikToks on your Linkhub', icon: FaTiktok, color: 'from-black to-gray-800' },
          { name: 'YouTube', description: 'Share YouTube videos on your Linkhub', icon: FaYoutube, color: 'from-red-600 to-red-700' },
          { name: 'Spotify', description: 'Share your latest or favorite music', icon: FaSpotify, color: 'from-green-500 to-green-600' },
        ]
      }
    ]
  },

  commerce: {
    sections: [
      {
        title: 'Digital products',
        items: [
          { name: 'Coaching & bookings', description: 'Sell sessions & coaching', icon: HiOutlineCalendar, color: 'from-purple-400 to-purple-500' },
          { name: 'Digital products', description: 'Sell documents & PDFs', icon: HiOutlineDocumentText, color: 'from-orange-500 to-orange-600' },
          { name: 'Courses', description: 'Sell online courses', icon: MdOutlineShoppingBag, color: 'from-pink-400 to-pink-500' },
        ]
      },
      {
        title: 'Affiliate products',
        items: [
          { name: 'Affiliate products', description: 'Promote products', icon: MdOutlineShoppingBag, color: 'from-yellow-400 to-yellow-500' },
        ]
      },
      {
        title: 'Physical products',
        items: [
          { name: 'Shopify', description: 'Display your Shopify store', icon: MdOutlineShoppingBag, color: 'from-green-600 to-green-700' },
          { name: 'Fourthwall', description: 'Sell premium merch', icon: MdOutlineShoppingBag, color: 'from-blue-500 to-blue-600' },
          { name: 'Amaze', description: 'Sell products easily', icon: MdOutlineShoppingBag, color: 'from-indigo-500 to-indigo-600' },
        ]
      },
    ]
  },

  social: {
    sections: [
      {
        title: 'Social platforms',
        items: [
          { name: 'Instagram', description: 'Display posts', icon: FaInstagram, color: 'from-purple-500 to-pink-500' },
          { name: 'TikTok', description: 'Share TikToks', icon: FaTiktok, color: 'from-black to-gray-800' },
          { name: 'X (Twitter)', description: 'Display tweets', icon: BsTwitterX, color: 'from-black to-gray-700' },
          { name: 'Threads', description: 'Show Threads posts', icon: BsTwitterX, color: 'from-black to-gray-600' },
          { name: 'Facebook', description: 'Show Facebook videos', icon: FaFacebook, color: 'from-blue-600 to-blue-700' },
          { name: 'Pinterest', description: 'Share pins', icon: FaPinterest, color: 'from-red-600 to-red-700' },
        ]
      },
      {
        title: 'Communities',
        items: [
          { name: 'Discord', description: 'Add members', icon: FaDiscord, color: 'from-indigo-500 to-indigo-600' },
          { name: 'WhatsApp', description: 'Add members', icon: FaWhatsapp, color: 'from-green-500 to-green-600' },
        ]
      },
    ]
  },

  media: {
    sections: [
      {
        title: 'Video',
        items: [
          { name: 'YouTube', description: 'Show videos', icon: FaYoutube, color: 'from-red-600 to-red-700' },
          { name: 'TikTok Video', description: 'Highlight TikToks', icon: FaTiktok, color: 'from-black to-gray-800' },
          { name: 'Vimeo', description: 'Share Vimeo videos', icon: FaVimeo, color: 'from-blue-500 to-blue-600' },
        ]
      },
      {
        title: 'Audio',
        items: [
          { name: 'Spotify', description: 'Share sounds', icon: FaSpotify, color: 'from-green-500 to-green-600' },
          { name: 'Apple Music', description: 'Share songs', icon: FaApple, color: 'from-red-500 to-pink-500' },
          { name: 'Podcasts', description: 'Get listeners', icon: MdEvent, color: 'from-purple-500 to-purple-600' },
        ]
      },
    ]
  },

  contact: {
    sections: [
      {
        title: 'Forms',
        items: [
          { name: 'Contact Form', description: 'Collect info', icon: HiOutlineDocumentText, color: 'from-blue-500 to-blue-600' },
          { name: 'Email signup', description: 'Collect emails', icon: MdEmail, color: 'from-green-500 to-green-600' },
        ]
      },
      {
        title: 'Details',
        items: [
          { name: 'Contact Details', description: 'Virtual contact card', icon: MdTextFields, color: 'from-indigo-500 to-indigo-600' },
        ]
      },
    ]
  },

  events: {
    sections: [
      {
        title: 'Events & Scheduling',
        items: [
          { name: 'Calendly', description: 'Let visitors book', icon: HiOutlineCalendar, color: 'from-blue-500 to-blue-600' },
          { name: 'Tour and Events', description: 'Promote shows', icon: MdEvent, color: 'from-purple-500 to-purple-600' },
        ]
      },
    ]
  },

  text: {
    sections: [
      {
        title: 'Text & Layout',
        items: [
          { name: 'Text', description: 'Display custom text', icon: MdTextFields, color: 'from-gray-600 to-gray-700' },
          { name: 'Header', description: 'Add headers', icon: MdTextFields, color: 'from-blue-600 to-blue-700' },
        ]
      },
    ]
  },
};

const quickActions = [
  { id: 'collection', label: 'Collection', icon: MdOutlineShoppingBag },
  { id: 'link', label: 'Link', icon: MdLink },
  { id: 'product', label: 'Product', icon: MdOutlineShoppingBag },
  { id: 'form', label: 'Form', icon: HiOutlineDocumentText },
];


  const handleLinkSelect = (linkName) => {
    setSelectedLink(linkName);
    setLinkUrl('');
  };

  const handleSaveLink = () => {
    if (onAddLink && linkUrl) {
      onAddLink(selectedLink);
    }
    onClose();
  };

  const filteredContent = () => {
    if (!searchQuery) return categoryContent[activeCategory];
    
    const query = searchQuery.toLowerCase();
    const filtered = { sections: [] };
    
    Object.values(categoryContent).forEach(category => {
      category.sections.forEach(section => {
        const matchingItems = section.items.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
        if (matchingItems.length > 0) {
          filtered.sections.push({ ...section, items: matchingItems });
        }
      });
    });
    
    return filtered;
  };

  if (selectedLink) {
    const previewLink = {
      id: 'preview',
      name: selectedLink,
      url: linkUrl || 'URL',
      clicks: 0,
      active: false
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button 
                onClick={() => setSelectedLink(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-bold text-gray-900 truncate">{selectedLink}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Edit Form */}
          <div className="px-5 py-4 overflow-y-auto flex-1">
            <LinkCard link={previewLink} />

            {/* URL Input */}
            <div className="mt-6 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Save Button - Fixed at bottom */}
          <div className="px-5 py-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedLink(null)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLink}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Add Link</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Paste or search a link"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-gray-900 text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto bg-gray-50 flex-shrink-0">
          <nav className="flex px-3 py-2 gap-2 min-w-max">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all flex-shrink-0 ${
                    activeCategory === category.id
                      ? 'bg-white text-gray-900 font-semibold shadow-sm'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm whitespace-nowrap">{category.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {activeCategory === 'suggested' && !searchQuery && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  >
{(() => {
  const Icon = action.icon;
  return <Icon className="text-2xl mb-2 text-gray-700" />;
})()}
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredContent().sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6 last:mb-2">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleLinkSelect(item.name)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-200 hover:shadow-sm"
                  >
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
 {(() => {
    const Icon = item.icon;
    return <Icon className="w-5 h-5 text-white" />;
  })()}                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight mb-1">{item.name}</p>
                      <p className="text-xs text-gray-500 leading-tight line-clamp-1">{item.description}</p>
                    </div>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {searchQuery && filteredContent().sections.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-900 font-medium mb-1">No results found</p>
              <p className="text-sm text-gray-500">Try searching with different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLinkModal;