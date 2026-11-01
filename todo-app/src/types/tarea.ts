/**
 * Una tarea pendiente.
 *
 * `id` existe para poder distinguir una tarea concreta del resto: sin él no
 * habría forma de saber cuál editar o cuál eliminar.
 */
export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
}
