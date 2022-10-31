import type { ReactWrapper } from "enzyme";
import { mount } from "enzyme";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Input from "./Input";

describe("Input component", () => {
  let wrapper: ReactWrapper;
  const mockedOnChangeEvent = vi.fn();
  const inputTypes = ["text", "password", "email", "number"];
  beforeEach(() => {
    mockedOnChangeEvent.mockReset();
    wrapper = mount(
      <Input
        type="text"
        placeholder="text"
        value="hi"
        onChange={mockedOnChangeEvent}
        name="name"
      />
    );
  });

  it("should render input", () => {
    expect(wrapper.find("input").length).toBe(1);
    expect(wrapper.find("input").prop("type")).toBe("text");
    expect(wrapper.find("input").prop("placeholder")).toBe("text");
    expect(wrapper.find("input").prop("value")).toBe("hi");
    expect(wrapper.find("input").prop("name")).toBe("name");
    expect(wrapper).toMatchSnapshot();
  });
  it("should call onChange", () => {
    wrapper.find("input").simulate("change");
    expect(mockedOnChangeEvent).toHaveBeenCalledTimes(1);
  });
  inputTypes.forEach((type) => {
    it(`should render ${type}`, () => {
      wrapper.setProps({ type });
      expect(wrapper.find("input").prop("type")).toBe(type);
    });
  });
});
