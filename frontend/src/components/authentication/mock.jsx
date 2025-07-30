import React, { use } from 'react'
import Loader from '../loaders/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, signInUser } from '../../slices/UserSlice';

export default function Mock() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loading);

    const handleClick = async () => {
        const res = await dispatch(signInUser());
        try{
            if (signInUser.fulfilled.match(res)) {
                console.log("Mock Signup Success:", res.payload);
            } else {
                console.error("Mock Signup Failed:", res.error);
            }
        }catch (error) {
            console.error("Error in Mock Signup:", error);
        }
    }
  return (
    <div>
        <button onClick={handleClick}>click</button>
        {loading && <Loader/>}
    </div>
  )
}
