const imgPokemon = document.getElementById("pokemon"); //espacio para la imagen
const informacion = document.getElementById("informacion");//espacio para la info
const templateImg = document.getElementById("template-img").content;
const templateInfo = document.getElementById("template-info").content;
const framgent = document.createDocumentFragment();

//cuando carga el html se hace el pedido a la api
document.addEventListener("DOMContentLoaded", () => {
    elegirPokemon();
  });

  //escribir el pokemon elegido
  const elegirPokemon =  () =>{
    const nombrePokemon = document.getElementById("nombre-pokemon"); 
    const btnPokemon = document.getElementById("btn-pokemon");
    btnPokemon.addEventListener("click", () => {
        imgPokemon.innerHTML = "";
        informacion.innerHTML = "";
        const pokemonElegido = nombrePokemon.value.toLowerCase(); 
        fetchData(pokemonElegido);
        nombrePokemon.value = "";  
    })   
    
}
//pedido api
  const fetchData = async(idNombre) => {
     try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idNombre}`)
        const data = await res.json();
        pintarpokemon(data);
        pintarInformacion(data);
     }
     catch(error){
        console.log(error);
     }
  }

//hacer visible la imagen y datos
  const pintarpokemon = (pokemon) =>{
      const clone = templateImg.cloneNode(true);
      clone.querySelector(".img-poke").setAttribute("src", pokemon.sprites.other.dream_world.front_default);
      framgent.appendChild(clone)
      imgPokemon.appendChild(framgent)
  }
  
  const pintarInformacion = (pokemon) =>{
    const clone = templateInfo.cloneNode(true);
    clone.getElementById("nombre").textContent = pokemon.name; 
    clone.getElementById("hp").textContent = `Hp: ${pokemon.stats[0].base_stat}`;
    clone.getElementById("tipo").textContent = `Tipo: ${pokemon.types[0].type.name}`;
    clone.getElementById("ataque").textContent = `Ataque: ${pokemon.stats[1].base_stat}`;
    clone.getElementById("defensa").textContent = `Defensa: ${pokemon.stats[2].base_stat}`;
    clone.getElementById("Velocidad").textContent = `Velocidad: ${pokemon.stats[5].base_stat}`;
    framgent.appendChild(clone)
    informacion.appendChild(framgent);
  }



