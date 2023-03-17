import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "../../styles/Detail.module.css"
import Image from "next/image";

function detail ({data,id}) {
  console.log(data)

  const getPokemonCharacteristics = async (id: number) => {
    return await axios.get(`https://pokeapi.co/api/v2/characteristic/${id}`).then((res)=>res.data.descriptions[1])
  } 
  const getPokemonAbility = async (id: number) => {
    return await axios.get(`https://pokeapi.co/api/v2/ability/${id}/`).then((res)=>res.data)
  }
  const {data: getCharcter} = useQuery(["character", +id], ()=>getPokemonCharacteristics(+id))
  const {data: ability} = useQuery(["ability", id], ()=>getPokemonAbility(+id))

  console.log("ability", ability)
  



    return (<div className={styles.detailcontainer}>
        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${+id}.png`} width={150} height={150}/>
        <div className={styles.Infobox}>
            <p className={styles.Info}>이름</p>
            <p className={styles.Info_detail}>{data.name}</p>
        </div>
        <div className={styles.Infobox}>
            <p className={styles.Info}>특성</p>
            <p  className={styles.Info_detail}>{getCharcter?.description}</p>
        </div>
        <div>
            <p className={styles.Info}>능력</p>
            <p  className={styles.Info_detail}>{ability?.effect_entries[1].effect}</p>
        </div>
    </div>)
}

export default detail;


    export const getServerSideProps = async (context) => {
        const { query } = context;
        const { id } = query;
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    
        return { props: { data,id } }
    }
