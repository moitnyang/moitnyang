import React , { useContext,useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/list.module.scss';
import { CategoryContext } from '../_app';
import { CategoryTranslate } from '../_app';




function List() {
    const { items, category, myItems } = useContext(CategoryContext);
    const [searchConAct, setSearchConAct] = useState(false);
    
    //좋아요 개수 많은 상위 5개 정렬해서 인기매물 목록으로 만들기
    const copyList = [...items];
    copyList.sort((a, b) => { return b.likeNum - a.likeNum });
    const hotItemList = copyList.splice(0,5);

    //인기매물 목록
    const hotItemListMake = hotItemList.map((item, idx) => { return <Item key={idx} item={item} /> });
    
    //찜목록
    const myItemsListMake = myItems.map((item, idx)=>{ return <Item key={idx} item={item}/> })

    return (
        <>
            {   searchConAct == false
                ? <ListHead searchConAct={searchConAct} setSearchConAct={setSearchConAct} />
                : (<>
                <div className={styles.SearchCon}>
                    <input placeholder='찾는물건을 검색해주세요'></input>
                        <Image src="/images/search.png" alt="" width={20} height={20}/>
                </div>
                <button onClick={()=>setSearchConAct(false)} className={styles.closeBtn}>
                <Image src="/images/close.png" alt="" width={35} height={35}/>
                </button>
                </>)
            }
            <ul className={styles.itemList}>
                {
                    category != "likeItems" ?
                    ( category != "hotItems"
                    ? items.filter( item => item.category ==category).map((item, idx)=>{ return <Item key={idx} item={item}/> }) 
                    : hotItemListMake ) : myItemsListMake
                }
            </ul>
        </>
    )
}

function ListHead({ searchConAct , setSearchConAct }) {
    const router = useRouter();
    const { category } = useContext(CategoryContext);
    const { categoryTranslate } = useContext(CategoryTranslate);

    function searchBtnClick() {
        setSearchConAct(!searchConAct);
    }

    return (
        <div className={styles.listHeader}>
            <button onClick={()=>router.push({pathname:'/src/First'})}> 
                <Image src="/images/back.png" alt="" width={25} height={25}/>
            </button>
            {
                category != "likeItems" ?? category != "hotItems" ?? <Image src={`/images/menu/${category}.png`} alt="" width={65} height={65}/>
            }
            <p> {categoryTranslate(category)} </p>
            <button onClick={()=>router.push({pathname:'/src/Write'})} className={styles.writeBtn}>
                <Image src="/images/icWrite.png" alt="" width={35} height={31}/>
            </button>
            <button onClick={() => searchBtnClick()}>
                <Image src="/images/search.png" alt="" width={25} height={25} className={styles.searchBtn}/>
            </button>
        </div>
    )
}

function Item({item}) {
    const { items, setItems, myItems, setMyItems } = useContext(CategoryContext);
    const router = useRouter();

    
    function likeClick(id){
        let findIndex = items.findIndex(item => item.id === id);
        let copiedItems = [...items];
        copiedItems[findIndex].likeThis = !copiedItems[findIndex].likeThis;

        //좋아요 누르면 +1 다시 누르면 취소
        if(copiedItems[findIndex].likeThis){
            copiedItems[findIndex].likeNum += 1;
        }else{ copiedItems[findIndex].likeNum -= 1; }
        setItems(copiedItems);


        //좋아요 누르면 찜 목록에 추가
        if(copiedItems[findIndex].likeThis){
            let copiedMyItems = [...myItems, copiedItems[findIndex]];
            setMyItems(copiedMyItems);
        }else{
            let copiedMyItems = [...myItems];
            let findIndex2 = myItems.findIndex(item => item.id === id);
            copiedMyItems.splice(findIndex2,1);
            setMyItems( copiedMyItems );
        }
    }

    return (
        <li loading="lazy" onClick={()=>router.push({pathname:'/src/Info'})}>
            <Image src={item.src} alt="" width={80} height={80}/>
            <div>
                <p>{item.title}</p>
                <p>{item.location}</p>
                <p>{item.price}</p>
            </div>
            <div className={styles.likeItem} onClick={()=>{ likeClick(item.id) }}>
                <Image src={item.likeThis ? "/images/like2.png" : "/images/like.png"}  alt="" width={20} height={20} className={styles.searchBtn}/>
                <p>{item.likeNum}</p>
            </div>
        </li>
    )
}

export default List