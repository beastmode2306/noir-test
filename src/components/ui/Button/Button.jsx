import styles from "./Button.module.css";

// eslint-disable-next-line react/prop-types
const Button = ({ text, type, title, onClick, disabled }) => {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
