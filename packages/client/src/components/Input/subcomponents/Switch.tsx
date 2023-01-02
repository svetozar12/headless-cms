import React, { ForwardedRef, forwardRef } from "react";

interface ISwitch {
  checked?: boolean;
  extraProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const Switch = forwardRef(
  (props: ISwitch, ref: ForwardedRef<HTMLInputElement>) => {
    const { checked, extraProps } = props;

    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          ref={ref}
          type="checkbox"
          value=""
          className="peer sr-only"
          defaultChecked={checked}
          {...extraProps}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
