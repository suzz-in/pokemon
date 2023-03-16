import Image from "next/image";
import styles from "./Pokemon.module.css"

interface propsType {
    id: string,
    name: string
}

const PokemonCard = ({id, name}:propsType) => {

    return (
        <div className={styles.cardbox}>
        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="pokemonImg" width={100} height={100}/>
    <div className={styles.info}>
        <p className={styles.info_Id}>{id}&nbsp;&nbsp;</p>
        <p>{name}</p>
    </div>

    </div>
    )
}

export default PokemonCard;