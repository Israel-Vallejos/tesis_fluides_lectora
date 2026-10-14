# Base de datos de Fluidez

La referencia es `bdd_correcion2_tesis.pdf`, corregido con el ingeniero, y el audio `2 revisión bdd.aac`. El dump anterior no se toma como diseño aprobado.

## Abrir en MySQL Workbench

1. Abre tu conexión habitual a MySQL.
2. Usa **File → Open SQL Script** y selecciona `bdd_tesis_lectora_corregida.sql` de esta carpeta.
3. Ejecuta el archivo completo con el botón del rayo que ejecuta todo el script.
4. Actualiza **Schemas**. Aparecerá `bdd_tesis_lectora_corregida` con siete tablas.

El archivo crea una base independiente. No borra ni cambia `bdd_tesis_lectora`. Si el nombre nuevo ya existe, detente y revisa esa base antes de volver a ejecutar. No cambies el nombre al de la base antigua: este archivo crea tablas, no migra tablas existentes. Para sustituir la antigua habrá que comprobar si tiene datos y respaldarla primero.

## Qué conserva

- Los siete nombres de tablas, sus campos, longitudes y marcas de obligatoriedad del PDF.
- Una historia por niño, conforme al campo único `his_id_nino` del PDF y la explicación del audio alrededor de 9:30. La línea gráfica del PDF muestra una relación de muchos, por lo que documentamos explícitamente esta interpretación.
- Varias sesiones por historia y un profesional identificado en cada sesión. Permite diferentes profesionales en diferentes sesiones; no determina todavía quién puede consultar cada expediente.
- Varios ejercicios por sesión y varias grabaciones por ejercicio.
- Como máximo un análisis por grabación y una validación por análisis. El análisis y la validación pueden crearse después: la grabación no exige tener inmediatamente un análisis y el análisis no exige una validación.
- Las observaciones de sesiones y validaciones, como campos distintos.

## Adaptaciones de implementación para MySQL

- `JSON` en lugar de `jsonb`.
- Identificadores `BIGINT UNSIGNED AUTO_INCREMENT`; las claves foráneas usan el mismo tipo.
- Motor InnoDB, caracteres `utf8mb4` y cotejamiento `utf8mb4_unicode_ci`.
- Claves foráneas con `RESTRICT`: no se eliminan en cascada registros dependientes.
- Los índices únicos corresponden al nombre de usuario, la historia por niño y las relaciones uno a uno. Los demás índices facilitan las relaciones de las tablas.

No se añaden listas cerradas de estados, valores predeterminados, restricciones únicas para correo o numeración de sesiones, ni reglas de la otra IA que no se puedan justificar con el PDF. Las fechas obligatorias se proporcionarán expresamente al guardar; no se actualizan automáticamente.

No incluye `accesos_expediente`, `asignaciones`, un profesional adicional en validaciones, usuarios iniciales, contraseñas ni procedimientos almacenados. Los roles, estados, rangos numéricos, permisos y reglas de negocio deberán validarse al implementar el servidor y los procedimientos; la estructura por sí sola no garantiza esas reglas.

Este archivo es la estructura inicial acordada, no una base ya importada en tu servidor habitual ni una implementación del sistema.

## Verificación realizada

El script se ejecutó correctamente en una instancia temporal independiente de MySQL 8.0.43: siete tablas, 72 campos y siete claves foráneas. Se comprobó el flujo completo con dos profesionales en sesiones diferentes y dos intentos de grabación, así como el rechazo de historias, análisis y validaciones duplicados, referencias inexistentes, JSON inválido y borrados con registros dependientes. Los datos de prueba no se incluyen en el script entregado. Tu servicio MySQL habitual no se modificó.
