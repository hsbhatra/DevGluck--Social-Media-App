import axiosInstance from "./axiosInstance";

const tokenParser = () => {
  // Token can be get from state in future
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("User not authenticated");
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
  return config;
}

export const getNotifications = async () => {
  const config = tokenParser();
  const res = await axiosInstance.get("/api/notifications", config);
  return res.data;
};
