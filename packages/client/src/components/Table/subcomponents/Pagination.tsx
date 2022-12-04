import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
interface IPagination {
  total: number;
  current: number;
  onChange?: (_: number) => void;
}

const Pagination: React.FC<IPagination> = (props) => {
  const { current, total, onChange } = props;
  const [page, setPage] = useState(current);
  const pageSize = 10;
  const pagesNumber = Math.ceil(total / pageSize);

  const onPageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > pagesNumber) return;
    onChange?.(pageNumber);
    setPage(pageNumber);
  };

  const render = () => {
    const pagesArray: number[] = [];
    for (let i = 0; i < pagesNumber; i++) pagesArray.push(i);
    return (
      <div className="flex justify-end">
        <button
          onClick={() => onPageChange(page - 1)}
          className="m-2 flex h-8 w-8 items-center justify-center rounded-md  bg-offBlack text-white duration-100 ease-in hover:bg-opacity-50"
        >
          <BsChevronLeft />
        </button>
        {pagesArray.map((item) => {
          const readablePage = item + 1;
          const isActive = readablePage === page;
          return (
            <button
              key={readablePage}
              onClick={() => !isActive && onPageChange(readablePage)}
              className={`m-2 flex h-8 w-8 items-center justify-center rounded-md duration-100 ease-in ${
                isActive
                  ? "bg-mainPurple text-white"
                  : "bg-offBlack text-white hover:bg-opacity-50"
              }`}
            >
              {readablePage}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(page + 1)}
          className="m-2 flex h-8 w-8 items-center justify-center rounded-md  bg-offBlack text-white duration-100 ease-in hover:bg-opacity-50"
        >
          <BsChevronRight />
        </button>
      </div>
    );
  };

  return <>{render()}</>;
};

export default Pagination;
