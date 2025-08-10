// ====== DATOS ======
const origenes = ["Rosario", "Mendoza", "Neuquén", "Tucumán"];
const preciosOrigen = {
  "Rosario": 25000,
  "Mendoza": 40000,
  "Neuquén": 35000,
  "Tucumán": 30000
};

const destinos = ["Buenos Aires", "Córdoba", "Bariloche", "Salta"];
const preciosBase = {
  "Buenos Aires": 50000,
  "Córdoba": 60000,
  "Bariloche": 90000,
  "Salta": 75000
};

const precioHotelPorDia = 15000;
let historialViajes = [];

// ====== DOM ======
const selectOrigen = document.getElementById("origen");
const selectDestino = document.getElementById("destino");
const inputDias = document.getElementById("dias");
const inputHotel = document.getElementById("hotel");
const formulario = document.getElementById("formularioViaje");
const seccionResultado = document.getElementById("resultado");
const listaHistorial = document.getElementById("historial");
const btnBorrarHistorial = document.getElementById("borrarHistorial");


// ====== CARGAR SELECTS DINÁMICAMENTE ======
function cargarOpciones(select, opciones) {
  opciones.forEach(opcion => {
    const opt = document.createElement("option");
    opt.value = opcion;
    opt.textContent = `${opcion} – $${(preciosOrigen[opcion] || preciosBase[opcion]).toLocaleString()}`;
    select.appendChild(opt);
  });
}

cargarOpciones(selectOrigen, origenes);
cargarOpciones(selectDestino, destinos);

// ====== FUNCIÓN DE CÁLCULO ======
function calcularCostoTotal(origen, destino, dias, incluyeHotel) {
  const costoOrigen = preciosOrigen[origen];
  const costoDestino = preciosBase[destino];
  const costoHotel = incluyeHotel ? precioHotelPorDia * dias : 0;
  const total = costoOrigen + costoDestino + costoHotel;

  return {
    total,
    costoOrigen,
    costoDestino,
    costoHotel
  };
}

// ====== GUARDAR EN LOCALSTORAGE ======
function guardarHistorial() {
  localStorage.setItem("viajes", JSON.stringify(historialViajes));
}

function cargarHistorial() {
  const datos = localStorage.getItem("viajes");
  if (datos) {
    historialViajes = JSON.parse(datos);
    mostrarHistorial();
  }
}

// ====== MOSTRAR RESULTADO ======
function mostrarResultado(viaje, costos) {
  seccionResultado.innerHTML = `
    <h2>📍 Resumen del viaje</h2>
    <p><strong>Origen:</strong> ${viaje.origen} – $${costos.costoOrigen.toLocaleString()}</p>
    <p><strong>Destino:</strong> ${viaje.destino} – $${costos.costoDestino.toLocaleString()}</p>
    <p><strong>Días:</strong> ${viaje.dias}</p>
    <p><strong>Incluye hotel:</strong> ${viaje.hotel ? "Sí" : "No"}</p>
    ${viaje.hotel ? `<p><strong>Costo hotel:</strong> $${costos.costoHotel.toLocaleString()}</p>` : ""}
    <p><strong>💰 Total estimado:</strong> $${costos.total.toLocaleString()}</p>
  `;
}

// ====== MOSTRAR HISTORIAL ======
function mostrarHistorial() {
  listaHistorial.innerHTML = "";
  historialViajes.forEach((viaje, index) => {
    const item = document.createElement("li");
    item.textContent = `${index + 1}. ${viaje.origen} ➝ ${viaje.destino} | ${viaje.dias} días | Hotel: ${viaje.hotel ? "Sí" : "No"}`;
    listaHistorial.appendChild(item);
  });
}

// ====== MANEJAR FORMULARIO ======
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const origen = selectOrigen.value;
  const destino = selectDestino.value;
  const dias = parseInt(inputDias.value);
  const hotel = inputHotel.checked;

  if (!origen || !destino || isNaN(dias) || dias < 1) {
    alert("Por favor completá todos los campos correctamente.");
    return;
  }

  const costos = calcularCostoTotal(origen, destino, dias, hotel);
  const viaje = { origen, destino, dias, hotel };

  historialViajes.push(viaje);
  guardarHistorial();
  mostrarResultado(viaje, costos);
  mostrarHistorial();
});

// ====== INICIALIZAR ======
cargarHistorial();

btnBorrarHistorial.addEventListener("click", () => {
  if (confirm("¿Estás seguro de que querés borrar todo el historial de viajes?")) {
    historialViajes = [];
    localStorage.removeItem("viajes");
    mostrarHistorial();
    seccionResultado.innerHTML = "";
  }
});
