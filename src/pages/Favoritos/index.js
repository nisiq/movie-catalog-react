import './favoritos.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Favoritos(){
    const [filmes, setFilmes] = useState([])
    useEffect(()=>{
        const minhaLista = localStorage.getItem("@nicflix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])
    
    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id) //retornando todos que sao diferentes do que foi clicado
        })  //filtrar todos filmes e retirar o que foi clicado
    
        setFilmes(filtroFilmes);
        localStorage.setItem("@nicflix", JSON.stringify(filtroFilmes))  //salvar no localstorage
        toast.success("Filme Removido com Sucesso!")
    }



    return(
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo =( </span>}

            <ul>
                {filmes.map((item) =>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default Favoritos;