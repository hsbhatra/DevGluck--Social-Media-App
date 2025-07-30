import React, { createContext, useState } from 'react';

const DEFAULT_AVATAR = '/general/avatar.png';

const defaultProfile = {
  avatar: DEFAULT_AVATAR,
  name: 'Robert Fox',
  username: 'robert',
  bio: 'Software Engineer',
  initials: 'RF',
  posts: 12,
  followers: 207,
  following: 64,
  email: 'robert.fox@email.com',
  phone: '1234567890',
  gender: 'Male',
  dob: '1990-01-01',
};

export const ProfileContext = createContext({
  profile: defaultProfile,
  setProfile: () => {},
});

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}; 