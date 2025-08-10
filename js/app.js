import {
  origenes, destinos, preciosOrigen, preciosBase,
  calcularCostoTotal
} from "./data.js";

import {
  guardarHistorial, cargarHistorial, limpiarHistorial
} from "./storage.js";

import {
  getDOM, cargarOpciones, setMsg, clearInvalid, markInvalid,
  mostrarResultado, mostrarHistorial
} from "./ui.js";

const {
  selectOrigen, selectDestino, inputDias, inputHotel,
  formulario, seccionResultado, listaHistorial,
  btnBorrarHistorial, boxConfirm, btnConfirmSi, btnConfirmNo
} = getDOM();

let historialViajes = [];

// Inicialización
cargarOpciones(selectOrigen, origenes, preciosOrigen);
cargarOpciones(selectDestino, destinos, preciosBase);

historialViajes = cargarHistorial();
mostrarHistorial(historialViajes);

// Validación
function validarFormulario() {
  clearInvalid();
  const origen = selectOrigen.value;
  const destino = selectDestino.value;
  const dias = parseInt(inputDias.value, 10);

  if (!origen)  { setMsg("error", "Seleccioná un origen.");  markInvalid(selectOrigen); return null; }
  if (!destino) { setMsg("error", "Seleccioná un destino."); markInvalid(selectDestino); return null; }
  if (origen === destino) { setMsg("error", "El origen y el destino no pueden ser iguales."); markInvalid(selectDestino); return null; }
  if (isNaN(dias) || dias < 1) { setMsg("error", "Ingresá una cantidad de días válida (mínimo 1)."); markInvalid(inputDias); return null; }

  setMsg("", "");
  return { origen, destino, dias };
}

// Eventos
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const vals = validarFormulario();
  if (!vals) return;

  const hotel = inputHotel.checked;
  const costos = calcularCostoTotal(vals.origen, vals.destino, vals.dias, hotel);
  const viaje = { ...vals, hotel };

  historialViajes.push(viaje);
  guardarHistorial(historialViajes);
  mostrarResultado(viaje, costos);
  mostrarHistorial(historialViajes);
  setMsg("exito", "✅ Simulación generada y guardada en tu historial.");
});

btnBorrarHistorial.addEventListener("click", () => {
  boxConfirm.classList.remove("hidden");
});
btnConfirmNo.addEventListener("click", () => {
  boxConfirm.classList.add("hidden");
  setMsg("info", "Operación cancelada.");
});
btnConfirmSi.addEventListener("click", () => {
  historialViajes = [];
  limpiarHistorial();
  mostrarHistorial(historialViajes);
  seccionResultado.innerHTML = "";
  boxConfirm.classList.add("hidden");
  setMsg("exito", "🗑️ Historial borrado correctamente.");
});
