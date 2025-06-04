"use client";
import React, { useState } from "react";

import { ArrowRight, ChevronDown, Menu, Plus, X } from "lucide-react";
// adjust import path as needed

function DismissibleBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  const handleClose = () => {
    setIsSlidingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // match animation duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full  bg-emerald-600 text-white 
              px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm 
              text-center transition-transform duration-300 ease-in-out z-50
              ${
                isSlidingOut
                  ? "translate-x-[100vw] opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
    >
      <div className="flex items-center justify-center flex-wrap gap-2 px-6 relative">
        <span className="truncate">
          CloudQuery is now SOC 2 Type II Certified!
        </span>
        <a href="#" className="underline hover:no-underline whitespace-nowrap">
          Learn more →
        </a>
        <button
          onClick={handleClose}
          className="absolute right-2 top-1 sm:right-4 sm:top-2 text-white hover:text-gray-200"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default DismissibleBanner;
