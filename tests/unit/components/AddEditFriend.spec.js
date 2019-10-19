import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

import merge from "ramda.merge";

import AddEditFriend from "@/components/AddEditFriend";

const createStore = overrides => {
  const defaultStoreConfig = {
    actions: {
      addFriend: jest.fn(),
      updateFriend: jest.fn()
    },
    getters: {
      friendById: () => () => {
        return {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: false
        };
      }
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
  return new Vuex.Store(merge(defaultStoreConfig, overrides));
};

describe("AddEditFriend", () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuex);
  });

  describe("Add or Edit", () => {
    it("first/last name are required", async () => {
      expect.assertions(2);

      const wrapper = mount(AddEditFriend, {
        localVue,
        vuetify,
        stubs: {
          RouterLink: RouterLinkStub
        },
        sync: false
      });

      const firstName = wrapper.find("input#firstName");
      expect(firstName.attributes().required).toBeTruthy();

      const lastName = wrapper.find("input#lastName");
      expect(lastName.attributes().required).toBeTruthy();
    });

    it("should be valid after all required fields are input", async () => {
      expect.assertions(2);

      const wrapper = mount(AddEditFriend, {
        localVue,
        vuetify,
        stubs: {
          RouterLink: RouterLinkStub
        },
        sync: false
      });

      const firstName = wrapper.find("#firstName");
      firstName.setValue("Raju");
      const lastName = wrapper.find("#lastName");
      lastName.setValue("Gandhi");

      expect(wrapper.vm.$refs.form.validate()).toBe(true);
      await wrapper.vm.$nextTick();

      expect(wrapper.find("button#submit").props().disabled).toBe(false);
    });
  });

  describe("Add Friend", () => {
    it("the form should be invalid at the start", async () => {
      expect.assertions(1);

      const wrapper = mount(AddEditFriend, {
        localVue,
        vuetify,
        stubs: {
          RouterLink: RouterLinkStub
        },
        sync: false
      });

      expect(wrapper.vm.$refs.form.validate()).toBe(false);
    });

    it("should invoke the service to create a new friend", async () => {
      expect.assertions(1);

      const $router = {
        push: jest.fn()
      };
      const store = createStore();
      const wrapper = mount(AddEditFriend, {
        localVue,
        vuetify,
        store,
        stubs: {
          RouterLink: RouterLinkStub
        },
        mocks: {
          $router
        },
        sync: false
      });

      const firstName = wrapper.find("input#firstName");
      firstName.setValue("Raju");

      const lastName = wrapper.find("input#lastName");
      lastName.setValue("Gandhi");

      wrapper.vm.$refs.form.validate();
      await wrapper.vm.$nextTick();

      jest.spyOn(store, "dispatch");
      wrapper.find("button#submit").trigger("click");
      expect(store.dispatch).toBeCalledWith("addFriend", {
        firstName: "Raju",
        lastName: "Gandhi",
        gender: "male",
        fav: false
      });
    });
  });

  describe("Edit Friend", () => {
    it("should be in 'editing' mode when supplied a prop", async () => {
      const store = createStore();
      const wrapper = mount(AddEditFriend, {
        localVue,
        vuetify,
        store,
        stubs: {
          RouterLink: RouterLinkStub
        },
        propsData: {
          friendId: 10
        },
        sync: false
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.editing).toBe(true);
    });

    it("should invoke the service to get the friend when mounted", async () => {
      const store = createStore({
        getters: {
          friendById: () => () => {
            return {
              id: 1,
              firstName: "John",
              lastName: "Doe",
              gender: "male",
              fav: false
            };
          }
        }
      });
      const wrapper = mount(AddEditFriend, {
        localVue,
        vuetify,
        store,
        stubs: {
          RouterLink: RouterLinkStub
        },
        propsData: {
          friendId: 1
        },
        sync: false
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.selectedFriend.firstName).toBe("John");
    });

    it("should invoke the service to update an existing friend", async () => {
      expect.assertions(3);

      const $router = {
        push: jest.fn()
      };
      const store = createStore({
        getters: {
          friendById: () => () => {
            return {
              id: 1,
              firstName: "Mary",
              lastName: "Jane",
              gender: "female",
              fav: true
            };
          }
        }
      });

      const wrapper = mount(AddEditFriend, {
        localVue,
        vuetify,
        store,
        stubs: {
          RouterLink: RouterLinkStub
        },
        propsData: {
          friendId: 1
        },
        mocks: {
          $router
        },
        sync: false
      });

      jest.spyOn(store, "dispatch");

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$refs.form.validate()).toBe(true);
      await wrapper.vm.$nextTick();

      expect(wrapper.find("button#submit").props().disabled).toBe(false);
      wrapper.find("button#submit").trigger("click");

      await wrapper.vm.$nextTick();
      expect(store.dispatch).toBeCalledWith("updateFriend", {
        id: 1,
        firstName: "Mary",
        lastName: "Jane",
        gender: "female",
        fav: true
      });
    });
  });
});
