import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

import PeopleList from "@/components/PeopleList.vue";
import PersonItem from "@/components/PersonItem.vue";

const createStore = () => {
  const defaultStoreConfig = {
    actions: {
      like: jest.fn().mockImplementation(async friend => {
        return {
          data: {
            ...friend,
            fav: true
          }
        };
      }),
      unlike: jest.fn().mockImplementation(async friend => {
        return {
          data: {
            ...friend,
            fav: false
          }
        };
      })
    },
    state: {
      friends: [
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
    }
  };
  return new Vuex.Store(defaultStoreConfig);
};

describe("PersonList", () => {
  let localVue;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuex);

    wrapper = shallowMount(PeopleList, {
      localVue,
      vuetify,
      store: createStore()
    });
  });

  it("should fetch all friends on mounted", async () => {
    expect.assertions(1);

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.friends).toHaveLength(2);
  });

  it("should render two PersonItem(s)", async () => {
    expect.assertions(1);

    expect(wrapper.findAllComponents(PersonItem)).toHaveLength(2);
  });

  it("renders Add Friend correctly", async () => {
    expect.assertions(2);

    expect(wrapper.find("#add-friend").props().to.name).toBe("AddEditFriend");
    expect(wrapper.find("#add-friend").text()).toBe("Add Friend");
  });
});
