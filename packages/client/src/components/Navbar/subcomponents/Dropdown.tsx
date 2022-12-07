import React, { ChangeEvent, FC, MouseEvent } from "react";

interface Items {
  title: string;
  onClick: (e: MouseEvent<HTMLParagraphElement>) => void;
}

interface IDropdown {
  items: Items[];
  isOpen: boolean;
}

const Dropdown: FC<IDropdown> = (props) => {
  const { isOpen, items } = props;
  return (
    <div
      className={`absolute right-0 ${
        !isOpen && "hidden"
      } left-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 duration-200 ease-in-out focus:outline-none`}
    >
      {items.map((item) => {
        const { onClick, title } = item;
        return (
          <div className="py-1" role="none">
            <p
              onClick={(e) => onClick(e)}
              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 duration-200 ease-in-out hover:bg-gray-600 hover:bg-opacity-10"
            >
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
