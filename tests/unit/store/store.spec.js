import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import clone from "ramda.clone";

import { storeConfig } from "@/store/store-config";
import { friendService } from "@/api/friend.service";

describe("Vuex store", () => {
  let localVue;
  let f1, f2, f3, friends;

  jest.mock("@/api/friend.service");

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    f1 = { id: 23, firstName: "Kizzy", lastName: "Daly", fav: true };
    f2 = { id: 2, firstName: "Lee", lastName: "Cagney", fav: true };
    f3 = { id: 4, firstName: "Love", lastName: "Earley", fav: false };
    friends = [f1, f2, f3];
  });

  it("should retrieve all friends", async () => {
    // this.$store.dispatch('fetchFriends')
    expect.assertions(3);
    const store = new Vuex.Store(clone(storeConfig));
    friendService.getAll = jest.fn().mockImplementation(async () => {
      return {
        data: friends
      };
    });

    await store.dispatch("fetchFriends");
    expect(friendService.getAll).toHaveBeenCalledTimes(1);
    expect(store.getters.friendsCount).toBe(3);
    expect(store.getters.favFriendsCount).toBe(2);
  });

  it("should correctly 'like' a friend", async () => {
    // this.$store.dispatch('like')
    expect.assertions(3);
    const store = new Vuex.Store(clone(storeConfig));
    store.state.friends = friends;
    const likedF3 = {
      ...f3,
      fav: true
    };
    friendService.patchFavorite = jest.fn().mockImplementation(async () => {
      return {
        data: likedF3
      };
    });

    await store.dispatch("like", likedF3);
    expect(friendService.patchFavorite).toHaveBeenCalledWith(4, true);
    expect(store.getters.friendsCount).toBe(3);
    expect(store.getters.favFriendsCount).toBe(3);
  });

  it("should correctly 'unlike' a friend", async () => {
    // this.$store.dispatch('unlike')
    expect.assertions(3);
    const store = new Vuex.Store(clone(storeConfig));
    store.state.friends = friends;
    const likedF1 = {
      ...f1,
      fav: false
    };
    friendService.patchFavorite = jest.fn().mockImplementation(async () => {
      return {
        data: likedF1
      };
    });

    await store.dispatch("unlike", likedF1);
    expect(friendService.patchFavorite).toHaveBeenCalledWith(23, false);
    expect(store.getters.friendsCount).toBe(3);
    expect(store.getters.favFriendsCount).toBe(1);
  });

  it("should correctly add a friend", async () => {
    // this.$store.dispatch('addFriend')
    expect.assertions(3);
    const store = new Vuex.Store(clone(storeConfig));
    store.state.friends = friends;

    const newFriend = { firstName: "Jean", lastName: "Kea", fav: true };
    const newFriendWithId = {
      ...newFriend,
      id: 121
    };
    friendService.create = jest.fn().mockImplementation(async () => {
      return {
        data: newFriendWithId
      };
    });

    await store.dispatch("addFriend", newFriend);
    expect(friendService.create).toHaveBeenCalledWith(newFriend);
    expect(store.getters.friendsCount).toBe(4);
    expect(store.getters.friendById(121)).toBe(newFriendWithId);
  });

  it("should correctly update a friend", async () => {
    // this.$store.dispatch('updateFriend')
    expect.assertions(3);
    const store = new Vuex.Store(clone(storeConfig));
    store.state.friends = friends;
    const updatedFriend = {
      ...f1,
      lastName: "Willingham"
    };
    friendService.update = jest.fn().mockImplementation(async () => {
      return {
        data: updatedFriend
      };
    });

    await store.dispatch("updateFriend", updatedFriend);
    expect(friendService.update).toHaveBeenCalledWith(updatedFriend);
    expect(store.getters.friendsCount).toBe(3);
    expect(store.getters.friendById(23).lastName).toBe("Willingham");
  });
});
