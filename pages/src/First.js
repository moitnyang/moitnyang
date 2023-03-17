import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CategoryContext } from '../_app';
import { CategoryTranslate } from '../_app';
import Image from 'next/image';
import styles from '@/styles/first.module.scss';
import { useSession, signOut } from "next-auth/react"
function First() {
    const router = useRouter();
    const { getProduct, setCategory, searchFn, search, setSearch } = useContext(CategoryContext);
    const { categoryTranslate } = useContext(CategoryTranslate);
    const categoryList = ['baby', 'book', 'furniture', 'hobby', 'fashion', 'homeAppliance', 'householdGoods', 'petSupplies', 'sport'];
    const { data: session, status } = useSession();
    useEffect(() => {
        getProduct(session?.user.email);
    }, [status])
    // 메뉴 이동
    function LikesMenuClick() {
        router.push({ pathname: '/src/List', query: { category: "likeItems" } });
    }
    function hotMenuClick() {
        router.push({ pathname: '/src/List', query: { category: "hotItems" } });
    }
    function mapMenuClick() {
        router.push({ pathname: '/src/List', query: { category: "nearItems" } });
    }
    function searchClick(e) {
        e.preventDefault();

        router.push({ pathname: '/src/List', query: { category: "searchItems", search: search } });
    }
    // 로그아웃하면 메인 페이지로 이동
    function logOutFn() {
        signOut({ callbackUrl: "/" })
    }
    return (
        <>
            <div className={styles.firstHeader}>
                <p>Moitnyang</p>
            </div>

            <div className={styles.mainViewBox}>
                <p>내 주변에 모든지<br/> 다 있다냥~</p>
            </div>


            <div className={styles.SearchCon}>
                <form onSubmit={(e) => { searchClick(e) }}>
                    <input type="search" placeholder='찾는물건을 검색해주세요' enterkeyhint="search"  onChange={(e) => { setSearch(e.target.value) }}>
                    </input>
                </form>

            </div>
            <section className={styles.category}>
                {
                    categoryList.map((el, idx) => {
                        return (
                            <figure
                                key={idx}
                                onClick={() => { router.push({ pathname: '/src/List', query: { category: el } }) }}
                            >
                                <Image src={`/images/menu/${el}.png`} alt="" width={100} height={96} placeholder="blur"
  blurDataURL={`/images/menu/${el}.png`}  />
                                <figcaption>{categoryTranslate(el)}</figcaption>
                            </figure>
                        )
                    })
                }
            </section>
            <nav className={styles.bottomMenu}>
                <ul>
                    <li><Image src={"/images/map.png"} alt="" width={50} height={50} onClick={() => mapMenuClick()} placeholder="blur"
  blurDataURL={'/images/map.png'} /></li>
                    <li><Image src={"/images/hot.png"} alt="" width={50} height={50} onClick={() => hotMenuClick()} placeholder="blur"
  blurDataURL={'/images/hot.png'} /></li>
                    <li><Image src={"/images/like.png"} alt="" width={50} height={50} onClick={() => LikesMenuClick()} placeholder="blur"
  blurDataURL={'/images/like.png'} /></li>
                    <li><Image src={"/images/logOut.png"} width={50} height={50} alt="" onClick={() => { logOutFn() }} placeholder="blur"
  blurDataURL={'/images/logOut.png'} /></li>
                </ul>
            </nav>

        </>
    )
}

export default First