import React, { useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SharePopup = ({ onClose }) => {
  const [urlLink, setUrlLink] = useState("");       // URL to share
  const [_, copy] = useCopyToClipboard();          // copy hook

  // Get the URL on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrlLink(window.location.href);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white p-6 rounded-xl w-[400px] max-w-full text-gray-800 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:text-red-500"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold mb-4">Share</h2>

        {/* Share Buttons */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <EmailShareButton url={urlLink}>
            <div className="flex flex-col items-center gap-1">
              <EmailIcon size={50} round />
              <span className="text-sm">Email</span>
            </div>
          </EmailShareButton>

          <WhatsappShareButton url={urlLink}>
            <div className="flex flex-col items-center gap-1">
              <WhatsappIcon size={50} round />
              <span className="text-sm">WhatsApp</span>
            </div>
          </WhatsappShareButton>

          <FacebookShareButton url={urlLink}>
            <div className="flex flex-col items-center gap-1">
              <FacebookIcon size={50} round />
              <span className="text-sm">Facebook</span>
            </div>
          </FacebookShareButton>

          <LinkedinShareButton url={urlLink}>
            <div className="flex flex-col items-center gap-1">
              <LinkedinIcon size={50} round />
              <span className="text-sm">LinkedIn</span>
            </div>
          </LinkedinShareButton>
        </div>

        {/* Copy Link */}
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
          <input
            type="text"
            value={urlLink}
            readOnly
            className="flex-1 bg-transparent text-sm outline-none text-gray-700"
          />
          <button
            onClick={() => copy(urlLink)}
            className="bg-blue-600 px-3 py-1 rounded-md text-white font-bold hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
