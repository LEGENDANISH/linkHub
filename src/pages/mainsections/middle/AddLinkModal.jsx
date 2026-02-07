import React, { useState } from 'react';
import { X, Search, Lightbulb, ShoppingBag, Heart, Play, Contact, Calendar, FileText, MoreHorizontal } from 'lucide-react';
import LinkCard from './LinkCard';

const AddLinkModal = ({ onClose, onAddLink }) => {
  const [activeCategory, setActiveCategory] = useState('suggested');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLink, setSelectedLink] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');

  const categories = [
    { id: 'suggested', label: 'Suggested', icon: Lightbulb },
    { id: 'commerce', label: 'Commerce', icon: ShoppingBag },
    { id: 'social', label: 'Social', icon: Heart },
    { id: 'media', label: 'Media', icon: Play },
    { id: 'contact', label: 'Contact', icon: Contact },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'text', label: 'Text', icon: FileText },
  ];

  const categoryContent = {
    suggested: {
      sections: [
        {
          title: 'Suggested',
          items: [
            { name: 'Instagram', description: 'Display your posts and reels', icon: '📸', color: 'from-purple-500 to-pink-500' },
            { name: 'TikTok', description: 'Share your TikToks on your Linktree', icon: '🎵', color: 'from-black to-gray-800' },
            { name: 'YouTube', description: 'Share YouTube videos on your Linktree', icon: '▶️', color: 'from-red-600 to-red-700' },
            { name: 'Spotify', description: 'Share your latest or favorite music', icon: '🎧', color: 'from-green-500 to-green-600' },
          ]
        }
      ]
    },
    commerce: {
      sections: [
        {
          title: 'Digital products',
          items: [
            { name: 'Coaching & bookings', description: 'Sell 1:1 sessions, consultations, and private coaching', icon: '📅', color: 'from-purple-400 to-purple-500' },
            { name: 'Digital products', description: 'Sell documents, PDFs, guides, templates, and other content', icon: '📢', color: 'from-orange-500 to-orange-600' },
            { name: 'Courses', description: 'Sell online courses and lessons to your audience', icon: '🎓', color: 'from-pink-400 to-pink-500' },
          ]
        },
        {
          title: 'Affiliate products',
          items: [
            { name: 'Affiliate products', description: 'Share items you love or promote products', icon: '🏷️', color: 'from-yellow-400 to-yellow-500' },
          ]
        },
        {
          title: 'Physical products',
          items: [
            { name: 'Shopify', description: 'Display the best of your Shopify store', icon: '🛍️', color: 'from-green-600 to-green-700' },
            { name: 'Fourthwall', description: 'Make & sell premium merch', icon: '🎨', color: 'from-blue-500 to-blue-600' },
            { name: 'Amaze', description: 'Simple solution for selling products', icon: '⚡', color: 'from-indigo-500 to-indigo-600' },
          ]
        },
      ]
    },
    social: {
      sections: [
        {
          title: 'Social platforms',
          items: [
            { name: 'Instagram', description: 'Display up to six posts and reels', icon: '📸', color: 'from-purple-500 to-pink-500' },
            { name: 'TikTok', description: 'Share your TikToks', icon: '🎵', color: 'from-black to-gray-800' },
            { name: 'X (Twitter)', description: 'Display your latest posts', icon: '🐦', color: 'from-black to-gray-700' },
            { name: 'Threads', description: 'Showcase Threads posts', icon: '🧵', color: 'from-black to-gray-600' },
            { name: 'Facebook', description: 'Show Facebook videos', icon: '👤', color: 'from-blue-600 to-blue-700' },
            { name: 'Pinterest', description: 'Share what you love', icon: '📌', color: 'from-red-600 to-red-700' },
          ]
        },
        {
          title: 'Communities',
          items: [
            { name: 'Discord', description: 'Add members to your server', icon: '💬', color: 'from-indigo-500 to-indigo-600' },
            { name: 'WhatsApp', description: 'Add members to your group', icon: '💚', color: 'from-green-500 to-green-600' },
          ]
        },
      ]
    },
    media: {
      sections: [
        {
          title: 'Video',
          items: [
            { name: 'YouTube', description: 'Show YouTube videos', icon: '▶️', color: 'from-red-600 to-red-700' },
            { name: 'TikTok Video', description: 'Highlight TikToks', icon: '🎵', color: 'from-black to-gray-800' },
            { name: 'Vimeo', description: 'Share Vimeo videos', icon: '🎬', color: 'from-blue-500 to-blue-600' },
          ]
        },
        {
          title: 'Audio',
          items: [
            { name: 'Spotify', description: 'Share Spotify sounds', icon: '🎧', color: 'from-green-500 to-green-600' },
            { name: 'Apple Music', description: 'Share songs and albums', icon: '🍎', color: 'from-red-500 to-pink-500' },
            { name: 'Podcasts', description: 'Get more listeners', icon: '🎙️', color: 'from-purple-500 to-purple-600' },
          ]
        },
      ]
    },
    contact: {
      sections: [
        {
          title: 'Forms',
          items: [
            { name: 'Contact Form', description: 'Collect info with custom form', icon: '📋', color: 'from-blue-500 to-blue-600' },
            { name: 'Email signup', description: 'Collect emails', icon: '✉️', color: 'from-green-500 to-green-600' },
            { name: 'SMS signup', description: 'Collect phone numbers', icon: '📱', color: 'from-purple-500 to-purple-600' },
          ]
        },
        {
          title: 'Details',
          items: [
            { name: 'Contact Details', description: 'Add virtual contact card', icon: '👤', color: 'from-indigo-500 to-indigo-600' },
            { name: 'Maps', description: 'Display a map', icon: '🗺️', color: 'from-red-500 to-red-600' },
          ]
        },
      ]
    },
    events: {
      sections: [
        {
          title: 'Events & Scheduling',
          items: [
            { name: 'Calendly', description: 'Let visitors book with you', icon: '📅', color: 'from-blue-500 to-blue-600' },
            { name: 'Tour and Events', description: 'Promote upcoming shows', icon: '🎤', color: 'from-purple-500 to-purple-600' },
          ]
        },
      ]
    },
    text: {
      sections: [
        {
          title: 'Text & Layout',
          items: [
            { name: 'Text', description: 'Display custom text', icon: '📝', color: 'from-gray-600 to-gray-700' },
            { name: 'Header', description: 'Add navigation headers', icon: '🔤', color: 'from-blue-600 to-blue-700' },
          ]
        },
      ]
    },
  };

  const quickActions = [
    { id: 'collection', label: 'Collection', icon: '📦' },
    { id: 'link', label: 'Link', icon: '🔗' },
    { id: 'product', label: 'Product', icon: '🏷️' },
    { id: 'form', label: 'Form', icon: '📝' },
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedLink(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-gray-900">{selectedLink}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Edit Form */}
          <div className="p-6">
            <LinkCard link={previewLink} />

            {/* URL Input */}
            <div className="mt-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Save Button */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedLink(null)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLink}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Add</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Paste or search a link"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-gray-900"
            />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-48 border-r border-gray-200 overflow-y-auto bg-gray-50">
            <nav className="p-3 space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      activeCategory === category.id
                        ? 'bg-white text-gray-900 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{category.label}</span>
                  </button>
                );
              })}
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-white hover:text-gray-900 transition-all">
                <MoreHorizontal className="w-5 h-5" />
                <span className="text-sm">View all</span>
              </button>
            </nav>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeCategory === 'suggested' && !searchQuery && (
              <div className="mb-8">
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
                    >
                      <div className="text-3xl mb-2">{action.icon}</div>
                      <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredContent().sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleLinkSelect(item.name)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-200"
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-semibold text-gray-900 mb-0.5">{item.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
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
                <p className="text-gray-500 text-lg">No results found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkModal;