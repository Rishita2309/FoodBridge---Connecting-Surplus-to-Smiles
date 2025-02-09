import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Update with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Admin APIs
export const fetchAdmins = () => api.get("/admins");
export const createAdmin = (admin) => api.post("/admins", admin);

// ✅ Volunteer APIs
export const fetchVolunteers = () => api.get("/volunteers");
export const createVolunteer = (volunteer) => api.post("/volunteers", volunteer);

// ✅ Request APIs
export const fetchRequests = () => api.get("/requests");
export const createRequest = (request) => api.post("/requests", request);

// ✅ Donor APIs
export const fetchDonors = () => api.get("/donors");
export const createDonor = (donor) => api.post("/donors", donor);

// ✅ Food APIs
export const fetchFoodItems = () => api.get("/food");
export const createFoodItem = (food) => api.post("/food", food);

export default api;
