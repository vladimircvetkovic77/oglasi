import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

interface AppInputWithSearchProps {
  placeholder: string;
  onSearch: (value: string) => void;
  clearOnSearch?: boolean;
}

const AppInputWithSearch = ({
  placeholder,
  onSearch,
  clearOnSearch,
}: AppInputWithSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = (value: string) => {
    setInputValue("");
    onSearch(value);
  };
  return (
    <div className="appinputwithsearch-container">
      <Search
        value={inputValue}
        placeholder={placeholder}
        onSearch={clearOnSearch ? handleSearch : onSearch}
        enterButton
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
export default AppInputWithSearch;
