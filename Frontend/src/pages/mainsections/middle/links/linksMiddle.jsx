import React, { useState, useEffect } from 'react';
import AddLinkModal from "./AddLinkModal";
import LinkCard from "./LinkCard";
import { useSelection } from './SelectionManager';

const Middle = () => {
  const [openModal, setOpenModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [title, setTitle] = useState("linkhub_design");

  const { links, syncLink, deleteLink } = useSelection();

useEffect(() => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id) return;

    const storageKey = `linkhub_design_${user.id}`;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      const parsed = JSON.parse(stored);
      const design = parsed?.state?.design;

      if (design?.profileImage) {
        setProfileImage(design.profileImage);
      }

      if (design?.titleText) {
        setTitle(design.titleText);
      }
    }
  } catch (err) {
    console.error("Error reading design from localStorage:", err);
  }
}, []);

  console.log("hi",title)
const MAX_LINKS = 5;
const isAtLimit = Array.isArray(links) && links.length >= MAX_LINKS;
  const handleAddLink = (linkName) => {
    if (links.length >= MAX_LINKS) return; // ← guard
    const newLink = {
      id: Date.now(),
      name: linkName,
      url: `${linkName.toLowerCase().replace(/\s+/g, '')}.com`,
      clicks: 0,
      active: false
    };

    syncLink(newLink);
  };

  const deleteLinkHandler = (id) => {
    deleteLink(id);
  };

  return (
    <main className="flex-1 bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gray-50 z-10 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b-2 border-gray-200">
        <h1 className="text-xl sm:text-2xl font-semibold">Links</h1>
      </div>
      
      {/* Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6">
        
        {/* Profile Section */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          
          {/* Profile Image */}
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0zm-6 8h6"
                />
              </svg>
            </div>
          )}

          {/* Title */}
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-base sm:text-lg">
              {title || "linkhub_design"}
            </p>
          </div>
        </div>

        {/* Add Button */}
        <button 
          onClick={() => setOpenModal(true)} 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 sm:py-4 rounded-full font-medium mb-4 sm:mb-6 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          + Add
        </button>

        {openModal && (
          <AddLinkModal
            onClose={() => setOpenModal(false)}
            onAddLink={handleAddLink}
          />
        )}

        {/* Links List */}
      <div className="space-y-3 sm:space-y-4 pb-4 sm:pb-6">
  {Array.isArray(links) && links.map((link) => (
    <LinkCard 
      key={link.id} 
      link={link}
      onDelete={deleteLinkHandler}
    />
  ))}
</div>

        {/* Empty State */}
        {links.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <p className="text-gray-900 font-medium mb-1 text-sm sm:text-base">No links yet</p>
            <p className="text-xs sm:text-sm text-gray-500">Click the "+ Add" button to create your first link</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Middle;