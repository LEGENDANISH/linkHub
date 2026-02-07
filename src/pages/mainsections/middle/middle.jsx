import React, { useState } from 'react';
import AddLinkModal from "./AddLinkModal";
import { MoreVertical } from 'lucide-react';

const Middle = () => {
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState([
    { id: 1, name: 'Instagram', url: 'instagram.com/anish', clicks: 0, active: true }
  ]);

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

  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-6 pb-4 border-b-2 border-gray-200">Links</h1>

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

      {/* <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 shadow-sm">
        <p className="font-semibold mb-2 text-gray-900">Layout</p>
        <p className="text-gray-500 mb-4">
          Add a new link or drag and drop an existing link into this collection.
        </p>
        <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Add link
        </button>
      </div> */}

      <div className="space-y-3">
        {links.map((link) => (
          <div key={link.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{link.name}</p>
                <p className="text-sm text-gray-500">{link.url}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm font-medium">{link.clicks} clicks</span>
                <button 
                  onClick={() => toggleLinkActive(link.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    link.active ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    link.active ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Middle;