import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../theme';
import { Tarea } from '../types/tarea';

interface Props {
  /** Tarea que se está editando; si es `null`, el formulario agrega. */
  tareaEnEdicion: Tarea | null;
  onGuardar: (titulo: string, descripcion: string) => void;
  onCancelar: () => void;
}

/**
 * Formulario de tareas. Equivale a los `ion-input` más el `ion-button` de
 * guardado, y cumple dos funciones: agregar una tarea nueva y editar una
 * existente. Se reutiliza el mismo formulario para ambas, de modo que solo
 * exista una forma de escribir una tarea.
 *
 * Es un formulario controlado: el texto de los campos vive en su propio estado
 * (`useState`). Sin ese estado no podríamos limpiar los campos al guardar, que
 * es justamente lo que pide el enunciado.
 */
export function FormularioTarea({ tareaEnEdicion, onGuardar, onCancelar }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  /* El tipo del ref se toma del propio componente: React Native 0.88 ya no
     expone TextInput como una clase. */
  const campoDescripcion = useRef<ComponentRef<typeof TextInput>>(null);

  const editando = tareaEnEdicion !== null;
  const puedeGuardar = titulo.trim().length > 0;

  /*
   * Al entrar en modo edición, los campos se cargan con los datos de la tarea
   * elegida. Es la sincronización entre lo que la pantalla decidió ("se está
   * editando esta tarea") y lo que el formulario muestra.
   */
  useEffect(() => {
    if (tareaEnEdicion) {
      setTitulo(tareaEnEdicion.titulo);
      setDescripcion(tareaEnEdicion.descripcion);
      return;
    }
    /*
     * Al salir del modo edición —por ejemplo, si se eliminó la tarea que se
     * estaba editando— los campos vuelven a quedar vacíos. Sin esto, el
     * formulario conservaría el texto de una tarea que ya no existe.
     */
    setTitulo('');
    setDescripcion('');
  }, [tareaEnEdicion]);

  function limpiar() {
    setTitulo('');
    setDescripcion('');
  }

  function guardar() {
    if (!puedeGuardar) {
      return;
    }
    onGuardar(titulo.trim(), descripcion.trim());
    limpiar();
  }

  function cancelar() {
    limpiar();
    onCancelar();
  }

  return (
    <View style={estilos.contenedor}>
      {editando ? <Text style={estilos.aviso}>Editando tarea</Text> : null}

      <TextInput
        style={estilos.campo}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título de la tarea"
        placeholderTextColor={theme.colores.textoSecundario}
        accessibilityLabel="Título de la tarea"
        returnKeyType="next"
        onSubmitEditing={() => campoDescripcion.current?.focus()}
      />
      <TextInput
        ref={campoDescripcion}
        style={[estilos.campo, estilos.campoSegundo]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción (opcional)"
        placeholderTextColor={theme.colores.textoSecundario}
        accessibilityLabel="Descripción de la tarea"
        returnKeyType="done"
        onSubmitEditing={guardar}
      />

      <View style={estilos.acciones}>
        <Pressable
          onPress={guardar}
          disabled={!puedeGuardar}
          accessibilityRole="button"
          accessibilityLabel={editando ? 'Guardar cambios de la tarea' : 'Guardar tarea'}
          accessibilityState={{ disabled: !puedeGuardar }}
          hitSlop={theme.espaciado.sm}
          style={({ pressed }) => [
            estilos.boton,
            estilos.botonPrimario,
            !puedeGuardar && estilos.botonInactivo,
            pressed && puedeGuardar && estilos.botonPresionado,
          ]}
        >
          <Text style={[estilos.botonTexto, !puedeGuardar && estilos.botonTextoInactivo]}>
            {editando ? 'Guardar cambios' : 'Guardar tarea'}
          </Text>
        </Pressable>

        {editando ? (
          <Pressable
            onPress={cancelar}
            accessibilityRole="button"
            accessibilityLabel="Cancelar la edición"
            hitSlop={theme.espaciado.sm}
            style={({ pressed }) => [
              estilos.boton,
              estilos.botonSecundario,
              pressed && estilos.botonPresionado,
            ]}
          >
            <Text style={estilos.botonTextoSecundario}>Cancelar</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    paddingHorizontal: theme.espaciado.md,
    paddingBottom: theme.espaciado.md,
  },
  aviso: {
    marginBottom: theme.espaciado.sm,
    fontSize: theme.tipografia.subtitulo,
    fontWeight: theme.peso.medio,
    color: theme.colores.primario,
  },
  campo: {
    minHeight: theme.layout.toqueMinimo,
    backgroundColor: theme.colores.superficie,
    borderWidth: 1,
    borderColor: theme.colores.borde,
    borderRadius: theme.radios.sm,
    paddingHorizontal: theme.espaciado.md,
    paddingVertical: theme.espaciado.sm,
    fontSize: theme.tipografia.cuerpo,
    color: theme.colores.texto,
  },
  campoSegundo: {
    marginTop: theme.espaciado.sm,
  },
  acciones: {
    flexDirection: 'row',
    gap: theme.espaciado.sm,
    marginTop: theme.espaciado.sm,
  },
  boton: {
    flex: 1,
    minHeight: theme.layout.toqueMinimo,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radios.sm,
  },
  botonPrimario: {
    backgroundColor: theme.colores.primario,
  },
  botonSecundario: {
    backgroundColor: theme.colores.superficie,
    borderWidth: 1,
    borderColor: theme.colores.borde,
  },
  botonInactivo: {
    backgroundColor: theme.colores.borde,
  },
  botonPresionado: {
    opacity: 0.85,
  },
  botonTexto: {
    fontSize: theme.tipografia.cuerpo,
    fontWeight: theme.peso.medio,
    color: theme.colores.superficie,
  },
  botonTextoInactivo: {
    color: theme.colores.textoSecundario,
  },
  botonTextoSecundario: {
    fontSize: theme.tipografia.cuerpo,
    fontWeight: theme.peso.medio,
    color: theme.colores.texto,
  },
});
