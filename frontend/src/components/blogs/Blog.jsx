import React from 'react'

export default function Blogs() {
  const blog = {
    blogAuther: "Author",
    blogTitle: "Blog Title",
    userRole: "Digital Marketer",
    time: "7 hours ago",
    content:
      "In today's fast-paced, digitally driven world, digital marketing is not just a strategy; it's a necessity for businesses of all sizes. 📈...",
    image: "https://imgs.search.brave.com/Q0HDH8fDjgiV8_0E-QJXOTR-2E5PdC3gBtvCK4mGY14/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9v/bmxpbmUtbWVzc2Fn/ZS1ibG9nLWNoYXQt/Y29tbXVuaWNhdGlv/bi1lbnZlbG9wLWdy/YXBoaWMtaWNvbi1j/b25jZXB0XzUzODc2/LTEzOTcxNy5qcGc_/c2VtdD1haXNfaXRl/bXNfYm9vc3RlZCZ3/PTc0MA", // remove or comment this line to test post without image
    likes: 270,
  };

  return (
    <div className='bg-white shadow rounded-lg p-3 sm:p-4 max-w-xl mx-auto my-4 overflow-hidden'>
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start space-x-3 min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <h4 className="text-lg sm:text-xl font-medium truncate">{blog.blogTitle}</h4>
            <p className="text-xs text-gray-500 truncate">{blog.blogAuther}</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 flex-shrink-0">{blog.time}</div>
      </div>

      {/*Blog Description*/}
      <a href="https://en.wikipedia.org/wiki/Blog" className="text-sm text-gray-800 mt-4 block break-words">{blog.content}</a>

      {/*Blog Image*/}
      {blog.image && (
        <div className="mt-4">
          <img
            src={blog.image}
            alt="Post"
            className="w-full rounded-md border object-cover"
          />
        </div>
      )}
    </div>
  )
}
