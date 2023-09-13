import SearchIcon from '@mui/icons-material/Search';

function Search() {
  return (
    <form role='search'>
      <div className='search'>
        <input
          name='q'
          type='text'
          placeholder='Looking for Cooking Ideas?'
          aria-label='Search through site content'
        />
        <SearchIcon className='search-icon' />
      </div>
    </form>
  );
}

export default Search;
