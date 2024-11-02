// components/Modal.js
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({
  children,
  isOpen,
  onClose,
  isInCenter = true,
  classes = "",
  innerClasses = "",
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isInCenter?: boolean;
  classes?: string;
  innerClasses?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 backdrop-filter backdrop-blur-md z-[1] ${
        isInCenter && "flex justify-center items-center"
      } ${classes}`}
      onClick={(event) => {
        event.stopPropagation();
        handleOverlayClick(event);
      }}
    >
      <div
        className={`bg-white lg:w-full p-[20px] max-lg:p-[10px] rounded-md shadow-md text-center flex items-center justify-center h-full max-w-[90vw] max-h-[80vh] ${innerClasses}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ModalPortal;
