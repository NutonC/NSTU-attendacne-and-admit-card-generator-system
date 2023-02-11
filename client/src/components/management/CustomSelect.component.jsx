import React from "react";
import { MenuItem, Select } from "@material-ui/core";

export default function CustomSelect({
  value,
  onChange,
  selectionData,
  customTitle,
}) {
  return (
    <Select style={{ width: "120px" }} value={value || ""} onChange={onChange}>
      <MenuItem disabled>Select {customTitle || ""}</MenuItem>
      {selectionData.map((data, i) => (
        <MenuItem
          key={i}
          value={typeof data === "number" ? data : data.toUpperCase()}
        >
          {typeof data === "number" ? data : data.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
}
