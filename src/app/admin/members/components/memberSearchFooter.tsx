'use client';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react'
import { MemberSearchContext } from '../contexts/memberSearchProvider'

export default function PaginationFooter({totalItems} : {totalItems: number}) {
    const { currentPage, itemsPerPage, handlePageChange } = useContext(MemberSearchContext)
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
          Previous
        </button>
      </div>
    <div>
        <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-medium">{totalItems}</span> results
        </p>
    </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxPage}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400" />
        </button>
      </div>
    </nav>
  )
}
