import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {  AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/Alurakutcommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(propriedades) {

  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
      @{propriedades.githubUser}
      </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">  
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image}/>
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {
  
  const usuarioAleatorio = 'lathne';
  const [comunidades,setComunidades] = React.useState([]);
  const usuarios = [
    'lathne',
    'karen-freitas',
    'caxconte',
    'jenniferpessoa',
    'Tauana-Pacheco',
    'lizianegarcia'
  ]

  
  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o array de dados do github
  React.useEffect(function () {
    fetch("https://api.github.com/users/lathne/following")
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'ab09bcabd48fde0be15892352cce16',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) //Pega o retorno do response.json() e ja retorna
    
    .then((respostaCompleta) => {
      const comunidadesVindasdoDato = respostaCompleta.data.allCommunities;
      console.log(respostaCompleta.data)
      console.log(comunidadesVindasdoDato)
      setComunidades(comunidadesVindasdoDato)
    })
  }, []) //array vazio aqui pois queremos que rode só uma vez
  
    

  // console.log('seguidores antes do return', seguidores)
      
  // 1 - Criar um box que vai ter um map, baseado nos itens do array que pegamos do github


  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
            Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
           <h2 className="subTitle">Sua próxima viagem começa aqui</h2>
           <form onSubmit={function handleCriaComunidade(e) {
             e.preventDefault();
             const dadosDoForm = new FormData(e.target);

            const comunidade = {
              title: dadosDoForm.get('title'),
              imageUrl: dadosDoForm.get('image'),
              creatorSlug: usuarioAleatorio,
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade]
                setComunidades(comunidadesAtualizadas);
            })

       
           }}>
             <div>
              <input 
                  placeholder="Para onde deseja viajar?"
                  name="title" 
                  aria-label="Para onde deseja viajar?"
                  type="text"
                />
              </div>
              <div>
              <input 
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                />
              </div>

              <button>
                Criar comunidade
              </button>
           </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({usuarios.length})
            </h2>
            <ul>
                {usuarios.map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                    </li>
                  )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">  
              Comunidades ({comunidades.length})
            </h2>
            <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                <a href={`/communities/${itemAtual.id}`}>
                  <img src={itemAtual.imageUrl}/>
                  <span>{itemAtual.title}</span>
                </a>
                </li>
              )
            })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div> 
      </MainGrid>
    </>
    )
}
