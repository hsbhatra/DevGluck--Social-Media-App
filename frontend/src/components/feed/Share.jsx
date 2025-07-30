import React, { useState } from "react";
import ImageEditor from "./ImageEditor";

const Share = () => {
  const [media, setMedia] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState({
    type: "original",
    sensitive: false,
  });

  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const previewURL = media ? URL.createObjectURL(media) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your post submit here
    console.log("Posting with settings:", settings, "and file:", media);
  };

  return (
    <form className="p-4 flex gap-4" onSubmit={handleSubmit}>
      {/* AVATAR */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <img
          src="/general/avatar.png"
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* OTHERS */}
      <div className="flex-1 flex flex-col gap-4">
        <input
          type="text"
          name="desc"
          placeholder="What is happening?!"
          className="bg-transparent outline-none placeholder:text-gray-500 text-xl"
        />

        {/* PREVIEW IMAGE */}
        {media?.type?.includes("image") && previewURL && (
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={previewURL}
              alt="preview"
              className={`w-full ${
                settings.type === "original"
                  ? "h-full object-contain"
                  : settings.type === "square"
                  ? "aspect-square object-cover"
                  : "aspect-video object-cover"
              }`}
            />
            <div
              className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
              onClick={() => setIsEditorOpen(true)}
            >
              Edit
            </div>
            <div
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}

        {/* PREVIEW VIDEO */}
        {media?.type?.includes("video") && previewURL && (
          <div className="relative">
            <video src={previewURL} controls className="rounded-md w-full" />
            <div
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}

        {isEditorOpen && previewURL && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewURL={previewURL}
            settings={settings}
            setSettings={setSettings}
          />
        )}

        {/* BUTTONS */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              name="file"
              onChange={handleMediaChange}
              className="hidden"
              id="file"
              accept="image/*,video/*"
            />
            <label htmlFor="file">
              <img
                src="/icons/image.svg"
                alt="add"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </label>
            <img src="/icons/gif.svg" alt="gif" width={20} height={20} />
            <img src="/icons/poll.svg" alt="poll" width={20} height={20} />
            <img src="/icons/emoji.svg" alt="emoji" width={20} height={20} />
            <img src="/icons/schedule.svg" alt="schedule" width={20} height={20} />
            <img src="/icons/location.svg" alt="location" width={20} height={20} />
          </div>
          <button
            type="submit"
            className="bg-black text-white font-bold rounded-full py-2 px-4"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default Share;