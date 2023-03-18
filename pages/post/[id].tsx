import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "../../styles/Detail.module.css"
import Image from "next/image";
import { GetServerSideProps } from 'next'
import { useEffect } from "react";


function Detail ({Id, data}) {
    console.log(data)

    const {sprites,name, order, height,weight, abilities} = data





    return (<div className={styles.detailcontainer}>
        <Image src={sprites.front_default} alt={name} width={150} height={150}/>
        <Image src={sprites.back_default} alt={name} width={150} height={150}/>
        <p  className={styles.Info_num}>No. {order}</p>
        <div className={styles.Infobox}>
            <p className={styles.Info}>이름</p>
            <p className={styles.Info_detail}>{name}</p>
        </div>
        <div className={styles.Infobox}>
            <p className={styles.Info}>키</p>
            <p className={styles.Info_detail}>{height * 10}cm</p>
        </div>
        <div className={styles.Infobox}>
        <p className={styles.Info}>몸무게</p>
        <p className={styles.Info_detail}>{weight / 10}kg</p>
        </div>
        <div className={styles.Infobox}>
            <p className={styles.Info}>능력</p>
            {abilities.map((data, index)=>(
                    <span  key={data.slot}>
                    {data.ability.name}
                    {abilities?.length !== index + 1 ? ", " : ""}
                </span>
            ))}
        </div>

    </div>)
}

export default Detail;


    export const getServerSideProps: GetServerSideProps = async (context) => {
        const { query } = context;
        const { Id } = query;
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Id}`)
    
        return { props: {Id, data} }
    }
