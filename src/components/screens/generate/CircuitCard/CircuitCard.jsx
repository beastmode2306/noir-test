import styles from "./CircuitCard.module.css";
import Button from "../../../ui/Button/Button.jsx";

const CircuitCard = ({
  title,
  onGenerateClick,
  onVerifyClick,
  isLocked,
  isVerifyLocked,
}) => {
  return (
    <article
      className={
        !isLocked
          ? styles["circuit-card"]
          : `${styles["circuit-card"]} ${styles["circuit-card-locked"]}`
      }
    >
      <div className={styles["circuit-card__header"]}>
        <div className={styles["circuit-card__header__title"]}>
          <h2> {title} </h2>
        </div>
      </div>

      <div className={styles["circuit-card__body"]}>
        <Button
          onClick={onGenerateClick}
          text={"Generate proof"}
          type={"button"}
          disabled={isLocked}
        />

        <Button
          onClick={onVerifyClick}
          text={"Verify proof"}
          type={"button"}
          disabled={isLocked || isVerifyLocked}
        />
      </div>
    </article>
  );
};

export default CircuitCard;
