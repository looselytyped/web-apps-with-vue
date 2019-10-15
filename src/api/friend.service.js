import axios from "axios";
const apiBaseUrl = "http://localhost:3000/friends";

export const friendService = {
  getAll() {
    return axios.get(`${apiBaseUrl}`);
  },

  get(friendId) {
    return axios.get(`${apiBaseUrl}/${friendId}`);
  },

  update(friend) {
    return axios.put(`${apiBaseUrl}/${friend.id}`, friend);
  },

  patchFavorite(friendId, fav) {
    return axios.patch(`${apiBaseUrl}/${friendId}`, { fav });
  },

  create(friend) {
    return axios.post(`${apiBaseUrl}`, friend);
  }
};
