import styles from "./Button.module.css";

function Button({ children, onClickHandler, type }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
