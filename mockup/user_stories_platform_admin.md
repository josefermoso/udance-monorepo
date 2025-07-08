# Historias de Usuario - Administrador de Plataforma (uDance Admin)

Este documento describe las funcionalidades clave desde la perspectiva de un administrador con el rol `platform_admin`, responsable de la supervisión, gestión y mantenimiento de toda la plataforma uDance.

## 1. Gestión de Roles y Permisos

- **Como** administrador de la plataforma, **quiero** poder asignar y revocar roles a cualquier usuario (ej. convertir a un usuario en `studio_admin` o `platform_admin`), **para** delegar responsabilidades y controlar el acceso de forma segura.
- **Como** administrador de la plataforma, **quiero** definir y gestionar permisos granulares para cada rol, **para** asegurar que cada tipo de usuario solo pueda acceder a las funcionalidades que le corresponden.

## 2. Gestión de Taxonomía Global

- **Como** administrador de la plataforma, **quiero** gestionar un catálogo centralizado de `estilos de baile` (ej. agregar, editar, desactivar "Kizomba Fusión"), **para** mantener la consistencia de datos en toda la plataforma y evitar duplicados.
- **Como** administrador de la plataforma, **quiero** gestionar las `categorías de eventos` (ej. "Workshop", "Social", "Competencia"), **para** que los organizadores puedan clasificar sus eventos de manera estandarizada.
- **Como** administrador de la plataforma, **quiero** poder revisar y gestionar los `tags` más utilizados, **para** curar el sistema de etiquetado y eliminar tags inapropiados o redundantes.

## 3. Auditoría y Supervisión

- **Como** administrador de la plataforma, **quiero** acceder a un registro de auditoría (`admin_action_logs`) que rastree acciones críticas realizadas por otros administradores (ej. "quién eliminó al usuario X", "cuándo se modificó el acuerdo del estudio Y"), **para** garantizar la seguridad, la rendición de cuentas y poder investigar incidentes.
- **Como** administrador de la plataforma, **quiero** poder ver y gestionar los reportes de contenido inapropiado enviados por los usuarios, **para** tomar acciones de moderación como eliminar una reseña o suspender a un usuario.

## 4. Comunicación y Anuncios Globales

- **Como** administrador de la plataforma, **quiero** crear, editar y publicar anuncios globales que se muestren en toda la plataforma (web y PWA), **para** comunicar noticias importantes, mantenimientos programados o promociones a toda la comunidad.
- **Como** administrador de la plataforma, **quiero** poder programar la publicación y expiración de estos anuncios, **para** planificar campañas de comunicación con antelación.

## 5. Gestión Financiera y de Acuerdos

- **Como** administrador de la plataforma, **quiero** poder revisar y modificar los acuerdos de servicio (`studio_agreements`) con los estudios, **para** gestionar los términos comerciales de la plataforma.
- **Como** administrador de la plataforma, **quiero** tener una vista general de las transacciones y poder generar reportes de pagos manuales, **para** supervisar la salud financiera de la operación.
