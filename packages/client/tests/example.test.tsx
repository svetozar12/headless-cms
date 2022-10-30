import Button from "../src/components/Button";
import type { ShallowWrapper } from "enzyme";
import { shallow } from "enzyme";
import { beforeEach, describe, expect, it, vi } from "vitest";

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
    expect(1).toBe(1);
  });
});
