import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import PeopleList from "@/components/PeopleList.vue";
import PersonItem from "@/components/PersonItem.vue";

jest.mock("@/api/friend.service", () => {
  return {
    friendService: {
      getAll: jest.fn().mockImplementation(async () => {
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
              lastName: "Doe",
              gender: "female",
              fav: true
            }
          ]
        };
      }),
      patchFavorite: jest
        .fn()
        .mockImplementation(async (id, favoriteStatus) => {
          return {
            data: {
              id,
              fav: favoriteStatus
            }
          };
        })
    }
  };
});

describe("PersonList", () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  it("has a mounted hook", () => {
    expect.assertions(1);

    expect(typeof PeopleList.mounted).toBe("function");
  });

  it("should fetch all friends on mounted", async () => {
    expect.assertions(1);

    const wrapper = await shallowMount(PeopleList, { localVue, vuetify });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.friends).toHaveLength(2);
  });

  it("should render two PersonItem(s)", async () => {
    expect.assertions(1);

    const wrapper = await shallowMount(PeopleList, { localVue, vuetify });

    wrapper.setData({
      friends: [
        {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true
        },
        {
          id: 2,
          firstName: "Venkat",
          lastName: "Subramanian",
          fav: false
        }
      ]
    });

    expect(wrapper.findAll(PersonItem)).toHaveLength(2);
  });

  it("renders Add Friend correctly", async () => {
    expect.assertions(2);

    const wrapper = shallowMount(PeopleList, { localVue, vuetify });

    expect(wrapper.find("#add-friend").props().to.name).toBe("AddEditFriend");
    expect(wrapper.find("#add-friend").text()).toBe("Add Friend");
  });
});
