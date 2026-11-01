import { FlatList, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { Tarea } from '../types/tarea';
import { ItemTarea } from './ItemTarea';

interface Props {
  tareas: Tarea[];
  idEnEdicion: string | null;
  onEditar: (id: string) => void;
  onEliminar: (id: string) => void;
}

/**
 * Lista de tareas. Equivale a `ion-list`: recibe los datos y los proyecta en
 * elementos. No sabe de dónde vienen ni cómo se modifican, así que puede
 * reutilizarse con cualquier origen de datos.
 */
export function ListaTareas({ tareas, idEnEdicion, onEditar, onEliminar }: Props) {
  if (tareas.length === 0) {
    return (
      <View style={estilos.vacio}>
        <Text style={estilos.vacioTexto}>Todavía no hay tareas pendientes.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tareas}
      keyExtractor={(tarea) => tarea.id}
      renderItem={({ item }) => (
        <ItemTarea
          tarea={item}
          enEdicion={item.id === idEnEdicion}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      )}
      ItemSeparatorComponent={Separador}
      contentContainerStyle={estilos.contenido}
      /* Permite pulsar los botones aunque el teclado esté abierto. */
      keyboardShouldPersistTaps="handled"
      /* Al arrastrar la lista se cierra el teclado: deja ver más contenido. */
      keyboardDismissMode="on-drag"
    />
  );
}

function Separador() {
  return <View style={estilos.separador} />;
}

const estilos = StyleSheet.create({
  contenido: {
    paddingHorizontal: theme.espaciado.md,
    paddingBottom: theme.espaciado.xl,
  },
  separador: {
    height: theme.espaciado.sm,
  },
  vacio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.espaciado.xl,
  },
  vacioTexto: {
    fontSize: theme.tipografia.cuerpo,
    textAlign: 'center',
    color: theme.colores.textoSecundario,
  },
});
