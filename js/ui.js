// UI / DOM
const $ = (sel) => document.querySelector(sel);

const refs = {
  selectOrigen: $("#origen"),
  selectDestino: $("#destino"),
  inputDias:    $("#dias"),
  inputHotel:   $("#hotel"),
  formulario:   $("#formularioViaje"),
  seccionResultado: $("#resultado"),
  listaHistorial:   $("#historial"),
  btnBorrarHistorial: $("#borrarHistorial"),
  boxConfirm: $("#confirmarBorrado"),
  btnConfirmSi: $("#confirmarSi"),
  btnConfirmNo: $("#confirmarNo"),
  mensajes: $("#mensajes"),
};

export function getDOM() { return refs; }

export function cargarOpciones(select, opciones, mapaPrecios = {}) {
  opciones.forEach(opcion => {
    const opt = document.createElement("option");
    const precio = mapaPrecios[opcion] ?? 0;
    opt.value = opcion;
    opt.textContent = precio
      ? `${opcion} – $${precio.toLocaleString()}`
      : opcion;
    select.appendChild(opt);
  });
}

export function setMsg(tipo, texto) {
  const box = refs.mensajes;
  box.innerHTML = "";
  if (!texto) return;
  const p = document.createElement("p");
  p.className = `msg ${tipo}`;
  p.textContent = texto;
  box.appendChild(p);
}

export function clearInvalid() {
  [refs.selectOrigen, refs.selectDestino, refs.inputDias]
    .forEach(el => el.classList.remove("is-invalid"));
}
export function markInvalid(el) {
  el.classList.add("is-invalid");
  el.focus();
}

export function mostrarResultado(viaje, costos) {
  refs.seccionResultado.innerHTML = `
    <h2>📍 Resumen del viaje</h2>
    <p><strong>Origen:</strong> ${viaje.origen} – $${costos.costoOrigen.toLocaleString()}</p>
    <p><strong>Destino:</strong> ${viaje.destino} – $${costos.costoDestino.toLocaleString()}</p>
    <p><strong>Días:</strong> ${viaje.dias}</p>
    <p><strong>Incluye hotel:</strong> ${viaje.hotel ? "Sí" : "No"}</p>
    ${viaje.hotel ? `<p><strong>Costo hotel:</strong> $${costos.costoHotel.toLocaleString()}</p>` : ""}
    <p><strong>💰 Total estimado:</strong> $${costos.total.toLocaleString()}</p>
  `;
}

export function mostrarHistorial(historial) {
  refs.listaHistorial.innerHTML = "";
  historial.forEach((viaje, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${viaje.origen} ➝ ${viaje.destino} | ${viaje.dias} días | Hotel: ${viaje.hotel ? "Sí" : "No"}`;
    refs.listaHistorial.appendChild(li);
  });
}
