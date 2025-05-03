'use client';

import { memo } from 'react';
import styles from './UiverseButton.module.css';

interface UiverseButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const UiverseButton = memo(
  ({ children = 'UIVERSE', onClick, className }: UiverseButtonProps) => {
    return (
      <button
        className={`${styles.uiverse} ${className || ''}`}
        onClick={onClick}
      >
        <div className={styles.wrapper}>
          <span>{children}</span>
          <div className={`${styles.circle} ${styles['circle-1']}`} />
          <div className={`${styles.circle} ${styles['circle-2']}`} />
          <div className={`${styles.circle} ${styles['circle-3']}`} />
          <div className={`${styles.circle} ${styles['circle-4']}`} />
          <div className={`${styles.circle} ${styles['circle-5']}`} />
          <div className={`${styles.circle} ${styles['circle-6']}`} />
          <div className={`${styles.circle} ${styles['circle-7']}`} />
          <div className={`${styles.circle} ${styles['circle-8']}`} />
          <div className={`${styles.circle} ${styles['circle-9']}`} />
          <div className={`${styles.circle} ${styles['circle-10']}`} />
          <div className={`${styles.circle} ${styles['circle-11']}`} />
          <div className={`${styles.circle} ${styles['circle-12']}`} />
        </div>
      </button>
    );
  }
);

export default UiverseButton;
