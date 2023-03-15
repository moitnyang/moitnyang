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
    function searchClick() {
        router.push({ pathname: '/src/List', query: { category: "searchItems", search: search } });
    }
    // 로그아웃하면 메인 페이지로 이동
    function logOutFn() {
        signOut({ callbackUrl: "/" })
    }
    return (
        <>
            <div className={styles.SearchCon}>
                <div>
                    <input placeholder='찾는물건을 검색해주세요' onChange={(e) => { setSearch(e.target.value) }}>
                    </input>
                    <Image src={`/images/search.png`} alt="" width={20} height={20} onClick={searchClick} className={styles.search} />
                </div>
                <Image src="/images/logOut.png" width={30} height={30} alt="" onClick={() => { logOutFn() }} className={styles.logOut} />
            </div>
            <section className={styles.category}>
                {
                    categoryList.map((el, idx) => {
                        return (
                            <figure
                                key={idx}
                                onClick={() => { router.push({ pathname: '/src/List', query: { category: el } }) }}
                            >
                                <Image src={`/images/menu/${el}.png`} alt="" width={100} height={96} />
                                <figcaption>{categoryTranslate(el)}</figcaption>
                            </figure>
                        )
                    })
                }
            </section>
            <nav className={styles.bottomMenu}>
                <ul>
                    <li onClick={() => mapMenuClick()}><Image src={"/images/map.png"} alt="" width={24} height={25} />내주변</li>
                    <li onClick={() => hotMenuClick()}><Image src={"/images/hot.png"} alt="" width={30} height={30} />인기매물</li>
                    <li onClick={() => LikesMenuClick()}><Image src={"/images/like.png"} alt="" width={25} height={25} />찜</li>
                </ul>
            </nav>

        </>
    )
}

export default First