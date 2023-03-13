import React from 'react'
import Image from 'next/image';
import styles from '@/styles/loading.module.scss';

function Loading() {
  return (
    <div className={styles.loadingCon}>
      <p>내 주변의 모든 것</p>
      <Image src="/images/mainImg.png" alt="" width={600} height={600}/>
      <h1>모있냥</h1>
    </div>
  )
}

export default Loading