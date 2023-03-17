import axios from 'axios'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import PokemonCard from '@/components/cards/PokemonCard'
import styles from "../styles/Home.module.css"


interface Pokemon {
  name: string,
  url: string
}

export default function Home() {

  const getAllPokemon = async ({pageParam=0}) => {
    console.log("pageParams",pageParam)
  return await axios.get("https://pokeapi.co/api/v2/pokemon", {
    params: {
      limit: 30,
      offset: pageParam
    }
  })
  .then((res)=>res.data)
  }

 


const {    
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,} = useInfiniteQuery(["InfinitePokemon"], getAllPokemon, {
  //무한스크롤의 핵심이다. getNextPageParam 메서드가 falsy한 값을 반환하면 추가 fetch 실행하지 않음
  //falsy하지 않은 값을 return 할 경우 Number를 리턴해야함 fetch calback의 인자로 자동으로 PageParam을 전달
  getNextPageParam: (lastPage) => {
    console.log("lastPage", lastPage)
    const nextpage = lastPage.next;
    if(!nextpage) return false;
    
    return  Number(new URL(nextpage).searchParams.get("offset"));
  }
})




  return (
    <>
    <section className={styles.home}>
      <div className={styles.listbox}>
      {data?.pages.map((page, index)=>(
        <div key={index} className={styles.list}>
          {page.results.map((pokemon:Pokemon)=>{
                 const { name, url } = pokemon
                 const id = url.split("/")[6]
              return  <PokemonCard key={name} id={id} name={name}/>
          })}
        </div>
      ) 
      )}
      </div>
      
          
      

    </section>
    <button onClick={()=> fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>다음페이지</button>
    </>
  )
}
