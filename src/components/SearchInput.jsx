import { InputWrap } from "../styled/Style";
const SearchInput = ({ onSearch, keyword, onSubmit, textRef }) => {
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
        <i className="xi-search"></i>
      </button>
    </InputWrap>
  );
};

export default SearchInput;
