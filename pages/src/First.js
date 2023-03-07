import React , { useContext } from 'react';
import { useRouter} from 'next/router';
import { CategoryContext } from '../_app';
import { CategoryTranslate } from '../_app';
import Image from 'next/image';
import styles from '@/styles/first.module.scss';

function First() {
    const router = useRouter();
    const { setCategory } = useContext(CategoryContext);
    const { categoryTranslate } = useContext(CategoryTranslate);
    const categoryList = ['baby','book','furniture','hobby','fashion','homeAppliance','householdGoods','petSupplies','sport'];

    function LikesMenuClick(){
        setCategory("likeItems");
        router.push({pathname:'/src/List'});
    }

    function hotMenuClick(){
        setCategory("hotItems");
        router.push({pathname:'/src/List'});
    }
    function mapMenuClick(){
        router.push({pathname:'/src/MapList'});
    }
    return (
        <>
            <div className={styles.SearchCon}>
                <input placeholder='찾는물건을 검색해주세요'>
                </input>
                <Image src={`/images/search.png`} alt="" width={20} height={20}/>
            </div>
            <section className={styles.category}>
                {
                    categoryList.map((el,idx)=>{
                        return (
                            <figure 
                                key={idx} 
                                onClick={()=>{setCategory(el); router.push({pathname:'/src/List'})}}
                            >
                                <Image src={`/images/menu/${el}.png`} alt="" width={100} height={96}/>
                                <figcaption>{categoryTranslate(el)}</figcaption>
                            </figure>
                        )
                    })
                }
            </section>
            <nav className={styles.bottomMenu}>
                <ul>
                    <li onClick={()=>mapMenuClick()}><Image src={"/images/map.png"} alt="" width={24} height={25}/>내주변</li>
                    <li onClick={()=>hotMenuClick()}><Image src={"/images/hot.png"} alt="" width={30} height={30}/>인기매물</li>
                    <li onClick={()=>LikesMenuClick()}><Image src={"/images/like.png"} alt="" width={25} height={25}/>찜</li>
                </ul>
            </nav>
            
        </>
    )
}

export default First