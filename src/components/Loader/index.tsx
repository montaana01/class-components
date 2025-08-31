import styles from './loader.module.scss';

export function Loader() {
  return (
    <div
      className={styles.spinnerWrap}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div>Loading CO2 data…</div>
      <div className={styles.spinner} />
    </div>
  );
}
