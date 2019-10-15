import axios from "./__mocks__/axios";

import { friendService } from "@/api/friend.service";

describe("friend service", () => {
  beforeEach(() => {
    jest.mock("axios");
  });

  it("should perform a HTTP GET to return all friends on getAll", async () => {
    expect.assertions(2);
    const mockFn = axios.get.mockImplementation(async () => {
      return {
        data: [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            gender: "male",
            fav: false
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            gender: "female",
            fav: true
          }
        ]
      };
    });
    const resp = await friendService.getAll();
    expect(resp.data.length).toEqual(2);
    expect(mockFn).toBeCalledWith("http://localhost:3000/friends");
  });

  it("should perform a HTTP GET to return a friend on get", async () => {
    expect.assertions(2);
    const mockFn = axios.get.mockImplementation(async () => {
      return {
        data: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: false
        }
      };
    });
    const resp = await friendService.get(1);
    expect(resp.data.id).toEqual(1);
    expect(mockFn).toBeCalledWith("http://localhost:3000/friends/1");
  });

  it("should perform a HTTP PUT on update", async () => {
    expect.assertions(2);
    const mockFn = axios.put.mockImplementation(async () => {
      return {
        data: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: false
        }
      };
    });
    const resp = await friendService.update({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: false
    });

    expect(resp.data.id).toEqual(1);
    expect(mockFn).toBeCalledWith("http://localhost:3000/friends/1", {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: false
    });
  });

  it("should perform a HTTP PATCH on patchFavorite", async () => {
    expect.assertions(3);
    const mockFn = axios.patch.mockImplementation(async () => {
      return {
        data: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: true
        }
      };
    });
    const resp = await friendService.patchFavorite(1, true);

    expect(resp.data.id).toEqual(1);
    expect(resp.data.fav).toEqual(true);
    expect(mockFn).toBeCalledWith("http://localhost:3000/friends/1", {
      fav: true
    });
  });

  it("should perform a HTTP POST on create", async () => {
    expect.assertions(1);
    const mockFn = axios.post.mockImplementation(async () => {
      return {
        data: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: true
        }
      };
    });

    await friendService.create({
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: true
    });

    expect(mockFn).toBeCalledWith("http://localhost:3000/friends", {
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: true
    });
  });
});
