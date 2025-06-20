import TableAntD, { type TableProps } from 'antd/es/table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  return <TableAntD {...props} />;
}

export default Table;
