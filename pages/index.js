import styles from '@/styles/Home.module.scss'
import { useEffect, useState } from 'react';
import Link from "next/link";
import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react"
import Loading from './Loading';
import Login from './src/Login';
import First from './src/First';

export default function Home() {
  const [load, setLoad] = useState(true);
 /*  const [firstLoad] */
  const loadingFn = () => {
    setTimeout(() => {
      setLoad(false)
    }, 1000)
  }
  useEffect(() => {
    loadingFn();
  }, [])
  const { data: session, status } = useSession();

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Home Page</title>
        </Head>
        {load ? <Loading /> : session ? <First /> :<Login />}

      </div>
    </>
  )
}