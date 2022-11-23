import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
interface IPagination {
  total: number;
  current: number;
  onChange?: (pageNumber: number) => void;
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
      <div className="flex">
        <button
          onClick={() => onPageChange(page - 1)}
          className="mx-2 my-1 flex h-8 w-8 items-center justify-center rounded-md duration-100 ease-in hover:bg-table-headerBackground"
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
              className={`mx-2 my-1 flex h-8 w-8 items-center justify-center rounded-md duration-100 ease-in ${
                isActive
                  ? "border-2 border-blue-400 text-blue-400"
                  : "hover:bg-table-headerBackground"
              }`}
            >
              {readablePage}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(page + 1)}
          className="mx-2 my-1 flex h-8 w-8 items-center justify-center rounded-md duration-100 ease-in hover:bg-table-headerBackground"
        >
          <BsChevronRight />
        </button>
      </div>
    );
  };

  return <>{render()}</>;
};

export default Pagination;
