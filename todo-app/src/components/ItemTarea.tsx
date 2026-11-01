import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { Tarea } from '../types/tarea';

interface Props {
  tarea: Tarea;
  enEdicion: boolean;
  onEditar: (id: string) => void;
  onEliminar: (id: string) => void;
}

/**
 * Una tarea dentro de la lista. Equivale al `ion-item`: presenta el título y la
 * descripción de una tarea, y ofrece las acciones disponibles sobre ella.
 *
 * Sigue siendo un componente de presentación: no modifica la tarea, solo avisa
 * mediante `onEditar` y `onEliminar` que el usuario pulsó una acción.
 */
export function ItemTarea({ tarea, enEdicion, onEditar, onEliminar }: Props) {
  return (
    <View style={[estilos.contenedor, enEdicion && estilos.contenedorEnEdicion]}>
      <Text style={estilos.titulo}>{tarea.titulo}</Text>
      {tarea.descripcion ? (
        <Text style={estilos.descripcion}>{tarea.descripcion}</Text>
      ) : null}

      <View style={estilos.acciones}>
        <Pressable
          onPress={() => onEditar(tarea.id)}
          accessibilityRole="button"
          accessibilityLabel={`Editar la tarea ${tarea.titulo}`}
          hitSlop={theme.espaciado.sm}
          style={({ pressed }) => [estilos.accion, pressed && estilos.accionPresionada]}
        >
          <Text style={estilos.accionTexto}>Editar</Text>
        </Pressable>

        <Pressable
          onPress={() => onEliminar(tarea.id)}
          accessibilityRole="button"
          accessibilityLabel={`Eliminar la tarea ${tarea.titulo}`}
          hitSlop={theme.espaciado.sm}
          style={({ pressed }) => [estilos.accion, pressed && estilos.accionPresionada]}
        >
          <Text style={[estilos.accionTexto, estilos.accionPeligro]}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    backgroundColor: theme.colores.superficie,
    borderRadius: theme.radios.md,
    borderWidth: 1,
    borderColor: theme.colores.borde,
    padding: theme.espaciado.md,
  },
  /* La tarjeta que se está editando se resalta para no perder el contexto. */
  contenedorEnEdicion: {
    borderColor: theme.colores.primario,
    backgroundColor: theme.colores.acento,
  },
  titulo: {
    fontSize: theme.tipografia.cuerpo,
    fontWeight: theme.peso.medio,
    color: theme.colores.texto,
  },
  descripcion: {
    marginTop: theme.espaciado.xs,
    fontSize: theme.tipografia.secundario,
    lineHeight: 20,
    color: theme.colores.textoSecundario,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.espaciado.sm,
    marginTop: theme.espaciado.sm,
  },
  accion: {
    minHeight: 36,
    paddingHorizontal: theme.espaciado.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radios.sm,
  },
  accionPresionada: {
    opacity: 0.6,
  },
  accionTexto: {
    fontSize: theme.tipografia.secundario,
    fontWeight: theme.peso.medio,
    color: theme.colores.primario,
  },
  accionPeligro: {
    color: theme.colores.peligro,
  },
});
