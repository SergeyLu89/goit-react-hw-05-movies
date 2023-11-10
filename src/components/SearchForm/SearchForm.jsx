import css from './SearchForm.module.css';

const SearchForm = ({ setSearchParams }) => {
  const onFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const formQuery = form.elements.search.value.trim();

    setSearchParams({ query: formQuery });

    form.reset();
  };
  return (
    <div>
      <form className={css.form} onSubmit={onFormSubmit}>
        <input
          name="search"
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter movie titles"
        />
        <button type="submit" className={css.submitBtn}>
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
