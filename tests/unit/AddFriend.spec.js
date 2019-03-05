import { mount, RouterLinkStub } from "@vue/test-utils";
import Vuetify from "vuetify";
import AddFriend from "@/components/AddFriend.vue";
import Vue from "vue";
import axios from "axios";

describe("PersonList", () => {
  Vue.use(Vuetify);
  beforeEach(() => {
    jest.mock("axios");
    jest.resetModules();
    jest.clearAllMocks();
  });

  test("the form should be invalid at the start", async () => {
    const wrapper = mount(AddFriend, {
      stubs: {
        RouterLink: RouterLinkStub
      },
      sync: false
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.valid).toBe(false);
  });

  test("first/last name are required", async () => {
    const wrapper = mount(AddFriend, {
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

  test("should be valid after all required fields are input", async () => {
    const wrapper = mount(AddFriend, {
      stubs: {
        RouterLink: RouterLinkStub
      },
      sync: false
    });
    const firstName = wrapper.find("input#firstName");
    firstName.setValue("Raju");
    firstName.trigger("change");

    const lastName = wrapper.find("input#lastName");
    lastName.setValue("Gandhi");
    lastName.trigger("change");

    expect(wrapper.find("button#submit").props().disabled).toBe(false);
  });

  test("should submit ", async () => {
    const wrapper = mount(AddFriend, {
      stubs: {
        RouterLink: RouterLinkStub
      },
      sync: false
    });
    const firstName = wrapper.find("input#firstName");
    firstName.setValue("Raju");
    firstName.trigger("change");

    const lastName = wrapper.find("input#lastName");
    lastName.setValue("Gandhi");
    lastName.trigger("change");

    wrapper.find("button#submit").trigger("click");
    expect(axios.post).toBeCalledWith("http://localhost:3000/friends", {
      firstName: "Raju",
      lastName: "Gandhi",
      gender: "male",
      fav: false
    });
  });
});
