import React from "react";

interface ISwitch {
  ref: any;
}

const Switch: React.FC<ISwitch> = (props) => {
  const { ref } = props;
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input ref={ref} type="checkbox" value="" className="peer sr-only" />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
    </label>
  );
};

export default Switch;
