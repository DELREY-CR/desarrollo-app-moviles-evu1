# EVU1 — Aplicación de lista de tareas (React Native + Expo + TypeScript)

Evaluación sumativa de la **Unidad 1** de *Desarrollo de Aplicaciones Móviles* (IF206IINF), Instituto Profesional San Sebastián.

**Autor:** Cristopher López Montenegro · **Docente:** Boris Belmar

## Contenido del repositorio

| Archivo | Qué es |
|---|---|
| `EVU1_LOPEZ_CRISTOPHER.pdf` | Informe final, 20 páginas |
| `informe.md` | El informe en Markdown: la fuente del PDF |
| `todo-app/` | El proyecto de la aplicación |

## La aplicación

Es una lista de tareas pendientes. Permite **agregar** tareas (con título y descripción), **editarlas** y **eliminarlas**.

Las tareas viven en memoria: al cerrar la aplicación se pierden, porque el alcance de la Unidad 1 no incluye almacenamiento permanente.

## Cómo ejecutarla

Requiere Node.js 22 o superior.

```bash
cd todo-app
npm install
npx expo start
```

El comando publica la aplicación en `http://localhost:8081` y muestra un código QR. Para verla en un teléfono, instala **Expo Go** y escanea el código (teléfono y computador deben estar en la misma red Wi-Fi).

> **Nota sobre iPhone:** Expo Go en un iPhone físico exige que el teléfono y el computador estén autenticados con la misma cuenta de Expo. En Android, en el emulador de Android y en el simulador de iOS no aplica.

## Estructura del proyecto

```
todo-app/
├── App.tsx                  Pantalla principal
├── index.ts                 Punto de entrada
├── app.json                 Configuración
└── src/
    ├── theme.ts             Tokens de diseño (colores, espaciados, tipografía)
    ├── types/tarea.ts       Modelo de una tarea
    ├── data/                Origen de datos
    ├── hooks/useTareas.ts   Estado de la lista y operaciones
    └── components/          Encabezado, formulario, lista e ítem
```

## Tecnologías

| Pieza | Versión |
|---|---|
| React Native | 0.88.1 |
| Expo SDK | 58.0.22 |
| TypeScript | 6.0.3 |
| React | 19.3.0 |
| Node.js | 22.23.1 |

La elección de estas tecnologías —y las alternativas que se descartaron, con sus costos— está justificada en la sección 5 del informe.

## Documentación

| Documento | Contenido |
|---|---|
| `EVU1_LOPEZ_CRISTOPHER.pdf` | Informe completo: justificación técnica, arquitectura, patrones de diseño, diseño de interfaz, usabilidad, pruebas y evidencias |
