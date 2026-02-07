import React, { useState } from 'react';
import { GripVertical, Pencil, Share2, LayoutGrid, Image, Star, Copy, Lock, BarChart3, Trash2, X, Check, Calendar } from 'lucide-react';

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

  const handleLayoutChange = (layout) => {
    const updated = { ...link, layout };
    setLink(updated);
    onUpdate?.(updated);
  };

  const handleAnimationChange = (animation) => {
    const updated = { ...link, animation };
    setLink(updated);
    onUpdate?.(updated);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...link, thumbnail: reader.result };
        setLink(updated);
        onUpdate?.(updated);
      };
      reader.readAsDataURL(file);
    }
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
                    <Check className="w-4 h-4" />
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
                    <Check className="w-4 h-4" />
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
            onClick={() => {
              const updated = { ...link, locked: !link.locked };
              setLink(updated);
              onUpdate?.(updated);
            }}
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
          {/* Layout Section */}
          {expandedSection === 'layout' && (
            <div className="p-6">
              <div className="flex  justify-between mb-2 bg-[#E0E2D9] w">
                {/* <h3 className="text-xl font-semibold items-center justify-center">Layout</h3> */}
                <div className='items-center justify-center text-lg font-semibold '>
                    Layout
                    </div>
                <button onClick={() => setExpandedSection(null)} className="p-1 hover:bg-gray-200 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">Choose a layout for your link</p>
              
              {/* Classic Layout */}
              <button
                onClick={() => handleLayoutChange('classic')}
                className={`w-full mb-4 p-4 rounded-xl border-2 transition-all ${
                  link.layout === 'classic' ? 'border-black bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    link.layout === 'classic' ? 'border-black' : 'border-gray-400'
                  }`}>
                    {link.layout === 'classic' && <div className="w-4 h-4 rounded-full bg-black" />}
                  </div>
                <div className="flex items-center w-full">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-4">
    
   

    {/* text */}
    <div className="text-left">
      <h3 className="font-semibold text-lg leading-none">Classic</h3>
      <p className="text-gray-600 text-sm mt-1">
        Efficient, direct and compact.
      </p>
    </div>
  </div>

  {/* RIGHT MOST PILL */}
  <div className="ml-auto bg-teal-800 rounded-full h-12 w-[220px] flex items-center justify-between px-3">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-orange-500" />
      <div className="text-white text-sm opacity-80">...</div>
    </div>

    <div className="text-white text-lg">⋯</div>
  </div>

</div>
                </div>
              </button>

              {/* Featured Layout */}
              <button
                onClick={() => handleLayoutChange('featured')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  link.layout === 'featured' ? 'border-black bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                {/* <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    link.layout === 'featured' ? 'border-black' : 'border-gray-400'
                  }`}>
                    {link.layout === 'featured' && <div className="w-4 h-4 rounded-full bg-black" />}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg mb-1">Featured</h3>
                    <p className="text-gray-600 text-sm mb-4">Make your link stand out with a larger, more attractive display.</p>
                    
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg p-4 flex items-end justify-between h-32 relative overflow-hidden">
                      <div className="text-white text-xs z-10">Now touring, get your tickets</div>
                      <div className="text-white text-sm z-10">...</div>
                    </div>
                    
                    {link.layout === 'featured' && !link.thumbnail && (
                      <button className="mt-4 w-full py-3 px-4 border-2 border-gray-300 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        <Image className="w-5 h-5" />
                        Add thumbnail
                      </button>
                    )}
                  </div>
                </div> */}
 <div className="flex items-start gap-4 w-full">

  {/* radio */}
  <div
    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mt-1 ${
      link.layout === "featured" ? "border-black" : "border-gray-400"
    }`}
  >
    {link.layout === "featured" && (
      <div className="w-3.5 h-3.5 bg-black rounded-full" />
    )}
  </div>

  {/* feature content (takes full space) */}
  <div className="text-left flex-1">
    <h3 className="font-semibold text-lg leading-none">Featured</h3>

    <p className="text-gray-600 text-sm mt-1 max-w-md">
      Make your link stand out with a larger, more attractive display.
    </p>

    {!link.thumbnail && (
      <button className="mt-4 px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition flex items-center gap-2">
        <Image className="w-5 h-5" />
        Add thumbnail
      </button>
    )}
  </div>

  {/* image pushed to extreme right */}
  <div className="flex-shrink-0 ml-auto">
    <div className="w-[230px] h-[130px] rounded-xl overflow-hidden relative">
      
      <img
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
        alt="preview"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute bottom-2 left-3 text-white text-xs">
        Now touring, get your tickets
      </div>

      <div className="absolute bottom-2 right-3 text-white text-lg">⋯</div>
    </div>
  </div>

</div>

              </button>
            </div>
          )}

          {/* Thumbnail Section */}
          {expandedSection === 'thumbnail' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add Thumbnail</h3>
                <button onClick={() => setExpandedSection(null)} className="p-1 hover:bg-gray-200 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-center text-gray-700 mb-6">Add a Thumbnail or Icon to this Link.</p>
              
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors bg-white">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp,image/avif,image/svg+xml,image/bmp,image/heic,image/heif"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
                <div className="w-16 h-16 mb-4 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium mb-2">Select file to upload,</p>
                <p className="text-gray-700 font-medium mb-4">or drag-and-drop file</p>
                <p className="text-gray-500 text-sm">Accepted file types: JPEG, PNG, GIF, WebP, AVIF, SVG, BMP, HEIC, HEIF</p>
              </label>

              {link.thumbnail && (
                <div className="mt-4">
                  <img src={link.thumbnail} alt="Thumbnail preview" className="w-full h-32 object-cover rounded-lg" />
                  <button
                    onClick={() => {
                      const updated = { ...link, thumbnail: null };
                      setLink(updated);
                      onUpdate?.(updated);
                    }}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove thumbnail
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Animate Section */}
          {expandedSection === 'animate' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Animate</h3>
                <button onClick={() => setExpandedSection(null)} className="p-1 hover:bg-gray-200 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h4 className="font-semibold text-lg mb-2">Animate BUZZ</h4>
              <p className="text-gray-600 mb-6">Draw attention to your most important link.</p>
              
              <div className="mb-6">
                <h5 className="font-semibold mb-4">Prioritize with:</h5>
                
                {/* Animation Option */}
                <div className={`mb-4 p-4 rounded-xl border-2 transition-all bg-white ${
                  ['buzz', 'wobble', 'pop', 'swipe'].includes(link.animation) ? 'border-black' : 'border-gray-300'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                      ['buzz', 'wobble', 'pop', 'swipe'].includes(link.animation) ? 'border-black' : 'border-gray-400'
                    }`}>
                      {['buzz', 'wobble', 'pop', 'swipe'].includes(link.animation) && <div className="w-4 h-4 rounded-full bg-black" />}
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold mb-1">Animation</h6>
                      <p className="text-gray-600 text-sm mb-4">Link displays with a fun and engaging motion effect.</p>
                      
                      <div className="grid grid-cols-4 gap-3">
                        {['buzz', 'wobble', 'pop', 'swipe'].map((anim) => (
                          <button
                            key={anim}
                            onClick={() => handleAnimationChange(anim)}
                            className={`py-3 px-4 rounded-lg border transition-all ${
                              link.animation === anim 
                                ? 'border-black bg-gray-100 font-semibold' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {anim.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spotlight Option */}
                <button
                  onClick={() => handleAnimationChange('spotlight')}
                  className={`w-full mb-4 p-4 rounded-xl border-2 transition-all bg-white ${
                    link.animation === 'spotlight' ? 'border-black' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                      link.animation === 'spotlight' ? 'border-black' : 'border-gray-400'
                    }`}>
                      {link.animation === 'spotlight' && <div className="w-4 h-4 rounded-full bg-black" />}
                    </div>
                    <div className="flex-1 text-left">
                      <h6 className="font-semibold mb-1">Spotlight</h6>
                      <p className="text-gray-600 text-sm">Automatically expand this link when a visitor arrives on your Linktree.</p>
                    </div>
                  </div>
                </button>

                {/* No Animation Option */}
                <button
                  onClick={() => handleAnimationChange('none')}
                  className={`w-full p-4 rounded-xl border-2 transition-all bg-white ${
                    link.animation === 'none' ? 'border-black' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                      link.animation === 'none' ? 'border-black' : 'border-gray-400'
                    }`}>
                      {link.animation === 'none' && <div className="w-4 h-4 rounded-full bg-black" />}
                    </div>
                    <div className="flex-1 text-left">
                      <h6 className="font-semibold">Don't animate this link</h6>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Stats Section */}
          {expandedSection === 'stats' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Link insights</h3>
                <button onClick={() => setExpandedSection(null)} className="p-1 hover:bg-gray-200 rounded-full">
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
          )}

          {/* Schedule Section */}
          {expandedSection === 'schedule' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Schedule</h3>
                <button onClick={() => setExpandedSection(null)} className="p-1 hover:bg-gray-200 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">Schedule when this link is active</p>
              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <p className="text-sm text-gray-500">Scheduling feature coming soon</p>
              </div>
            </div>
          )}

          {/* Redirect Section */}
          {expandedSection === 'redirect' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Redirect</h3>
                <button onClick={() => setExpandedSection(null)} className="p-1 hover:bg-gray-200 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">Configure redirect settings for this link</p>
              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <p className="text-sm text-gray-500">Redirect options coming soon</p>
              </div>
            </div>
          )}

          {/* Delete Section */}
          {expandedSection === 'delete' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Delete</h3>
                <button onClick={() => setExpandedSection(null)} className="p-1 hover:bg-gray-200 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    onDelete?.(link.id);
                    setExpandedSection(null);
                  }}
                  className="py-4 px-6 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="font-semibold">Delete</span>
                </button>
                
                <button
                  onClick={() => setExpandedSection(null)}
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
          )}
        </div>
      )}
    </div>
  );
};

// Demo App
const App = () => {
  const [links, setLinks] = useState([
    {
      id: 1,
      name: 'YouTube',
      url: 'https://www.youtube.com/@DevXAnish',
      active: true,
      clicks: 0,
      layout: 'classic',
      thumbnail: null,
      animation: 'buzz',
      locked: false
    },
    {
      id: 2,
      name: 'Instagram',
      url: 'https://www.instagram.com/devxanish',
      active: false,
      clicks: 0,
      layout: 'classic',
      thumbnail: null,
      animation: 'none',
      locked: false
    }
  ]);

  const handleUpdateLink = (updatedLink) => {
    setLinks(links.map(link => link.id === updatedLink.id ? updatedLink : link));
  };

  const handleDeleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Links</h1>
          <p className="text-gray-600">Manage your Linktree links</p>
        </div>
        
        <div className="space-y-4">
          {links.map(link => (
            <LinkCard
              key={link.id}
              link={link}
              onUpdate={handleUpdateLink}
              onDelete={handleDeleteLink}
            />
          ))}
        </div>

        <button className="mt-6 w-full py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
          + Add Link
        </button>
      </div>
    </div>
  );
};

export default App;