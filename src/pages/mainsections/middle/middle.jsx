import React, { useState, useEffect } from 'react';
import AddLinkModal from "./AddLinkModal";
import LinkCard from "./LinkCard";
import { useSelectionManager } from './SelectionManager';

const Middle = () => {
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState([
    { id: 1, name: 'Instagram', url: 'instagram.com/anish', clicks: 0, active: true }
  ]);

  // Get SelectionManager (works silently in background)
  const { syncLinks, syncLink } = useSelectionManager();

  // Sync initial links to SelectionManager
  useEffect(() => {
    syncLinks(links);
  }, []);

  // Sync whenever links change
  useEffect(() => {
    syncLinks(links);
  }, [links]);

  const handleAddLink = (linkName) => {
    const newLink = {
      id: Date.now(),
      name: linkName,
      url: `${linkName.toLowerCase().replace(/\s+/g, '')}.com`,
      clicks: 0,
      active: false
    };
    setLinks([...links, newLink]);
  };

  const toggleLinkActive = (id) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, active: !link.active } : link
    ));
  };

  const deleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-6 pb-4 border-b-2 border-gray-200">Links</h1>
      
      <div className='px-15'>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500" />
          <div>
            <p className="font-semibold text-lg">anish</p>
            <div className="flex gap-2 mt-2">
              {['from-blue-400 to-blue-600', 'from-pink-400 to-pink-600', 'from-green-400 to-green-600', 'from-purple-400 to-purple-600'].map((color, i) => (
                <div key={i} className={`w-8 h-8 bg-gradient-to-br ${color} rounded-full`} />
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => setOpenModal(true)} 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-full font-medium mb-6 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          + Add
        </button>

        {openModal && <AddLinkModal onClose={() => setOpenModal(false)} onAddLink={handleAddLink} />}

        <div className="space-y-4">
          {links.map((link) => (
            <LinkCard 
              key={link.id} 
              link={link} 
              onToggleActive={toggleLinkActive}
              onDelete={deleteLink}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Middle;