import React, { useEffect, useState } from 'react'
import styles from '@/styles/info.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
function Info() {
    const router = useRouter();
    

    //// 나중에 옮길 함수들 ////
    const [comment, setComment] = useState();
    const [commentList, setList] = useState();
    const [product, setProduct] = useState();
    // 댓글 쓰기
    const commentFn = async () => {
        await axios.post("/api/comment", { content: comment })
        
    }
    // 상품 정보 해당하는 상품의 댓글
    const getProduct = async () => {
        await axios.get(`/api/product/${router.query.no}`).then((res) =>setProduct(res.data)).then(err => console.log(err));
        await axios.get("/api/comment/").then((res)=>setList(res.data));
    }
    useEffect(() => {
        getProduct();
    }, [])
 
    return (
        <>
            <div className={styles.infoHeader}>
                <button onClick={() => router.push({ pathname: '/src/List' })}>
                    <Image src="/images/back.png" alt="" width={25} height={25} />
                </button>
                <p>물건 상세정보</p>
                <button onClick={() => router.push({ pathname: '/src/First' })}>
                    <Image src="/images/HOME.svg" alt="" width={35} height={35} className={styles.home} />
                </button>
            </div>
            <div className={styles.infoContainer}>
                {
                    product && product.map((obj) => {
                        return (
                            <div key = {obj.product_no}>
                                <div className={styles.imgBox} >
                                    <figure>
                                        <Image src={obj.product_img} width={100} height={100} layout="responsive" unoptimized={true} alt='' />
                                    </figure>
                                    <Image src="/images/like.png" width={35} height={35} className={styles.likebtn} alt='' />
                                </div>
                                <div className={styles.idBox}>
                                    <div>
                                        <p>{obj.member_id}</p>  {/* 아이디 , 위치 */}
                                        <p>강남구</p>
                                    </div>
                                </div>
                                <div className={styles.contentBox}>
                                    <div>
                                        <p>{obj.product_title}</p> {/* 제목 , 카테고리 , 가격 , 내용*/}
                                        <p onClick={() => router.push({ pathname: '/src/List' })}>{obj.product_category}</p>
                                        <p>{Number(obj.product_price).toLocaleString('kr-KR')}원</p> 
                                        <p>{obj.product_content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


                {/*                 <div className={styles.imgBox}>
                    <figure>
                        <Image src="/images/menu/book.PNG" width={500} height={500} layout="responsive" alt='' />
                    </figure>
                    <Image src="/images/like.png" width={35} height={35} className={styles.likebtn} alt='' />
                </div>
                <div className={styles.idBox}>
                    <div>
                        <p>하하호호</p>  
                        <p>강남구</p>
                    </div>
                </div>
                <div className={styles.contentBox}>
                    <div>
                        <p>책상 팔아요.</p>
                        <p onClick={() => router.push({ pathname: '/src/List' })}>가구</p>
                        <p>600,000원</p>
                        <p>책상 팔아요. 모던한 스타일의 책상입니다 에몬스에서 150에 구매했어요.. 눈물을 머금고 팔아요 ㅜㅜ;;</p>
                    </div>
                </div> */}
                <div className={styles.commentBox}>
                    <div className={styles.inputBox}>
                        <input type="text" onChange={(e) => setComment(e.target.value)} />
                        <button onClick={commentFn}>댓글 달기</button>
                    </div>
                    <div className={styles.commentContent}>
                        {/* comment 컴포넌트로 뿌려줌 */}
                        {commentList && commentList.map((obj) => {
                            return (
                                <div key={obj.comment_no}>
                                    <div className={styles.commentInfo}>
                                        <p>{obj.member_id}</p><p>{obj.comment_date}</p>
                                    </div>
                                    <p>{obj.comment_content}</p>
                                </div>)
                        })}
                        {/* <div>
                            <div className={styles.commentInfo}>
                                <p>abcd</p><p>2023.03.03 14:18</p>
                            </div>
                            <p>혹시 택배 가능한가요?</p>
                        </div>
                        <div>
                            <div className={styles.commentInfo}>
                                <p>택배기사</p><p>2023.03.03 14:22</p>
                            </div>
                            <p>택포나요?</p>
                        </div>
                        <div>
                            <div className={styles.commentInfo}>
                                <p>네고안하면안삼</p><p>2023.03.03 14:28</p>
                            </div>
                            <p>직접 가면 네고 가능한가요?</p>
                        </div> */}


                    </div>
                </div>
            </div>
        </>
    )
}

export default Info