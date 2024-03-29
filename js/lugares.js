lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
    var autocompleta;
    var circulo = new google.maps.Circle( {
      center: posicionCentral,
      radius: 20000
    });

    var camposDeTexto = [];
    camposDeTexto.push(document.getElementById('direccion'));
    camposDeTexto.push(document.getElementById('desde'));
    camposDeTexto.push(document.getElementById('hasta'));
    camposDeTexto.push(document.getElementById('agregar'));
    var limites = circulo.getBounds();

    for (var i = 0; i < camposDeTexto.length; i++) {
      autocompleta = new google.maps.places.Autocomplete(camposDeTexto[i], {bounds: limites});
    }
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
        /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */
    var tipoDeLugar = $("#tipoDeLugar :selected").val();
    var radio = $("#radio").val();
    var restringirBusqueda = {
      location: posicion,
      radius: radio,
      types: [tipoDeLugar]
    };
    servicioLugares.nearbySearch(restringirBusqueda, function(results, status){
      marcadorModulo.marcarLugares(results, status);
    });

  }
  return {
    inicializar,
    buscarCerca
  }
})()
