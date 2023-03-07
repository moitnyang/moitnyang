import styles from '@/styles/Home.module.scss'
import { useEffect, useState } from 'react';
import Link from "next/link";
import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/react"
import Loading from './Loading';

export default function Home() {
  const [load, setLoad] = useState(true);
  const loadingFn = () => {
    setTimeout(() => {
      setLoad(false)
      
    }, 1000)
  }

  useEffect(() => {
    loadingFn();
  }, [])
  const { data: session, status } = useSession();

  function handleSignOut() {
    signOut() /* 쿠키에서 모든 값을 자동으로 제거 */
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Home Page</title>
        </Head>
        {load ? <Loading /> : session ? User({ session, handleSignOut }) : Guest()}

      </div>
    </>
  )
}
// 게스트
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link href={"/src/Login"}>
          <div className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Sign In
          </div>
        </Link>
      </div>
    </main>
  );
}
// 인증된 사용자
function User({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50">
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={"/profile"}>
          <div className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Profile Page
          </div>
        </Link>
      </div>
    </main>
  );
}
//인증이 안된경우 로그인페이지로~~~
/* export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/src/Login",
        permanent: false
      }
    }
  }
  else {
    return {
      props: { session },
      redirect: {
        destination: "/src/First",
        permanent: false
      }
    }
  }
} */