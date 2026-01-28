import styles from './FloatingShapes.module.css';

export default function FloatingShapes() {
  return (
    <div className={styles['floating-shapes']}>
      <div className={`${styles.shape} ${styles['shape-1']}`}></div>
      <div className={`${styles.shape} ${styles['shape-2']}`}></div>
      <div className={`${styles.shape} ${styles['shape-3']}`}></div>
      <div className={`${styles.shape} ${styles['shape-4']}`}></div>
      <div className={`${styles.shape} ${styles['shape-5']}`}></div>
    </div>
  );
}
