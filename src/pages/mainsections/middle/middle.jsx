import React, { useState } from 'react'
import AddLinkModal from "./AddLinkModal";

const Middle = () => {
    const [openModal, setOpenModal] = useState(false);

  return (
     <main className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200">Links</h1>

        {/* Profile section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-300" />
          <div>
            <p className="font-semibold text-lg">anish</p>
            <div className="flex gap-2 mt-2">
              <span className="w-8 h-8 bg-gray-200 rounded-full" />
              <span className="w-8 h-8 bg-gray-200 rounded-full" />
              <span className="w-8 h-8 bg-gray-200 rounded-full" />
              <span className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* Add Button */}
        <button onClick={() => setOpenModal(true)} className="w-full bg-gradient-to-r bg-[#7F22FE] text-white py-4 rounded-full font-medium mb-6">
          + Add
        </button>
{openModal && <AddLinkModal onClose={() => setOpenModal(false)} />}
        {/* Collection box */}
        <div className="bg-white rounded-xl p-6 border mb-6">
          <p className="font-semibold mb-2">Layout</p>
          <p className="text-gray-500 mb-4">
            Add a new link or drag and drop an existing link into this collection.
          </p>
          <button className="border px-4 py-2 rounded-lg">Add link</button>
        </div>

        {/* Example link card */}
        <div className="bg-white rounded-xl border p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Instagram</p>
              <p className="text-sm text-gray-500">URL</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">0 clicks</span>
              <button className="w-10 h-6 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </main>
  )
}

export default Middle