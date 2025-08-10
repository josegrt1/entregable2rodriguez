// LOCALSTORAGE HELPERS
const KEY = "viajes";

export function guardarHistorial(historial) {
  localStorage.setItem(KEY, JSON.stringify(historial));
}

export function cargarHistorial() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function limpiarHistorial() {
  localStorage.removeItem(KEY);
}
