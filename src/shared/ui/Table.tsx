import type { ReactNode } from 'react';

export interface TableColumn<T> {
  header: string;
  cell: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Array<TableColumn<T>>;
  rows: T[];
}

export const Table = <T,>({ columns, rows }: TableProps<T>) => (
  <table className="table">
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.header}>{column.header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td key={column.header}>{column.cell(row)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
