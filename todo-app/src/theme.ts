/**
 * Tokens de diseño de la aplicación.
 *
 * Centralizar colores, espaciados, radios y tipografía en un solo lugar evita
 * valores sueltos repartidos por los componentes y mantiene la interfaz
 * coherente: una misma jerarquía, un mismo ritmo y un mismo contraste.
 */
export const theme = {
  colores: {
    fondo: '#F1F5F9',
    superficie: '#FFFFFF',
    borde: '#E2E8F0',
    texto: '#0F172A',
    textoSecundario: '#64748B',
    primario: '#2563EB',
    acento: '#DBEAFE',
    peligro: '#DC2626',
  },
  espaciado: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radios: {
    sm: 8,
    md: 14,
    lg: 20,
  },
  tipografia: {
    titulo: 24,
    subtitulo: 14,
    cuerpo: 16,
    secundario: 14,
  },
  peso: {
    normal: '400',
    medio: '600',
    fuerte: '700',
  },
  /**
   * Reglas de adaptación de la interfaz (responsive).
   *
   * `anchoMaximo` evita que en pantallas grandes (tablet, escritorio) el
   * contenido se estire a lo ancho y las líneas se vuelvan incómodas de leer.
   * `toqueMinimo` fija el tamaño mínimo recomendado para un elemento táctil.
   */
  layout: {
    anchoMaximo: 720,
    toqueMinimo: 48,
  },
} as const;
