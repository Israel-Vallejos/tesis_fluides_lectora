# Fluidez — Estilo visual aprobado

## Estado y alcance

El usuario aprobó este estilo el 2 de octubre de 2026, después de explorar el prototipo y confirmar la corrección de los fondos negros en Brave. Conservar esta dirección al implementar el sistema real; no sustituirla por otra plantilla sin solicitud del usuario.

La aprobación corresponde al **panel profesional**. La interfaz infantil todavía no tiene una dirección visual aprobada: debe priorizar lectura, instrucciones sencillas y pocas acciones, y requerirá su propia propuesta.

Esta aprobación no confirma arquitectura, esquema de datos, permisos, funcionalidades, métricas ni textos del prototipo. Los datos y resultados actuales son ficticios. No iniciar el sistema completo por el hecho de existir esta referencia.

## Referencia y archivos

- Inspiración: [Clinician — AI-Powered Healthcare Workspace, de Ilias Miah](https://dribbble.com/shots/27767016-Clinician-AI-Powered-Healthcare-Workspace).
- Referencia implementada: `index.html`, `styles.css` y `app.js`, en la raíz del proyecto.
- Capturas: `vista-previa.jpg`, `perfil-corregido.jpg` y `revisiones-corregidas.jpg`.
- `styles.css` contiene los valores definitivos del prototipo aprobado. Revisarlo junto con este documento antes de implementar pantallas.

## Dirección y sensación

Dashboard minimalista en modo claro, sereno, profesional y cercano. Fondo gris frío, superficies blancas, navegación compacta y acento azul. Tarjetas suaves con esquinas redondeadas y separación por espacio y tono. Profundidad discreta; no añadir sombras neumórficas fuertes ni paneles de vidrio como estilo general.

El contenido sirve al acompañamiento lector: escuchar, revisar, organizar sesiones y observar avances. Evitar convertir el panel en una competición de velocidad o presentar indicadores automáticos como diagnósticos.

## Colores semánticos

| Token actual | Valor | Uso |
|---|---|---|
| `--canvas` | `#EEF0F4` | Fondo general y navegación |
| `--surface` | `#FFFFFF` | Tarjetas y ventanas |
| `--ink` | `#171C2B` | Texto principal y acciones destacadas |
| `--muted` | `#616979` | Texto secundario |
| `--line` | `#EDF0F4` | Separadores discretos |
| `--blue` | `#3156D9` | Acento y foco |
| `--blue-soft` | `#EDF1FF` | Estados y fondos azules suaves |
| `--green` / `--green-soft` | `#28664D` / `#EAF4EE` | Avance y estados positivos |
| `--amber` / `--amber-soft` | `#805914` / `#FBF2DC` | Atención o revisión pendiente |

Panel contextual azul: degradado radial desde `#7898F5` y `#4466DC`, pasando por `#2743C2`, hasta `#131D66`. Texto blanco con secundarios claros. Concentrar el degradado en este panel; no extenderlo a todas las tarjetas.

## Tipografía y jerarquía

- Familia local: `'Segoe UI', Arial, sans-serif`. No depender de una fuente externa para reproducir el prototipo.
- Base profesional: 14px, interlineado 1.5.
- Título de página: 28px / 600, interlineado 1.35, tracking -1px; 24px en escritorio compacto y 23px en móvil.
- Títulos de sección: 19px / 600, tracking -0.5px. Componentes compactos usan 13–15px.
- Cifras principales: 39px / 500, tracking -1.6px, cifras tabulares. Ajustar a 32–34px en pantallas pequeñas.
- Texto secundario: habitualmente 11–12px. Etiquetas compactas: 8–10px / 600–700, con tracking moderado.
- El prototipo contiene texto muy pequeño en tablas y etiquetas: antes de producción, revisar su legibilidad y ampliarlo cuando corresponda sin perder la composición aprobada. La aprobación estética no equivale a una auditoría de accesibilidad.
- En formularios móviles, usar 16px para los campos. No trasladar la densidad de las tablas profesionales a la lectura infantil.

## Espaciado, profundidad y composición

- Base de espaciado: 4px; ritmo habitual de 8, 12, 16, 20, 24 y 28px. Mantener los ajustes ópticos existentes cuando sean necesarios.
- Profundidad mediante diferencias de superficie y sombras sutiles. Sombra de tarjeta: `0 4px 20px #28364D03`.
- Contenedor de escritorio: ancho máximo 1544px, borde blanco de 2px y radio de 28px. Margen de 24–36px según ancho.
- Navegación lateral de 94px, reducida a 80px en escritorio compacto. Fondo compartido con el lienzo.
- Resumen superior: cuatro tarjetas; primera más ancha (`1.5fr 1fr 1fr 1fr`).
- Área principal: agenda/lista amplia y columna contextual de 302px, reducida a 270px en escritorio compacto.
- El título y el resumen orientan; la lista de sesiones concentra el trabajo; el panel azul destaca el contexto de una sesión.

## Componentes reutilizables

| Componente | Patrón aprobado |
|---|---|
| Tarjeta | Fondo blanco, radio 22px, padding habitual 20–24px, sombra sutil |
| Botón | Forma de píldora, altura mínima 40px escritorio / 44px móvil, padding 10px 16px, texto 12px / 600, icono 15px |
| Acción principal | Fondo `--ink`, texto blanco; hover `#313B54` |
| Acción secundaria | Fondo blanco, texto oscuro, sombra discreta |
| Navegación activa | Icono blanco sobre cápsula oscura de radio 11px; etiqueta visible debajo |
| Marca | Libro SVG blanco sobre fondo azul, 44×44px y radio 13px |
| Iconos | SVG de línea, viewBox 24×24, trazo 1.6, tamaño habitual 20px; ocultar los decorativos a lectores de pantalla |
| Etiqueta de estado | Fondo semántico suave, radio 5px, texto breve; estado identificado mediante texto, no solo color |
| Fila seleccionada | Fondo `#F1F3F7`, extremos redondeados y acción oscura |
| Perfil ficticio | Ilustración SVG local circular, 32px; 64px en ficha. No incorporar datos reales a ejemplos |
| Ventana emergente | `dialog` nativo, radio 24px, ancho máximo 540px, padding 28px / 23px móvil, fondo blanco explícito |
| Fondo de ventana | `#17203950` y desenfoque de 4px |
| Campos | Fondo claro explícito, texto `--ink`, borde `#D9DFE9`, radio 10–12px; placeholders `--muted` con opacidad 1 |
| Foco | Outline azul de 3px y offset de 4px; no eliminarlo |
| Aviso breve | Fondo oscuro, texto blanco, radio 14px y región de estado accesible |

Los botones oscuros y el panel azul son intencionales. Los fondos negros de ventanas o campos fueron errores de estilos y no forman parte de esta dirección.

## Compatibilidad de formularios y navegadores

Conservar la corrección aplicada tras las capturas del usuario en Brave:

- Declarar `<meta name="color-scheme" content="light">` antes de la hoja de estilos.
- Declarar `color-scheme: light` como respaldo y `color-scheme: only light` en la raíz y controles nativos.
- Definir explícitamente fondo y texto de `dialog`, `input`, `textarea`, `select`, `option` y `optgroup`; no depender del fondo predeterminado del navegador.
- Comentarios de revisión: fondo blanco. Formularios de notas y sesiones: `#F8F9FB`. Búsqueda: transparente sobre su contenedor blanco.
- Definir color de cursor, placeholders y texto de autocompletado.
- No desactivar preferencias de accesibilidad como colores forzados de alto contraste.
- Verificar nuevamente en Brave y otros navegadores al implementar: la confirmación actual del usuario se refiere a su entorno y al prototipo.

## Adaptación y comportamiento

- Reorganizar tarjetas a dos columnas en tableta estrecha y móvil.
- Por debajo de 1024px, colocar el panel contextual después de la lista principal.
- Por debajo de 768px, navegación inferior, márgenes de 16px y contenido en una columna. Reservar espacio inferior para que la navegación no tape contenido ni foco.
- En tablas móviles, priorizar hora, niño, estado y acción. El detalle del ejercicio permanece disponible en la ficha.
- Usar `minmax(0, 1fr)` y elementos flexibles con ancho mínimo cero para evitar desbordamientos.
- Hover y feedback discretos, generalmente 120–200ms; respetar `prefers-reduced-motion`.
- Ventanas con título accesible, cierre visible y Escape. Formularios con etiquetas visibles. Iconos de acción con nombre accesible.

## Al comenzar la implementación real

Leer este documento y examinar el prototipo antes de crear la interfaz. Reutilizar los tokens y patrones mediante componentes o plantillas compartidas. Adaptar contenidos y acciones a los requisitos confirmados, conservando el lenguaje visual aprobado. Diseñar por separado estados de carga, vacío, error y datos reales. No confundir interacciones ficticias con funcionalidades implementadas.
