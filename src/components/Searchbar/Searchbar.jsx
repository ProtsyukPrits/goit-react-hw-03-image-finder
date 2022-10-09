import { Header, FormItem, SearchButton, Input } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <FormItem autoComplete="off" onSubmit={onSubmit}>
        <Input
          type="text"
          name="query"
          placeholder="Search images and photos"
        />

        <SearchButton type="submit">
          <BsSearch size={24} />
        </SearchButton>
      </FormItem>
    </Header>
  );
};

// autofocus ===input?
