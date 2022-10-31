import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount, ReactWrapper } from "enzyme";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Navbar />);
  });
  it("should render navbar while logged", () => {
    vi.mock("../hooks/useSession", async () => {
      const originalModule: any = await vi.importActual("../hooks/useSession");
      return {
        __esModule: true,
        ...originalModule,
        default: () => ({
          isLoggedIn: true,
          user: { username: "test" },
        }),
      };
    });
    expect(wrapper.find("nav").length).toBe(1);
    expect(wrapper.find("a").length).toBe(2);
    expect(wrapper.find("a").at(0).text()).toBe("Dashboard");
    expect(wrapper.find("a").at(1).text()).toBe("Profile");
    expect(wrapper.find("button").text()).toBe("LogOut");
    expect(wrapper).toMatchSnapshot();
  });
});
