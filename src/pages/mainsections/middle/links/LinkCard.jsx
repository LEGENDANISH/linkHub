import React, { useState, useEffect } from 'react';
import { GripVertical, Pencil, Share2, LayoutGrid, Image, Star, Lock, BarChart3, Trash2, Calendar } from 'lucide-react';
import { useSelection } from './Selectionmanager';
import LayoutSection from './sections/LayoutSection';
import ThumbnailSection from './sections/ThumbnailSection';
import AnimateSection from './sections/AnimateSection';
import StatsSection from './sections/StatsSection';
import ScheduleSection from './sections/ScheduleSection';
import RedirectSection from './sections/RedirectSection';
import DeleteSection from './sections/DeleteSection';

const LinkCard = ({ link: initialLink, onUpdate, onDelete }) => {
  const [link, setLink] = useState(initialLink || {
    id: 1,
    name: 'YouTube',
    url: 'https://www.youtube.com/@DevXAnish',
    active: true,
    clicks: 0,
    layout: 'classic',
    thumbnail: null,
    animation: 'buzz',
    locked: false
  });

  const [expandedSection, setExpandedSection] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [editName, setEditName] = useState(link.name);
  const [editUrl, setEditUrl] = useState(link.url);

  // Get SelectionManager to sync selections
const { syncLink, getLink } = useSelection();

  // Sync this link to SelectionManager whenever it changes
  useEffect(() => {
    syncLink(link);
  }, [link]);

  // Update from SelectionManager if available (for section changes)
  useEffect(() => {
    const storedLink = getLink(link.id);
    if (storedLink) {
      // Only update if SelectionManager has newer data
      if (storedLink.layout !== link.layout || 
          storedLink.animation !== link.animation ||
          storedLink.thumbnail !== link.thumbnail ||
          storedLink.locked !== link.locked) {
        setLink(prev => ({ ...prev, ...storedLink }));
      }
    }
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleToggleActive = () => {
    const updated = { ...link, active: !link.active };
    setLink(updated);
    onUpdate?.(updated);
  };

  const handleSaveName = () => {
    const updated = { ...link, name: editName };
    setLink(updated);
    setIsEditingName(false);
    onUpdate?.(updated);
  };

  const handleSaveUrl = () => {
    const updated = { ...link, url: editUrl };
    setLink(updated);
    setIsEditingUrl(false);
    onUpdate?.(updated);
  };

  const updateLink = (updates) => {
    const updated = { ...link, ...updates };
    setLink(updated);
    onUpdate?.(updated);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 hover:shadow-md transition-all">
      {/* Main Card */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-grab active:cursor-grabbing" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isEditingName ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-2 py-1 border-2 border-purple-600 rounded focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    <span className="w-4 h-4 inline-block">✓</span>
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-semibold text-gray-900">{link.name}</span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-gray-400" />
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isEditingUrl ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="flex-1 px-2 py-1 border-2 border-purple-600 rounded focus:outline-none text-sm"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveUrl}
                    className="p-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    <span className="w-4 h-4 inline-block">✓</span>
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-sm text-gray-500">{link.url}</span>
                  <button
                    onClick={() => setIsEditingUrl(true)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Pencil className="w-3 h-3 text-gray-400" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={handleToggleActive}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                link.active ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                link.active ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 px-2">
          <button
            onClick={() => toggleSection('layout')}
            className={`p-2 rounded-lg transition-colors ${
              expandedSection === 'layout' ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-600 hover:text-purple-600'
            }`}
            title="Layout"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleSection('redirect')}
            className={`p-2 rounded-lg transition-colors ${
              expandedSection === 'redirect' ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-600 hover:text-purple-600'
            }`}
            title="Redirect"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleSection('thumbnail')}
            className={`p-2 rounded-lg transition-colors ${
              expandedSection === 'thumbnail' ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-600 hover:text-purple-600'
            }`}
            title="Thumbnail"
          >
            <Image className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleSection('animate')}
            className={`p-2 rounded-lg transition-colors ${
              expandedSection === 'animate' ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-600 hover:text-purple-600'
            }`}
            title="Animate"
          >
            <Star className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleSection('schedule')}
            className={`p-2 rounded-lg transition-colors ${
              expandedSection === 'schedule' ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-600 hover:text-purple-600'
            }`}
            title="Schedule"
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            onClick={() => updateLink({ locked: !link.locked })}
            className="p-2 hover:bg-purple-100 rounded-lg transition-colors group"
            title="Lock"
          >
            <Lock className={`w-5 h-5 ${link.locked ? 'text-purple-600' : 'text-gray-600 group-hover:text-purple-600'}`} />
          </button>
          <button
            onClick={() => toggleSection('stats')}
            className={`p-2 rounded-lg transition-colors ${
              expandedSection === 'stats' ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-600 hover:text-purple-600'
            }`}
            title="Stats"
          >
            <BarChart3 className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <span className="text-sm text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
            {link.clicks} clicks
          </span>
          <button 
            onClick={() => toggleSection('delete')}
            className={`p-2 rounded-lg transition-colors ${
              expandedSection === 'delete' ? 'bg-red-600 text-white' : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
            }`}
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Expandable Sections */}
      {expandedSection && (
        <div className="border-t-2 border-gray-200 bg-gray-50">
          {expandedSection === 'layout' && (
            <LayoutSection 
              link={link}
              onClose={() => setExpandedSection(null)}
              onUpdate={updateLink}
            />
          )}
          
          {expandedSection === 'thumbnail' && (
            <ThumbnailSection 
              link={link}
              onClose={() => setExpandedSection(null)}
              onUpdate={updateLink}
            />
          )}
          
          {expandedSection === 'animate' && (
            <AnimateSection 
              link={link}
              onClose={() => setExpandedSection(null)}
              onUpdate={updateLink}
            />
          )}
          
          {expandedSection === 'stats' && (
            <StatsSection 
              link={link}
              onClose={() => setExpandedSection(null)}
            />
          )}
          
          {expandedSection === 'schedule' && (
            <ScheduleSection 
              onClose={() => setExpandedSection(null)}
            />
          )}
          
          {expandedSection === 'redirect' && (
            <RedirectSection 
              onClose={() => setExpandedSection(null)}
            />
          )}
          
          {expandedSection === 'delete' && (
            <DeleteSection 
              link={link}
              onClose={() => setExpandedSection(null)}
              onDelete={onDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LinkCard;