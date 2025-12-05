import axios from "axios";

const API_URL = "/api/rating/";

// ⭐ ADD RATING
const addRating = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const res = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ⭐ GET ALL RATINGS
const getRating = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export default {
  addRating,
  getRating,
};
