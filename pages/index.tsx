import axios from 'axios'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import PokemonCard from '@/components/cards/PokemonCard'

interface Pokemon {
  name: string,
  url: string
}


export default function Home() {
  
  const getAllPokemon = async ({pageParams=0}) => {
    console.log("pageParams",pageParams)
  return await axios.get("https://pokeapi.co/api/v2/pokemon", {
    params: {
      limit: 30,
      offset: pageParams
    }
  })
  .then((res)=>res.data)
  }


const {data, fetchNextPage, hasNextPage} = useInfiniteQuery(["InfinitePokemon"], getAllPokemon, {
  //무한스크롤의 핵심이다. getNextPageParam 메서드가 falsy한 값을 반환하면 추가 fetch 실행하지 않음
  //falsy하지 않은 값을 return 할 경우 Number를 리턴해야함 fetch calback의 인자로 자동으로 PageParam을 전달
  getNextPageParam: (lastPage, allPages) => {
    // console.log("lastPage", lastPage)
    const nextpage = lastPage.next;
    if(!nextpage) return false;
   return   +Number(new URL(nextpage).searchParams.get("offset")) 
  }
})


  return (
    <>
      {data?.pages.map((page, index)=>(
        <div key={index}>
          {page.results.map((pokemon:Pokemon)=>{
                 const { name, url } = pokemon
                 const id = url.split("/")[6]
              return  <PokemonCard key={name} id={id} name={name}/>
          })}
        </div>
      ) 
      )}
      <button onClick={()=> fetchNextPage()}>다음페이지</button>
          
      

    </>
  )
}
