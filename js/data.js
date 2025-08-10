// DATA + LÓGICA PURA
export const origenes = ["Rosario", "Mendoza", "Neuquén", "Tucumán"];
export const preciosOrigen = {
  "Rosario": 25000, "Mendoza": 40000, "Neuquén": 35000, "Tucumán": 30000
};

export const destinos = ["Buenos Aires", "Córdoba", "Bariloche", "Salta"];
export const preciosBase = {
  "Buenos Aires": 50000, "Córdoba": 60000, "Bariloche": 90000, "Salta": 75000
};

export const precioHotelPorDia = 15000;

export function calcularCostoTotal(origen, destino, dias, incluyeHotel) {
  const costoOrigen = preciosOrigen[origen] ?? 0;
  const costoDestino = preciosBase[destino] ?? 0;
  const costoHotel = incluyeHotel ? precioHotelPorDia * dias : 0;
  const total = costoOrigen + costoDestino + costoHotel;
  return { total, costoOrigen, costoDestino, costoHotel };
}
