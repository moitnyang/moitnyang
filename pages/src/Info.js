import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/info.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { CategoryContext } from '../_app';
import { useSession } from "next-auth/react"
function Info() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { likeCheck, getProduct, updataLike, commentInsert, commentList, getProductInfo, productInfo, commentSelect } = useContext(CategoryContext)
    const [comment, setComment] = useState();
    //새로고침시 다시 데이터 받아옴
    useEffect(() => {
        getProduct(session?.user.email);
        getProductInfo(router.query.no);
        commentSelect(router.query.no);
    }, [router.query.no])
    //좋아요
    useEffect(() => {
        getProductInfo(router.query.no);
    }, [likeCheck])
    // 댓글
    function commentClick(e,no) {
        e.preventDefault();
        commentInsert(no, comment, session?.user.email);
        setComment('')
    }

    return (
        <>
            <div className={styles.infoHeader}>
                <button onClick={() => router.push({ pathname: '/src/List', query: { category: router.query.category, search: router.query.search } })}>
                    <Image src="/images/back.png" alt="" width={25} height={25} />
                </button>
                <p>물건 상세정보</p>
                <button onClick={() => router.push({ pathname: '/src/First' })}>
                    <Image src="/images/HOME.svg" alt="" width={35} height={35} className={styles.home} />
                </button>
            </div>
            {
                productInfo &&
                <div className={styles.infoContainer}>
                    <div key={productInfo.product_no}>
                        <div className={styles.imgBox} >
                            <figure>
                                <Image src={productInfo.product_img} width={100} height={100} layout="responsive" unoptimized={true} alt='' />
                            </figure>
                            <Image src={productInfo.like ? "/images/like2.png" : "/images/like.png"} width={35} height={35} className={styles.likebtn} onClick={() => { updataLike(productInfo.product_no, session.user.email) }} alt='' />
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.idBox}>
                                <p>{productInfo.member_id}</p>  {/* 아이디 , 위치 */}
                                <p>{productInfo.product_dong}</p>
                            </div>
                            <div className={styles.dateBox}>
                                <p>{productInfo.product_date}</p>
                            </div>
                        </div>
                        <div className={styles.contentBox}>
                            <div>
                                <p>{productInfo.product_title}</p> {/* 제목 , 카테고리 , 가격 , 내용*/}
                                <p onClick={() => router.push({ pathname: '/src/List' })}>{productInfo.product_category}</p>
                                <p>{Number(productInfo.product_price).toLocaleString('kr-KR')}원</p>
                                <p>{productInfo.product_content}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.commentBox}>
                        <div className={styles.inputBox}>
                            <form onSubmit={(e) => { commentClick(e,router.query.no) }}>
                                <input type="text" onChange={(e) => setComment(e.target.value)} value={comment?comment : ""} placeholder="댓글 작성" />
                                <button type="submit" >등록</button>
                            </form>
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
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Info