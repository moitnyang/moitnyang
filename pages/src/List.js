import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/list.module.scss';
import { CategoryContext } from '../_app';
import { CategoryTranslate } from '../_app';
import { useSession } from "next-auth/react"


function List() {
    const { getProduct, product, rank, likeCheck, nearProduct, searchFn, searchItems, search, setSearch } = useContext(CategoryContext);
    const [searchConAct, setSearchConAct] = useState(false);
    const { categoryTranslate } = useContext(CategoryTranslate);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [check, setCheck] = useState(true); // 좋아요 체크시 랜더링 다시 시작
    // 새로고침시 다시 데이터 받아옴
    useEffect(() => {
        getProduct(session?.user.email);
    }, [])
    // 검색 새로고침시 다시 데이터 받아옴
    useEffect(() => {
        searchFn(router.query.search);
        getProduct(session?.user.email);
    }, [router.query.search])
    // 좋아요 표시..
    useEffect(() => {
        searchFn(router.query.search)
        setCheck(!check);
    }, [likeCheck])

    //좋아요 개수 많은 상위 5개 정렬해서 인기매물 목록으로 만들기 api sql로 불러오는 데이터 조정 상위 5개    
    //인기매물 목록 
    const hotItemListMake = rank && rank.map((item, idx) => { return <Item key={idx} item={item} /> });
    //찜목록
    const myItemsListMake = likeCheck && likeCheck.map((item, idx) => { return <Item key={idx} item={item} /> })
    //근처 매물
    const nearItemMake = nearProduct && nearProduct.map((item, idx) => { return <Item key={idx} item={item} /> })
    //검색 결과
    const searchItemsMake = searchItems && searchItems.map((item, idx) => { return <Item key={idx} item={item} /> })

    function searchSubmit(e) {
        e.preventDefault();
        setSearchConAct(false);
        router.push({ pathname: '/src/List', query: { category: "searchItems", search: search } });
    }

    return (
        <>
            {searchConAct == false
                ? <ListHead searchConAct={searchConAct} setSearchConAct={setSearchConAct} />
                : (<div className={styles.SearchConBox}>
                    <form className={styles.SearchCon} onSubmit={(e) => { searchSubmit(e); }}>
                        <input type="search" placeholder='찾는물건을 검색해주세요' onChange={(e) => { setSearch(e.target.value) }} ></input>
                    </form>
                    <button onClick={() => setSearchConAct(false)} className={styles.closeBtn}>
                        <Image src="/images/close.png" alt="" width={35} height={35} />
                    </button>
                </div>)
            }
            <ul className={styles.itemList}>
                {
                    router.query.category == "searchItems" ? searchItemsMake :
                        router.query.category != "likeItems" ?
                            (router.query.category != "hotItems" ?
                                (router.query.category != "nearItems" ?
                                    product && product.filter(item => item.product_category == categoryTranslate(router.query.category)).map((item, idx) => { return <Item key={idx} item={item} /> }) :
                                    nearItemMake) : hotItemListMake) : myItemsListMake
                }
            </ul>
        </>
    )
}

function ListHead({ searchConAct, setSearchConAct }) {
    const router = useRouter();
    const { categoryTranslate } = useContext(CategoryTranslate);

    function searchBtnClick() {
        setSearchConAct(!searchConAct);
    }

    return (
        <div className={styles.listHeader}>
            <button onClick={() => router.push({ pathname: '/src/First' })}>
                <Image src="/images/back.png" alt="" width={25} height={25} priority/>
            </button>
            <div>
                <Image src={router.query.category ? `/images/menu/${router.query.category}.png` : ""} alt="" width={65} height={65} priority />
                <p> {categoryTranslate(router.query.category)} </p>
            </div>
            <div>
                <button onClick={() => router.push({ pathname: '/src/Write',query: { category: router.query.category} })} className={styles.writeBtn}>
                    <Image src="/images/icWrite.png" alt="" width={35} height={25} priority/>
                </button>
                <button onClick={() => searchBtnClick()}>
                    <Image src="/images/search.png" alt="" width={25} height={25} className={styles.searchBtn} priority />
                </button>
            </div>
        </div>
    )
}

function Item({ item }) {
    const { updataLike } = useContext(CategoryContext);
    const router = useRouter();
    const { data: session, status } = useSession();
    // 상품정보로 이동
    const infoMove = (e, no) => {
        if (e.target.className != "list_searchBtn___E6C7") {
            router.push({ pathname: '/src/Info', query: { no: item.product_no, category: router.query.category, search: router.query.search } })
        }

    }

    // function likeClick(no) {
    // let findIndex = product.filter(item => item.product_no === no);
    // let copiedItems = [...items];

    // copiedItems[findIndex].likeThis = !copiedItems[findIndex].likeThis;

    // //좋아요 누르면 +1 다시 누르면 취소
    // if(copiedItems[findIndex].likeThis){
    //     copiedItems[findIndex].likeNum += 1;
    // }else{ copiedItems[findIndex].likeNum -= 1; }
    // setItems(copiedItems);


    // //좋아요 누르면 찜 목록에 추가
    // if(copiedItems[findIndex].likeThis){
    //     let copiedMyItems = [...myItems, copiedItems[findIndex]];
    //     setMyItems(copiedMyItems);
    // }else{
    //     let copiedMyItems = [...myItems];
    //     let findIndex2 = myItems.findIndex(item => item.id === id);
    //     copiedMyItems.splice(findIndex2,1);
    //     setMyItems( copiedMyItems );
    // }
    // }
    return (

        <li loading="lazy" className='item' onClick={(e) => { infoMove(e, item.product_no) }}>
            <Image src={item.product_img} unoptimized={true} alt="" width={80} height={80} />
            <div>
                <p>{item.product_title}</p>
                <p>{item.product_dong}·{item.product_date}</p>
                <p>{Number(item.product_price).toLocaleString('kr-KR')}원</p>
            </div>
            <div className={styles.likeItem} onClick={() => { updataLike(item.product_no, session.user.email) }}>
                {
                    <Image src={item.like ? "/images/like2.png" : "/images/like.png"} alt="" width={20} height={20} className={styles.searchBtn} />
                }

                <p>{item.likenum}</p>
            </div>
        </li>
    )
}

export default List