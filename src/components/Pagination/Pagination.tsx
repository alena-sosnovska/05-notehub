import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps extends ReactPaginateProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage?: number;
}

export default function Pagination({
  pageCount,
  onPageChange,
  forcePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      forcePage={forcePage}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
