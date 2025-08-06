// src/types/Usuario.ts

export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  telefono?: string;
  direccion?: {
    calle?: string;
    fraccionamiento?: string;
    cp?: string;
    ciudad?: string;
    provinciaEstado?: string;
    pais?: string;
  };
}