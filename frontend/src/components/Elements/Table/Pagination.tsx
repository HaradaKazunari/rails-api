type PaginationProps = {
  currentPage: number;
  maxPage: number;
  setCurrentPage: (v: number) => void;
};

export const Pagination = ({
  currentPage,
  maxPage,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <div className="flex justify-end items-center gap-8">
      <button
        disabled={currentPage == 1}
        className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        data-testid="page-previous"
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
        </span>
      </button>
      <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
        Page <strong className="text-gray-900">{currentPage}</strong> of
        <strong className="ml-1 text-gray-900">{maxPage}</strong>
      </p>
      <button
        disabled={currentPage == maxPage}
        className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => setCurrentPage(Math.min(currentPage + 1, maxPage))}
        data-testid="page-next"
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  );
};
