import React from "react";

// export interface DisplayColumnProps<TColumn extends string = string> {
//   displayColumns: TColumn[];
//   column: TColumn;
// }

function isSelected(
    data,
    list,
    compare,
) {
    return !!list.find(listElement => compare(listElement, data));
}

const DisplayColumn = ({
  displayColumns,
  children,
  column,
}) => {
  const display = React.useMemo(
    () => isSelected(column, displayColumns, (a, b) => a === b),
    [column, displayColumns],
  );

  return <>{display && children}</>;
};
export default DisplayColumn;