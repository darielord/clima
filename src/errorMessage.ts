import type { ApiError } from "./types";

export function errorMessage(error: ApiError): string {
  switch (error.kind) {
    case "network":
      return "Error de conexion";
    case "http":
      if (error.status === 404) {
        return "no se encontro";
      } else if (error.status === 429) {
        return "demasiadas peticiones, espere";
      }
      return `error ${error.status} `;

    case "invalid-data":
      return "Formato inesperado";

    default:
      const nev: never = error;
      throw new Error(nev);
  }
}
