import type { ReactWrapper } from "enzyme";
import { mount } from "enzyme";
import { beforeEach, describe, expect, it } from "vitest";
import Heading from "./Heading";

const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];

describe("Button component", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<Heading type="h2" text="test" />);
  });
  it("should render button", () => {
    expect(wrapper.find(Heading).length).toBe(1);
    expect(wrapper.find("h2").length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  headingTypes.forEach((type) => {
    it(`should render ${type}`, () => {
      wrapper.setProps({ type });
      expect(wrapper.find(type).length).toBe(1);
      expect(wrapper.find(type).text()).toBe("test");
    });
  });
});
