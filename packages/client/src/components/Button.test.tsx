import type { ShallowWrapper } from "enzyme";
import { shallow } from "enzyme";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button component", () => {
  let wrapper: ShallowWrapper;
  const mockedOnSubmit = vi.fn();

  beforeEach(() => {
    wrapper = shallow(
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
    expect(wrapper).toMatchSnapshot();
  });
});
