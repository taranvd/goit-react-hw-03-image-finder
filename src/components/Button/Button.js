import './Button.css';

export const Button = ({ loadMore }) => {
  return (
    <>
      <button onClick={loadMore} type="button" className="Button">
        Load more
      </button>
    </>
  );
};
