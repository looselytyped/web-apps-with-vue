import { storeConfig } from "@/store/store-config";
import { friendService } from "@/api/friend.service";

describe("Store configuration", () => {
  describe("Mutations", () => {
    let f1, f2, f3, mutations;

    beforeEach(() => {
      mutations = storeConfig.mutations;

      f1 = { id: 23, firstName: "Kizzy", lastName: "Daly", fav: true };
      f2 = { id: 2, firstName: "Lee", lastName: "Cagney", fav: true };
      f3 = { id: 4, firstName: "Love", lastName: "Earley", fav: false };
    });

    it("should set friends correctly", () => {
      expect.assertions(1);

      const friends = [f1, f2];
      const state = { friends: [] };

      mutations.setFriends(state, friends);
      expect(state.friends).toBe(friends);
    });

    it("should update the friend list immutably", () => {
      expect.assertions(1);
      const state = { friends: [f1, f2, f3] };
      const updatedFriend = { ...f2, fav: false };

      mutations.updateFriend(state, updatedFriend);
      expect(state.friends).toEqual([f1, updatedFriend, f3]);
    });

    it("should add friend to the end", () => {
      expect.assertions(1);
      const state = { friends: [f1, f3] };

      mutations.addFriend(state, f2);
      expect(state.friends).toEqual([f1, f3, f2]);
    });
  });

  describe("Getters", () => {
    let f1, f2, f3, state, getters;

    beforeEach(() => {
      getters = storeConfig.getters;

      f1 = { id: 23, firstName: "Kizzy", lastName: "Daly", fav: true };
      f2 = { id: 2, firstName: "Lee", lastName: "Cagney", fav: true };
      f3 = { id: 4, firstName: "Love", lastName: "Earley", fav: false };
      state = { friends: [f1, f2, f3] };
    });

    it("should count my friends correctly", () => {
      expect.assertions(1);
      expect(getters.friendsCount(state)).toEqual(3);
    });

    it("should count my fav friends correctly", () => {
      expect.assertions(1);
      expect(getters.favFriendsCount(state)).toEqual(2);
    });

    it("should find friend by ID", () => {
      expect.assertions(1);
      expect(getters.friendById(state)(2)).toBe(f2);
    });
  });

  describe("Actions", () => {
    let f1, f2, f3, friends, actions;

    jest.mock("@/api/friend.service");

    beforeEach(() => {
      actions = storeConfig.actions;

      f1 = { id: 23, firstName: "Kizzy", lastName: "Daly", fav: true };
      f2 = { id: 2, firstName: "Lee", lastName: "Cagney", fav: true };
      f3 = { id: 4, firstName: "Love", lastName: "Earley", fav: false };
      friends = [f1, f2, f3];
    });
    it("should retrieve all friends", async () => {
      expect.assertions(1);
      const context = {
        commit: jest.fn()
      };
      friendService.getAll = jest.fn().mockImplementation(async () => {
        return {
          data: friends
        };
      });
      await actions.fetchFriends(context);

      expect(context.commit).toHaveBeenCalledWith("setFriends", friends);
    });

    it("should correctly 'like' a friend", async () => {
      expect.assertions(2);
      const context = {
        commit: jest.fn()
      };
      const likedF3 = {
        ...f3,
        fav: true
      };
      friendService.patchFavorite = jest.fn().mockImplementation(async () => {
        return {
          data: likedF3
        };
      });
      await actions.like(context, f3);

      expect(friendService.patchFavorite).toHaveBeenCalledWith(4, true);
      expect(context.commit).toHaveBeenCalledWith("updateFriend", likedF3);
    });

    it("should correctly 'unlike' a friend", async () => {
      expect.assertions(2);
      const context = {
        commit: jest.fn()
      };
      const unlikedF1 = {
        ...f1,
        fav: false
      };
      friendService.patchFavorite = jest.fn().mockImplementation(async () => {
        return {
          data: unlikedF1
        };
      });
      await actions.unlike(context, f1);

      expect(friendService.patchFavorite).toHaveBeenCalledWith(23, false);
      expect(context.commit).toHaveBeenCalledWith("updateFriend", unlikedF1);
    });

    it("should correctly add a friend", async () => {
      expect.assertions(2);
      const context = {
        commit: jest.fn()
      };
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
      await actions.addFriend(context, newFriend);

      expect(friendService.create).toHaveBeenCalledWith(newFriend);
      expect(context.commit).toHaveBeenCalledWith("addFriend", newFriendWithId);
    });

    it("should correctly update a friend", async () => {
      expect.assertions(2);
      const context = {
        commit: jest.fn()
      };
      const updatedFriend = {
        ...f1,
        lastName: "Willingham"
      };
      friendService.update = jest.fn().mockImplementation(async () => {
        return {
          data: updatedFriend
        };
      });
      await actions.updateFriend(context, updatedFriend);

      expect(friendService.update).toHaveBeenCalledWith(updatedFriend);
      expect(context.commit).toHaveBeenCalledWith(
        "updateFriend",
        updatedFriend
      );
    });
  });
});
