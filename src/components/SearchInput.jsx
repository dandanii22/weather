import { InputWrap } from "../styled/Style";
const SearchInput = ({ onSearch, keyword, onSubmit, textRef, searchData }) => {
  return (
    <InputWrap onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={keyword}
        name="keyword"
        ref={textRef}
        onChange={onSearch}
      />

      <button type="submit">
        <i className="xi-search" onClick={() => searchData(keyword)}></i>
      </button>
    </InputWrap>
  );
};

export default SearchInput;
