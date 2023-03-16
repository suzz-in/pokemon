import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import PokemonCard from '@/components/cards/PokemonCard'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 
  
  const getAllPokemon = async () => {
  return await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")
  }

const {data: pokemonList} = useQuery(["pokemon"],()=>(getAllPokemon()) )
  console.log(pokemonList)
  return (
    <>
      {pokemonList?.data.results.map((pokemon)=>{
        console.log(pokemon)
               const { name, url } = pokemon
               const id = url.split("/")[6]
            return  <PokemonCard key={name} id={id} name={name}/>
      }
 )}
    </>
  )
}
