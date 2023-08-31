import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import { toast } from 'react-toastify';


function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "b12c1ff8fbe4bcb3a2afda3d2623c00d",
                    language: "pt-BR",
                }
            })

//Quando é uma promise: pode ter acesso
//Tretativa para mostrar apenas filmes existes, se não existir 

            //função anonima, se em caso de sucesso: cai na aba do filme existente
            .then((response)=>{  //resposta com todo o filme
                setFilme(response.data);
                setLoading(false);
            })
            //errado: não encontrou filme
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/", {replace: true}) //redireciona pra pag home
                return;
            })
        }
        loadFilme();

        return () =>
            console.log("COMPONENTE DESMONTADO")

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@nicflix"); //pegar filmes da lista

        let filmesSalvos = JSON.parse(minhaLista) || []; //verificar se a lista existe, if = array vazio
        
        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id) //verificar se não está duplicando filmes salvos

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@nicflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

//pegar id > fazer requisição

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
        
        <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>
        </div>    
        </div>
        //target blank - abrir em nova guia

    )
}

export default Filme;
