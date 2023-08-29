import { useEffect, useState } from "react";
import api from '../../services/api';
import {} from 'react-router-dom';
import './home.css'
import {Link} from 'react-router-dom'

//URL DA API: https://api.themoviedb.org/3/movie/343611?api_key=b12c1ff8fbe4bcb3a2afda3d2623c00d&language=pt-BR

function Home(){
    //começa com array filmes vazio
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        //Toda vez que abrir, chama o useEffect
        async function loadFilmes(){
            //buscar API / await = esperar requisição
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "b12c1ff8fbe4bcb3a2afda3d2623c00d",
                    language: "pt-BR",
                    page: 1,
                }
            }) //buscar informações
    
            //console.log(response.data.results.slice(0, 10));
            setFilmes(response.data.results.slice(0, 10))
        
        }

        loadFilmes();

    }, [])

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;