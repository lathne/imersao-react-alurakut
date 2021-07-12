
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {  AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/Alurakutcommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades) {
  console.log(propriedades)
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}


export default function Home() {
  const usuarioAleatorio = 'lathne';
  const usuarios = [
    'lathne',
    'karen-freitas',
    'caxconte',
    'jenniferpessoa',
    'Tauana-Pacheco',
    'lizianegarcia'
  ]

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
            O que você deseja fazer?
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">  
              Amigos ({usuarios.length})
            </h2>
            <ul>
            {usuarios.map((itemAtual) => {
              return (
                <li>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`}/>
                  <span>{itemAtual}</span>
                </a>
                </li>
              )
            })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div> 
      </MainGrid>
    </>
    )
}
