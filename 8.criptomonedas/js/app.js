// Instanciar ambas clases

const cotizador = new Cotizador();
const ui = new Interfaz();

// obtener el formulario
const formulario = document.getElementById('formulario');
// Event Listener cuando se envía el formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // leer la moneda seleccionada
    const monedaSelect = document.getElementById('moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    // Leer la criptomoneda seleccionada
    const criptoMonedaSelect = document.getElementById('criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    // Comprobar que ambos campos tengan datos
    if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        // Faltan datos, imprimir alerta
        ui.mostrarMensaje('Ambos campos son obligatorios', 'deep-orange darken-4 card-panel');
    } else {
        // Todo correcto, tomar valores del select y ejecutar la busqueda
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data => {

                ui.mostrarResultado(data.resultado[0], monedaSeleccionada.toLowerCase());
            })
    }
})