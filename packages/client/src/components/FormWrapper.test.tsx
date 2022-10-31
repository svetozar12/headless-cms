import type { ReactWrapper } from "enzyme";
import { mount } from "enzyme";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FormWrapper from "./FormWrapper";

describe("Button component", () => {
  let wrapper: ReactWrapper;
  const mockedOnSubmit = vi.fn();

  beforeEach(() => {
    mockedOnSubmit.mockReset();

    wrapper = mount(
      <FormWrapper error={""}>
        <p>hello</p>
      </FormWrapper>
    );
  });
  it("should render without error", () => {
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("p").length).toBe(1);
    expect(wrapper.find("p").text()).toBe("hello");
  });
  it("should render with error", () => {
    wrapper.setProps({ error: "error" });
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("p").length).toBe(1);
    expect(wrapper.find("p").text()).toBe("hello");
    expect(wrapper.find("h1").text()).toBe("error");
    expect(wrapper).toMatchSnapshot();
  });
});
