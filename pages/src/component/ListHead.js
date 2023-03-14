import React , { useContext } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/list.module.scss';
import { CategoryTranslate } from '../_app';

function ListHead() {
    const router = useRouter();
    const { category } = useContext(CategoryContext);
    const { categoryTranslate } = useContext(CategoryTranslate);

    return (
        <div className={styles.listHeader}>
            <button onClick={()=>router.push({pathname:'/'})}> 
                <Image src="/images/back.png" alt="" width={25} height={25}/>
            </button>
            <Image src={`/images/menu/${category}.png`} alt="" width={65} height={65}/>
            <p> {categoryTranslate(category)} </p>
            <button onClick={()=>router.push({pathname:'/src/Write'})} className={styles.writeBtn}>
                <Image src="/images/icWrite.png" alt="" width={35} height={31}/>
            </button>
            <button>
                <Image src="/images/search.png" alt="" width={25} height={25} className={styles.searchBtn}/>
            </button>
        </div>
    )
}

export default ListHead();
