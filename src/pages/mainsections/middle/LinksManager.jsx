import React, { useEffect, useState } from "react";
import LinkCard from "./LinkCard";
import AddLinkModal from "./AddLinkModal";

const LinksManager = () => {
  const [links, setLinks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // LOAD from localStorage on first render
  useEffect(() => {
    const savedLinks = localStorage.getItem("links");
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, []);

  // SAVE to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

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

    setLinks(prev => [newLink, ...prev]);
  };

  // UPDATE LINK
  const handleUpdateLink = (updatedLink) => {
    setLinks(prev =>
      prev.map(link =>
        link.id === updatedLink.id ? updatedLink : link
      )
    );
  };

  // DELETE LINK
  const handleDeleteLink = (id) => {
    setLinks(prev => prev.filter(link => link.id !== id));
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
