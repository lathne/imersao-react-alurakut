import algumacoisa, { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    
    if(request.method === 'POST'){
        const TOKEN = '249b5ba06bf04902a239198eee3532'
        const client = new SiteClient(TOKEN);

        //Validar os Dados antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "966839",
            // id do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/lathne.png",
            // creatorSlug: "lathne"
        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }   
  response.status(404).json({
      message: 'Ainda não temos nada do GET, mas no POST tem!'
  })
}