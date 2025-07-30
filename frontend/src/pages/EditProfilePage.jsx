import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../profileContext.jsx';
import { Camera } from 'lucide-react';

const DEFAULT_AVATAR = '/general/avatar.png';

const genders = ['Male', 'Female', 'Other'];

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(ProfileContext);
  const [profileImage, setProfileImage] = useState(profile.avatar || DEFAULT_AVATAR);
  const [name, setName] = useState(profile.name || '');
  const [username, setUsername] = useState(profile.username || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [gender, setGender] = useState(profile.gender || '');
  const [dob, setDob] = useState(profile.dob || '');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => setProfileImage(DEFAULT_AVATAR);

  const handleSave = () => {
    setProfile({
      ...profile,
      avatar: profileImage,
      name,
      username,
      bio,
      email,
      phone,
      gender,
      dob,
      initials: name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '',
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-8 px-2 sm:px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-6 text-center">Edit profile</h1>
        <div className="relative mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg bg-gray-100"
          />
          <button
            className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full border-2 border-white shadow text-white hover:bg-blue-700"
            onClick={() => fileInputRef.current.click()}
            title="Change profile picture"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <button
          className="text-blue-600 text-sm mb-4"
          onClick={() => fileInputRef.current.click()}
        >
          Edit picture or avatar
        </button>
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <button className="text-gray-700 text-sm" onClick={() => fileInputRef.current.click()}>Choose from library</button>
          <button className="text-gray-700 text-sm" disabled>Take photo</button>
          <button className="text-red-500 text-sm" onClick={handleRemoveImage}>Remove current picture</button>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          {/* Commented out fields for now
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <select
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dob}
              onChange={e => setDob(e.target.value)}
            />
          </div>
          */}
          <div>
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage; 