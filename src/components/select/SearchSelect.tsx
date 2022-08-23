import React from "react";
import { Select } from "antd";

type OptionsType<T> = {
  value: T,
  label: string,
}[];
export declare type SearchSelectProps<ValueType> = {
  options?: OptionsType<ValueType>,
  placeholder?: string,
  style?: React.CSSProperties,
  value?: ValueType,
  onSearch?: (value: string) => void,
  onChange?: (value: ValueType) => void,
};
const SearchSelect: React.FC<SearchSelectProps<string | number>> = (props) => {
  return (
    <Select
      showSearch
      placeholder={props.placeholder}
      style={props.style}
      value={props.value}
      showArrow={false}
      filterOption={false}
      notFoundContent={null}
      options={props.options}
      onChange={props.onChange}
      onSearch={props.onSearch}
    />
  )
}

export default SearchSelect;