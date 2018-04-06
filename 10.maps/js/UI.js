class UI {
    constructor() {
        // Instanciar la API
        this.api = new API();

        // Iniciar el mapa
        this.inicializarMapa();
    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        this.latLng = { lat: 19.390519, lng: -99.3739778 };

        this.mapa = new google.maps.Map(document.getElementById('mapa'), {
            center: this.latLng,
            zoom: 6
        });
    }

    // Mostrar Establecimientos de la api
    mostrarEstablecimientos() {
            this.api.obtenerDatos()
                .then(datos => {
                    const resultado = datos.respuestaJSON.results;

                    // Muestra los pines en el Mapa
                    this.mostrarMapa(resultado);
                })
        }
        // Muestra los pines
    mostrarMapa(datos) {
            // Almacena InfoWindow Activo
            let infoWindowActivo;

            // Recorrer establecimientos
            datos.forEach(dato => {
                // Destucturing 
                let { latitude, longitude, calle, regular, premium } = dato;

                // Crear objeto con latitud y longitud
                let latLng = {
                    lat: Number(latitude),
                    lng: Number(longitude)
                }

                // Agregar el Pin
                let marker = new google.maps.Marker({
                    position: latLng,
                    map: this.mapa
                });
                // Crear infoWindow

                let infoWindow = this.crearInfoWindow(calle, regular, premium);

                // Mostrar InfoWindow al hacer click
                marker.addListener('click', () => {
                    // Cerrar infoWindowActivo
                    if (infoWindowActivo) {
                        infoWindowActivo.close();
                    }

                    // Mostrarlo
                    infoWindow.open(this.mapa, marker);

                    // Asignarlo a activo
                    infoWindowActivo = infoWindow;
                })

            })
        }
        // Crear el infowindow
    crearInfoWindow(calle, regular, premium) {
        // Crear InfoWindow
        let contenido = `
              <p>Domicilio: ${calle}  </p>
              <p>Precio Regular: $${regular} </p>
              <p>Precio Premium: $${premium} </p>
         `;
        let infoWindow = new google.maps.InfoWindow({
            content: contenido
        });
        return infoWindow;
    }

    // Obtiene las sugerencias de la rest api
    obtenerSugerencias(busqueda) {
        this.api.obtenerDatos()
            .then(datos => {
                // Obtener los resultados
                const resultados = datos.respuestaJSON.results;

                // Enviar el JSON y la busqueda al filtro
                this.filtrarSugerencias(resultados, busqueda);
            })

    }

    // Filtrar las sugerencias de busqueda
    filtrarSugerencias(resultados, busqueda) {
        const filtro = resultados.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);

        // Iniciar el mapa
        this.inicializarMapa();

        // Mostrar pines del filter
        this.mostrarMapa(filtro);
    }

}