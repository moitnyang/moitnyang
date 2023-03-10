import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/list.module.scss';
import { CategoryContext } from '../_app';
import { CategoryTranslate } from '../_app';
import axios from 'axios';




function List() {
    const { category, product, rank, likeCheck, nearProduct, searchFn } = useContext(CategoryContext);
    const [searchConAct, setSearchConAct] = useState(false);
    const [check, setCheck] = useState(true); // 좋아요 체크시 랜더링 다시 시작
    useEffect(() => {
        product && product.map((obj) => (
            likeCheck && likeCheck.map((oobj) => {
                if (obj.product_no == oobj.product_no) {
                    obj.like = true
                }
            }))
        )
        likeCheck && likeCheck.map((obj) => (
            likeCheck && likeCheck.map((oobj) => {
                if (obj.product_no == oobj.product_no) {
                    obj.like = true
                }
            }))
        )
        rank && rank.map((obj) => (
            likeCheck && likeCheck.map((oobj) => {
                if (obj.product_no == oobj.product_no) {
                    obj.like = true;
                }
            }))
        )
        nearProduct && nearProduct.map((obj) => (
            likeCheck && likeCheck.map((oobj) => {
                if (obj.product_no == oobj.product_no) {
                    obj.like = true;
                }
            }))
        )
        setCheck(!check);
    }, [likeCheck])

    //좋아요 개수 많은 상위 5개 정렬해서 인기매물 목록으로 만들기 api sql로 불러오는 데이터 조정 상위 5개    
    //인기매물 목록 
    const hotItemListMake = rank && rank.map((item, idx) => { return <Item key={idx} item={item} /> });
    //찜목록
    const myItemsListMake = likeCheck && likeCheck.map((item, idx) => { return <Item key={idx} item={item} /> })
    const nearItemMake = nearProduct && nearProduct.map((item,idx) => { return <Item key={idx} item={item} /> })
    const [search,setSearch] = useState();
   
    return (
        <>
            {searchConAct == false
                ? <ListHead searchConAct={searchConAct} setSearchConAct={setSearchConAct} />
                : (<>
                    <div className={styles.SearchCon}>
                        <input placeholder='찾는물건을 검색해주세요' onChange={(e)=>{setSearch(e.target.value)}} ></input>
                        <Image src="/images/search.png" alt="" width={20} height={20} onClick={()=>{searchFn(search)}} />
                    </div>
                    <button onClick={() => setSearchConAct(false)} className={styles.closeBtn}>
                        <Image src="/images/close.png" alt="" width={35} height={35} />
                    </button>
                </>)
            }
            <ul className={styles.itemList}>
                {
                    category != "likeItems" ?
                        (category != "hotItems" ? 
                            (category != "nearItems" ?
                                product && product.filter(item => item.product_category == category).map((item, idx) => { return <Item key={idx} item={item} /> }) : 
                                nearItemMake) : hotItemListMake) : myItemsListMake

                }

            </ul>
        </>
    )
}

function ListHead({ searchConAct, setSearchConAct }) {
    const router = useRouter();
    const { category } = useContext(CategoryContext);
    const { categoryTranslate } = useContext(CategoryTranslate);

    function searchBtnClick() {
        setSearchConAct(!searchConAct);
    }

    return (
        <div className={styles.listHeader}>
            <button onClick={() => router.push({ pathname: '/src/First' })}>
                <Image src="/images/back.png" alt="" width={25} height={25} />
            </button>
            {
                category != "likeItems" ?? category != "hotItems" ?? category != "nearItem" ??<Image src={`/images/menu/${category}.png`} alt="" width={65} height={65} />
            }
            <p> {categoryTranslate(category)} </p>
            <button onClick={() => router.push({ pathname: '/src/Write' })} className={styles.writeBtn}>
                <Image src="/images/icWrite.png" alt="" width={35} height={31} />
            </button>
            <button onClick={() => searchBtnClick()}>
                <Image src="/images/search.png" alt="" width={25} height={25} className={styles.searchBtn} />
            </button>
        </div>
    )
}

function Item({ item }) {
    const { updataLike, category } = useContext(CategoryContext);
    const router = useRouter();

    // 상품정보로 이동
    const infoMove = (e, no) => {
        if (e.target.className != "list_searchBtn___E6C7") {
            router.push({ pathname: '/src/Info', query: { no: item.product_no } })
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
                <p>{item.product_location}</p>
                <p>{Number(item.product_price).toLocaleString('kr-KR')}원</p>
            </div>
            <div className={styles.likeItem} onClick={() => { updataLike(item.product_no, category) }}>
                {
                    <Image src={item.like ? "/images/like2.png" : "/images/like.png"} alt="" width={20} height={20} className={styles.searchBtn} />
                }

                <p>{item.likenum}</p>
            </div>
        </li>
    )
}

export default List