import { useRef, useState } from 'react';
import { tareasIniciales } from '../data/tareasIniciales';
import { Tarea } from '../types/tarea';

/**
 * Encapsula el estado de la lista de tareas y las operaciones sobre ella.
 *
 * La pantalla consume este hook y no manipula la lista directamente: si más
 * adelante cambia el origen de los datos (por ejemplo, almacenamiento local),
 * el cambio queda contenido aquí y no se propaga a los componentes.
 *
 * Todas las operaciones devuelven una lista nueva en lugar de modificar la
 * existente. React detecta el cambio por la referencia del arreglo: si
 * mutáramos el mismo, la interfaz no se volvería a dibujar.
 */
export function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>(tareasIniciales);

  /**
   * Contador para asignar identificadores. Se guarda en una referencia y no en
   * estado porque no afecta a lo que se ve: solo necesitamos que no se repita.
   * Arranca después del último identificador ya usado por los datos de ejemplo.
   */
  const contador = useRef(tareasIniciales.length + 1);

  /**
   * Agrega una tarea al principio de la lista, para que la recién creada quede
   * a la vista sin necesidad de desplazarse.
   */
  function agregarTarea(titulo: string, descripcion: string) {
    const nueva: Tarea = {
      id: String(contador.current),
      titulo,
      descripcion,
    };
    contador.current += 1;
    setTareas((previas) => [nueva, ...previas]);
  }

  /**
   * Reemplaza el título y la descripción de la tarea indicada, conservando su
   * identificador y su posición en la lista.
   */
  function editarTarea(id: string, titulo: string, descripcion: string) {
    setTareas((previas) =>
      previas.map((tarea) =>
        tarea.id === id ? { ...tarea, titulo, descripcion } : tarea,
      ),
    );
  }

  /** Quita de la lista la tarea indicada. */
  function eliminarTarea(id: string) {
    setTareas((previas) => previas.filter((tarea) => tarea.id !== id));
  }

  return { tareas, agregarTarea, editarTarea, eliminarTarea };
}
