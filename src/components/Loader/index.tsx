import styles from './loader.module.scss';

export function Loader() {
  return (
    <div
      className={styles.spinner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinnerWrap} />
      <div>Loading CO2 data…</div>
    </div>
  );
}
