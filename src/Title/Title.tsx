import styles from './Title.module.css';

export function Title() {
  return (
    <h1 data-testid="rim-title" className={styles.h1}>
      React Image Magnifier
    </h1>
  );
}
