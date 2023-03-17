import React from 'react'
import Image from 'next/image';
import styles from '@/styles/loading.module.scss';


export default function Loading() {
  return (
    <div className={styles.loadingCon}>
      <p>내 주변의 모든 것</p>
      <Image src="/images/mainImg.png" alt="" width={600} height={600} placeholder="blur"
  blurDataURL={'/images/mainImg.png'} />
      <h1>모있냥</h1>
    </div>
  )
}
