import React, { useState, useEffect } from 'react';
import styles from '@/styles/Map.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';


function MapList() {
    
    const router = useRouter();

    //좌표
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    //법정동
    const [dong, setDong] = useState();
    //주소
    const [address, setAddress] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);

    useEffect(() => {
        if (latitude && longitude) {

          // 카카오 지도 API에서 위도, 경도를 주소로 변환
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
            setAddress(result[0].address.address_name);
    
              // 변환된 주소에서 동 정보 추출
            for (let i = 0; i < result[0].address.address_name.split(' ').length; i++) {
                if (result[0].address.address_name.split(' ')[i].endsWith('동')) {
                    setDong(result[0].address.address_name.split(' ')[i]);
                    break;
                }
              }
            }
          });
        }
        
    }, [latitude, longitude]);


    return (
        <>
            <div className={styles.listHeader}>
                <button onClick={()=>router.push({pathname:'/src/First'})}> 
                    <Image src="/images/back.png" alt="" width={25} height={25}/>
                </button>
            </div>
            <div>
                위도 : {latitude} , 경도 : {longitude} , {dong}
            </div>
        </>
    )
}



export default MapList