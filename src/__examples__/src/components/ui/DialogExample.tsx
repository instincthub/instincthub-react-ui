"use client"
import React, { useState } from "react";
import { Dialog } from "../../../../index";

const DialogExample: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="ihub-container">
      <h1>Dialog Example</h1>
      
      <button 
        className="ihub-important-btn" 
        onClick={openDialog}
      >
        Open Dialog
      </button>
      
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Confirmation"
        footer={
          <div className="ihub-buttons">
            <button 
              className="ihub-danger-btn"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button 
              className="ihub-important-btn"
              onClick={() => {
                // Handle confirmation
                closeDialog();
              }}
            >
              Confirm
            </button>
          </div>
        }
      >
        <p>Are you sure you want to proceed with this action?</p>
      </Dialog>
    </div>
  );
};

export default DialogExample;
