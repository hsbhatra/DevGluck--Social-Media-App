import React, { useCallback, useEffect, useState } from 'react';
import { SearchIcon } from "lucide-react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../slices/SearchSlice';

export default function Search({ handleSelect }) {
  const [formData, setFormData] = useState({ search: "" });
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.search.searchData);

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(searchUser(query));
    }, 300)
    , [dispatch])

  useEffect(() => {
    console.log("eff: ", searchData);
  }, [searchData]);

  const handleChange = (e) => {
    // if (!e.target.value) dispatch(resetSearchData())
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
    const search = e.target.value;
    debouncedSearch(search);
  };
  return (
    <div className="w-full relative p-3">
      <input
        type="text"
        placeholder="Search..."
        className="w-12/12 px-4 py-2 pl-10 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        name='search'
        value={formData.search}
        onChange={handleChange}
      />
      <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
      {formData.search && searchData.length > 0 && (
        <ul className="absolute left-0 top-full w-12/12 bg-white border border-gray-300 rounded-b-md shadow-md mt-1 z-50">
          {searchData.map((user, index) => (
            <li
              key={user._id || index}
              className="flex gap-5 items-center px-4 py-4 hover:bg-blue-100 cursor-pointer text-pretty border-b last:border-b-0"
              onClick={() => handleSelect(user)}
            >
              <img
                src={user.avatar}
                alt="profile pic"
                className="w-2 h-2 sm:w-10 sm:h-10 rounded-full object-cover mx-auto sm:mx-0 flex-shrink-0 text-lg"
              />
              <p>{user.username || user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
