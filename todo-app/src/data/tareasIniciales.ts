import { Tarea } from '../types/tarea';

/**
 * Tareas de ejemplo para comprobar el render de la lista mientras no existe un
 * origen de datos real. En la Unidad 2 esto se reemplaza por almacenamiento
 * local, sin tocar los componentes.
 */
export const tareasIniciales: Tarea[] = [
  {
    id: '1',
    titulo: 'Revisar la rúbrica',
    descripcion: 'Confirmar qué evalúa cada indicador de la Unidad 1.',
  },
  {
    id: '2',
    titulo: 'Probar en el teléfono',
    descripcion: 'Abrir el proyecto con Expo Go y verificar que la lista se muestra.',
  },
];
