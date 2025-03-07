"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DataTableAttributes({
  columns,
  data,
  title,
  description,
  loading,
  pagination,
  actions,
  className,
}) {
  return (
    <Card className={className}>
      <div className="p-6">
        {/* Header */}
        {(title || description || actions) && (
          <div className="flex items-center justify-between mb-6">
            <div>
              {title && (
                <h2 className="text-base font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-4">{actions}</div>
            )}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((column) => (
                  <th
                    key={String(column.accessorKey)}
                    className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-4 text-sm text-gray-600 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-4 text-sm text-gray-600 text-center"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.accessorKey)}
                        className="py-4 text-sm text-gray-900"
                      >
                        {column.cell
                          ? column.cell(item[column.accessorKey], item)
                          : String(item[column.accessorKey])}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-500">
              Page {pagination.currentPage} of {pagination.totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage - 1)
                }
                disabled={pagination.currentPage === 1}
                className={cn(
                  "p-2 rounded-md hover:bg-gray-100",
                  pagination.currentPage === 1 &&
                    "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage + 1)
                }
                disabled={pagination.currentPage === pagination.totalPages}
                className={cn(
                  "p-2 rounded-md hover:bg-gray-100",
                  pagination.currentPage === pagination.totalPages &&
                    "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
