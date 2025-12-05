import axios from "axios";

const fetchAllBuses = async () => {
  const res = await axios.get("/api/bus");
  console.log(res.data)
  console.log("API BUS RESPONSE →", res.data);  // debugging

  return res.data;   // because backend returns pure array
};

const fetchBus = async (id) => {
  const res = await axios.get(`/api/bus/${id}`);
  return res.data;        // backend returns { bus: {} }
};

export default {
  fetchAllBuses,
  fetchBus,
};
