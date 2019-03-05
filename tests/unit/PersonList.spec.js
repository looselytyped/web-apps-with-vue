import { mount, RouterLinkStub } from "@vue/test-utils";
import Vuetify from "vuetify";
import PeopleList from "@/components/PeopleList.vue";
import PersonItem from "@/components/PersonItem.vue";
import Vue from "vue";

describe("PersonList", () => {
  beforeEach(() => {
    Vue.use(Vuetify);
    jest.mock("axios");
  });

  it("has a created hook", () => {
    expect(typeof PeopleList.mounted).toBe("function");
  });

  it("should fetch all friends on mounted", () => {
    jest.useFakeTimers();
    const wrapper = mount(PeopleList, {
      stubs: ["router-link"]
    });
    jest.runAllTimers();
    expect(wrapper.vm.friends).toHaveLength(2);
  });

  it("should render two PersonItem(s)", () => {
    const wrapper = mount(PeopleList, {
      stubs: ["router-link"]
    });
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

  it("renders Add Friend correctly", () => {
    const wrapper = mount(PeopleList, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    expect(wrapper.find(RouterLinkStub).props().to.name).toBe("AddFriend");
    expect(wrapper.find(RouterLinkStub).text()).toBe("Add Friend");
  });
});
