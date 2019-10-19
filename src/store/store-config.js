import { friendService } from "@/api/friend.service";

const state = {
  friends: []
};

const mutations = {
  setFriends(state, friends) {
    state.friends = friends;
  },
  addFriend(state, newFriend) {
    state.friends = [...state.friends, newFriend];
  },
  updateFriend(state, newFriend) {
    const index = state.friends.findIndex(e => e.id === newFriend.id);
    state.friends = [
      ...state.friends.slice(0, index),
      newFriend,
      ...state.friends.slice(index + 1, state.friends.length)
    ];
  }
};

const actions = {
  async fetchFriends({ commit }) {
    commit("setFriends", (await friendService.getAll()).data);
  },
  async like({ commit }, friend) {
    commit(
      "updateFriend",
      (await friendService.patchFavorite(friend.id, true)).data
    );
  },
  async unlike({ commit }, friend) {
    commit(
      "updateFriend",
      (await friendService.patchFavorite(friend.id, false)).data
    );
  },
  async addFriend({ commit }, newFriend) {
    commit("addFriend", (await friendService.create(newFriend)).data);
  },
  async updateFriend({ commit }, updatedFriend) {
    commit("updateFriend", (await friendService.update(updatedFriend)).data);
  }
};

const getters = {
  favFriendsCount: state => state.friends.filter(f => f.fav).length,
  friendsCount: state => state.friends.length,
  friendById: state => id => state.friends.find(f => f.id === id)
};

export const storeConfig = {
  state,
  mutations,
  actions,
  getters
};
