import React from "react";

const Comments = () => {
  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-white">
      {/* Input */}
      <div className="flex items-start gap-3 p-4 border-b border-gray-100">
        <img
          src="/general/avatar.png"
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Share your thoughts here..."
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Comment 1 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <img
            src="/general/avatar2.png"
            alt="Daniel"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-sm">Daniel Brown</h4>
                <span className="text-xs text-gray-500">Digital Marketer</span>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <p className="mt-2 text-gray-700 text-sm">
              Fantastic post! Your content always brings a smile to my face. Keep
              up the great work! 👏
            </p>
            <button className="mt-2 text-sm text-blue-600 hover:underline">
              Reply
            </button>
          </div>
        </div>

        {/* Nested Reply */}
        <div className="flex items-start gap-3 mt-4 ml-12 p-3 rounded-lg bg-gray-50">
          <img
            src="/general/avatar.png"
            alt="Author"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm">Bessie Cooper</h4>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  Author
                </span>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <p className="mt-2 text-gray-700 text-sm">
              Thank you for sharing your comment!
            </p>
            <button className="mt-2 text-sm text-blue-600 hover:underline">
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Comment 2 */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src="/general/avatar3.png"
            alt="David"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-sm">David Martinez</h4>
                <span className="text-xs text-gray-500">Back-end Developer</span>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <p className="mt-2 text-gray-700 text-sm">
              Your positivity is contagious! Thanks for brightening up my feed.
              Have a fantastic day!
            </p>
            <button className="mt-2 text-sm text-blue-600 hover:underline">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
