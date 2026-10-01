# Tu primer turno · Quiz de perforación

Web de estudio en español para empezar sin experiencia como ayudante de perforación. Incluye 200 preguntas en 11 temas (6 retos con fotos), 16 preguntas de entrevista, 12 etapas de un turno de ejemplo, 16 términos y 27 recursos de estudio, incluidos 3 videos de origen oficial.

Abre `index.html` en un navegador o sirve esta carpeta como una web estática. No necesita instalar paquetes ni configurar un servidor de aplicación. La publicación utiliza GitHub Pages, rama `main`, carpeta raíz.

## Uso

- **Entrenar:** selecciona un tema y aprende con la corrección inmediata.
- **Quiz con fotos:** identifica broca, testigos y características observables.
- **Simulacro:** 30 o 60 preguntas aleatorias con todos los temas, corrección al terminar.
- **Entrevista:** responde en voz alta y compara con la guía.
- **Un día en campo:** tareas, límites, frases de reporte y situaciones interactivas en 12 etapas.
- **Biblioteca:** videos, lecturas y documentos; filtros, búsqueda y marcas de estudio.
- **Banco completo:** consulta las 200 preguntas, busca por palabra y filtra por tema o avance.
- **Entrenar pendientes / errores:** rondas basadas en preguntas distintas y su último intento.
- **Guía:** plan de siete días, referencias y créditos de fotos.

Los avances se guardan con `localStorage` en el navegador de cada dispositivo. No hay cuentas ni sincronización entre teléfono y laptop. No se graba audio ni se envían respuestas a un servidor.

## Alcance

Es preparación independiente, sin afiliación a Hubbard. No son preguntas oficiales de selección ni una capacitación que autorice a operar equipos. Se deben seguir los procedimientos del proyecto y la capacitación del empleador.

## Fotografías

Imágenes de Wikimedia Commons, reducidas y recomprimidas, sin recorte ni cambios de contenido:

| Archivo | Autor y fuente | Licencia |
| --- | --- | --- |
| `assets/broca.jpg` | [Rob and Stephanie Levy](https://commons.wikimedia.org/wiki/File:Diamond_drill_bit_002.jpg) | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `assets/cajas-testigos.jpg` | [kallerna](https://commons.wikimedia.org/wiki/File:Drill_core_boxes_Onkalo_2.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `assets/testigo.jpg` | [Rjhogarth](https://commons.wikimedia.org/wiki/File:Drill_core.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

Las versiones de imágenes CC BY-SA se distribuyen bajo esa misma licencia. Ningún autor o entidad citada respalda este juego. Las fotos son de referencia y no representan equipos ni proyectos identificados de Hubbard.

Investigación inicial: 1 de octubre de 2026. Ver `guia.html` y `guia.md` para las fuentes de estudio.

## Datos y mantenimiento

`data.js` conserva las preguntas iniciales e `expansion.js` añade contenido, fuentes, recorrido y biblioteca. `app.js` mezcla opciones y calcula los resultados. La primera respuesta del arreglo de cada pregunta es la clave, nunca su posición visible. Se preserva el almacenamiento de la edición anterior y se recuperan sus respuestas disponibles para el indicador de cobertura. Una ronda de examen actualiza el indicador al finalizar para no revelar la corrección durante la prueba.

Las preguntas tienen identificadores únicos y fuentes asociadas. El número mostrado deriva del banco cargado. Los videos enlazan a YouTube y a la página oficial de origen; no se alojan copias ni se requiere un iframe de terceros para usar el quiz.
