import type { ReactWrapper } from "enzyme";
import { mount } from "enzyme";
import { beforeEach, describe, expect, it, test, vi } from "vitest";
import Button from "./Button";

describe("Button component", () => {
  let wrapper: ReactWrapper;
  const mockedOnSubmit = vi.fn();

  beforeEach(() => {
    mockedOnSubmit.mockReset();

    wrapper = mount(
      <Button
        onClick={mockedOnSubmit}
        type="button"
        isDisabled={false}
        text={"some-text"}
      />
    );
  });
  it("should render button", () => {
    expect(wrapper.find("button").length).toBe(1);
    expect(wrapper.find("button").prop("type")).toBe("button");
    expect(wrapper.find("button").prop("disabled")).toBe(false);
    expect(wrapper.find("button").text()).toBe("some-text");
    expect(wrapper).toMatchSnapshot();
  });
  test("click the button(enabled)", () => {
    wrapper.find("button").simulate("click");

    expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
  });
  test("click the button(disabled)", () => {
    const local = mount(
      <Button
        onClick={mockedOnSubmit}
        type="button"
        isDisabled={true}
        text={"some-text"}
      />
    );
    console.log(wrapper.debug());
    local.find("button").simulate("click");
    expect(mockedOnSubmit).toHaveBeenCalledTimes(0);
  });
});
