import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Encabezado } from './src/components/Encabezado';
import { FormularioTarea } from './src/components/FormularioTarea';
import { ListaTareas } from './src/components/ListaTareas';
import { useTareas } from './src/hooks/useTareas';
import { theme } from './src/theme';

/**
 * Pantalla principal: barra superior, formulario y lista.
 *
 * Es la única parte que conoce tanto el estado como la interfaz, así que es la
 * que decide qué se está editando y qué pasa cuando el usuario guarda o
 * elimina. Los componentes de abajo no toman esas decisiones: solo avisan.
 */
export default function App() {
  const { tareas, agregarTarea, editarTarea, eliminarTarea } = useTareas();

  /* Se guarda el identificador y no la tarea: si la lista cambia, el objeto se
     vuelve a buscar y nunca queda una copia desactualizada en pantalla. */
  const [idEnEdicion, setIdEnEdicion] = useState<string | null>(null);
  const tareaEnEdicion = idEnEdicion
    ? tareas.find((tarea) => tarea.id === idEnEdicion) ?? null
    : null;

  const subtitulo =
    tareas.length === 1 ? '1 tarea pendiente' : `${tareas.length} tareas pendientes`;

  function guardarTarea(titulo: string, descripcion: string) {
    if (tareaEnEdicion) {
      editarTarea(tareaEnEdicion.id, titulo, descripcion);
      setIdEnEdicion(null);
      return;
    }
    agregarTarea(titulo, descripcion);
  }

  /* El borrado se confirma antes de ejecutarse: no tiene deshacer. */
  function solicitarEliminar(id: string) {
    const tarea = tareas.find((candidata) => candidata.id === id);
    if (!tarea) {
      return;
    }
    Alert.alert(
      'Eliminar tarea',
      `¿Seguro que quieres eliminar "${tarea.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            eliminarTarea(id);
            /* Si se borraba la tarea en edición, el formulario vuelve a agregar. */
            if (id === idEnEdicion) {
              setIdEnEdicion(null);
            }
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={estilos.pantalla}>
      <StatusBar style="dark" />
      {/*
        En iOS el teclado se superpone al contenido. KeyboardAvoidingView reduce
        el espacio disponible mientras el teclado está abierto, para que el
        formulario no quede tapado.
      */}
      <KeyboardAvoidingView
        style={estilos.area}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={estilos.marco}>
          <Encabezado titulo="Mis tareas" subtitulo={subtitulo} />
          <FormularioTarea
            tareaEnEdicion={tareaEnEdicion}
            onGuardar={guardarTarea}
            onCancelar={() => setIdEnEdicion(null)}
          />
          <ListaTareas
            tareas={tareas}
            idEnEdicion={idEnEdicion}
            onEditar={setIdEnEdicion}
            onEliminar={solicitarEliminar}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: theme.colores.fondo,
  },
  area: {
    flex: 1,
  },
  /*
    Responsive: el contenido se centra y no supera un ancho máximo, de modo que
    en tablet o escritorio las líneas siguen siendo legibles en lugar de
    estirarse de borde a borde.
  */
  marco: {
    flex: 1,
    width: '100%',
    maxWidth: theme.layout.anchoMaximo,
    alignSelf: 'center',
  },
});
