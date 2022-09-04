const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCw05fUBPwmpu-ehXFMqfdMw&part=snippet%2Cid&order=date&maxResults=9";

const content = null || document.getElementById("content");

//obtuvimos grcias a la api https://rapidapi.com/ytdlfree/api/youtube-v31/
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    "X-RapidAPI-Key": "c68edbdba9mshc3cb6eb8038f3b2p1f444ajsna5de19fe1256",
  },
};

//FUNCTION ASYNC
async function fetchData(urlApi) {
    //usa el metodo fetch con url y opciones
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async() => {
  try{
    //crea una variable que almacene la rpta de la peticion(50 videos)
    const videos=await fetchData(API);
    let view=
      //creamos una variable que capture el arreglo que viene de videos(items)
    `
      ${videos.items.map(video=>//video.items es un arreglo, crea un nuevo array que es video con su nueva estructura
        `
        <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
        </div>
      `).slice(0,8).join('')} 
      `;//devuelve la copia de los 4 primeros elementos del array y con join unimos esos elementos en una cadena
      content.innerHTML=view;//insertamos como html a view en el content
    } catch(error){
      console.log(error);
    }
  })();//gracias a estos parentesis, podemos ejecutar la funcion sin llamarla posteriormente
