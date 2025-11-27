// path: admin-frontend/src/components/Table.tsx
import React from "react";

interface Column<T> {
  title: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor?: (row: T) => string | number;
}

export function Table<T>({ data, columns, keyExtractor }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead className="text-xs uppercase text-slate-400">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-3 py-2 ${col.className || ""}`}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={keyExtractor ? keyExtractor(row) : rowIdx} className="hover:bg-slate-800/50">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={`px-3 py-2 ${col.className || ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
