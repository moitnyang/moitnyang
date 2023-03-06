import styles from '@/styles/Home.module.scss'
import { useEffect, useState} from 'react';
import First from './src/First';
import Loading from './src/loading';



export default function Home() {
    const [load,setLoad] = useState(true);


    return (
      <>
      {
        load ? <First/> : <Loading/>
      }
      </>
  )
}
