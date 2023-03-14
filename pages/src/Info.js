import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/info.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { CategoryContext } from '../_app';
function Info() {
    const router = useRouter();

    const { likeCheck, updataLike, commentInsert, commentList, getProductInfo, productInfo, commentSelect } = useContext(CategoryContext)
    const [comment, setComment] = useState();
    useEffect(() => {
        getProductInfo(router.query.no);
        commentSelect(router.query.no)
    }, [])
    useEffect(() => {
        getProductInfo(router.query.no);
    }, [likeCheck])
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
            {
                productInfo &&
                <div className={styles.infoContainer}>
                    <div key={productInfo.product_no}>
                        <div className={styles.imgBox} >
                            <figure>
                                <Image src={productInfo.product_img} width={100} height={100} layout="responsive" unoptimized={true} alt='' />
                            </figure>
                            <Image src={productInfo.like ? "/images/like2.png" : "/images/like.png"} width={35} height={35} className={styles.likebtn} onClick={() => { updataLike(productInfo.product_no) }} alt='' />
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
                            <input type="text" onChange={(e) => setComment(e.target.value)} />
                            <button onClick={() => { commentInsert(router.query.no, comment) }}>댓글 달기</button>
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