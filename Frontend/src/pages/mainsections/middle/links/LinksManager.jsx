import React, { useState } from "react";
import LinkCard from "./LinkCard";
import AddLinkModal from "./AddLinkModal";
import { useSelection } from "./Selectionmanager";

const LinksManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const { links, addLink, updateLink, deleteLink } = useSelection();

  // ADD LINK
  const handleAddLink = (name) => {
    const newLink = {
      id: Date.now(),
      name,
      url: "",
      active: true,
      clicks: 0,
      layout: "classic",
      thumbnail: null,
      animation: "buzz",
      locked: false
    };

    addLink(newLink);
  };

  // UPDATE LINK
  const handleUpdateLink = (updatedLink) => {
    updateLink(updatedLink.id, updatedLink);
  };

  // DELETE LINK
  const handleDeleteLink = (id) => {
    deleteLink(id);
  };

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Add Link</button>

      {openModal && (
        <AddLinkModal
          onClose={() => setOpenModal(false)}
          onAddLink={handleAddLink}
        />
      )}

      <div className="space-y-4 mt-6">
        {links.map(link => (
          <LinkCard
            key={link.id}
            link={link}
            onUpdate={handleUpdateLink}
            onDelete={handleDeleteLink}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksManager;