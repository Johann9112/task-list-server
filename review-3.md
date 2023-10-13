# ¿Qué es mi producto y para qué sirve?

Mi producto es una API RESTful para la gestión de tareas. Su propósito principal es permitir a los usuarios (o aplicaciones) crear, actualizar, leer y eliminar tareas de una manera estructurada y segura. A través de una serie de endpoints bien definidos, cualquier cliente compatible, ya sea una aplicación web, móvil o de escritorio, puede interactuar con la base de datos de tareas.
Además, con la reciente implementación del JWT (Token de Acceso JSON Web), la API ahora también ofrece una capa de seguridad adicional. Esto significa que para que los usuarios o aplicaciones puedan interactuar con ciertas rutas o funcionalidades, primero deben autenticarse y obtener un token de acceso. Este token sirve como una especie de "pase" digital que verifica la identidad y los privilegios del solicitante.

# ¿Cuáles son las funcionalidades más importantes y por qué los usuarios las usarían?

**Autenticación** Antes de interactuar con la mayoría de las funcionalidades de la API, el usuario debe autenticarse. Al hacerlo correctamente, recibe un token JWT que debe ser incluido en las solicitudes subsiguientes para acceder a ciertas rutas protegidas. Esta funcionalidad garantiza que solo los usuarios autorizados puedan realizar ciertas acciones, añadiendo una capa de seguridad.

**Gestión de Tareas** La principal funcionalidad de la API. Los usuarios pueden:

        Crear Tareas: Añadir una nueva tarea especificando detalles como la descripción, el responsable y si está completada.
        Actualizar Tareas: Modificar los detalles de una tarea existente.
        Leer Tareas: Obtener una lista completa de tareas, tareas completadas, tareas pendientes o detalles específicos de una tarea individual.
        Eliminar Tareas: Borrar una tarea específica.
        Estas funciones son esenciales para cualquier aplicación o sistema que se ocupe de la gestión de tareas, ya sea para uso personal, profesional o educativo.

**Filtrado de Tareas** Además de simplemente listar tareas, los usuarios pueden filtrar tareas completadas o pendientes, y también pueden buscar tareas específicas basadas en el responsable. Esto es útil para obtener una visión rápida y específica de las tareas según las necesidades del usuario.