import styles from './Button.module.css';

const { Button: ButtonStyled } = styles;

export const Button = ({ loadMore }) => {
  return (
    <>
      <button onClick={loadMore} type="button" className={ButtonStyled}>
        Load more
      </button>
    </>
  );
};
