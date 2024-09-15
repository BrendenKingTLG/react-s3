type Props = {
  children: React.ReactNode;
  cols: string[];
};

export const Table = ({ children, cols }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {cols.map((col) => (
              <th>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
