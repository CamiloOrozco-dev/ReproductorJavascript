let canciones = [

    {
        nombre:"HYAENA",
        artista:"Travis Scott",
        portada: "img/Travis_Scott_-_Utopia.png",
        url:"/music/y2mate.com - HYAENA.mp3"

},
    {
        nombre:"MODERM JAM",
        artista:"Travis Scott",
        portada: "img/Travis_Scott_-_Utopia.png",
        url:"music/y2mate.com - MODERN JAM.mp3"

},
    {
        nombre:"MY EYES",
        artista:"Travis Scott",
        portada: "img/Travis_Scott_-_Utopia.png",
        url:"music/y2mate.com - MY EYES.mp3"

},
    {
        nombre:"THANK GOD",
        artista:"Travis Scott",
        portada: "img/Travis_Scott_-_Utopia.png",
        url:"/music/y2mate.com - HYAENA.mp3"

}
]


function mostrarPlaylist (){

      let x = document.querySelector('.playlist');
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    
    
        
}