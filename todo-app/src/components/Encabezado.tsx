import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface Props {
  titulo: string;
  subtitulo?: string;
}

/**
 * Barra superior de la pantalla. Equivale al `ion-header`: agrupa el título y
 * el contexto de la pantalla en un bloque separado del contenido.
 */
export function Encabezado({ titulo, subtitulo }: Props) {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    paddingHorizontal: theme.espaciado.md,
    paddingTop: theme.espaciado.md,
    paddingBottom: theme.espaciado.sm,
  },
  titulo: {
    fontSize: theme.tipografia.titulo,
    fontWeight: theme.peso.fuerte,
    color: theme.colores.texto,
  },
  subtitulo: {
    marginTop: theme.espaciado.xs,
    fontSize: theme.tipografia.subtitulo,
    color: theme.colores.textoSecundario,
  },
});
