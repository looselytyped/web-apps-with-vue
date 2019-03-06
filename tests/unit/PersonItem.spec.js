import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import PersonItem from "@/components/PersonItem.vue";
import Vue from "vue";

describe("PersonItem", () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it("should display a Person", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true
        },
        last: true
      }
    });
    expect(wrapper.text()).toContain("Raju Gandhi");
  });

  it("should display a divider if its the last friend", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true
        },
        last: true
      }
    });
    expect(wrapper.find(".v-divider").exists()).toBe(true);
  });

  it("should NOT display a divider if its NOT the last friend", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true
        },
        last: false
      }
    });
    expect(wrapper.find(".v-divider").exists()).toBe(false);
  });

  it("should highlight the favorite icon if the friend is a fav", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true
        },
        last: false
      }
    });
    expect(wrapper.find("i.v-icon.red--text").exists()).toBe(true);
  });

  it("should grey out the favorite icon if the friend is NOT a fav", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: false
        },
        last: false
      }
    });
    expect(wrapper.find("i.v-icon.grey--text").exists()).toBe(true);
    expect(wrapper.find("i").classes()).toContain("grey--text");
  });

  it("should display the full name", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: false
        },
        last: false
      }
    });
    const vm = wrapper.vm;
    expect(vm.fullName).toBe("Raju Gandhi");
  });

  it("should notifyParent when clicked", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: false
        },
        last: false
      }
    });

    wrapper.vm.notifyParent = jest.fn();

    wrapper.find("i.v-icon").trigger("click");
    expect(wrapper.vm.notifyParent).toHaveBeenCalledTimes(1);
  });

  it("should emit notifyParent when clicked", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: false
        },
        last: false
      }
    });

    wrapper.find("i.v-icon").trigger("click");
    const emitted = wrapper.emitted();
    const e = emitted["notify-parent"];
    expect(e).toBeTruthy();
    expect(e.length).toBe(1);
  });

  it("should render correctly", () => {
    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true
        },
        last: true
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
