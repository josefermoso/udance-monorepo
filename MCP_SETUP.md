# Configuración MCP para UDance - ✅ CONFIGURADO

Este documento explica cómo está configurado Model Context Protocol (MCP) para el proyecto UDance.

## ¿Qué es MCP?

MCP (Model Context Protocol) es un protocolo estándar que permite a los LLMs conectarse con fuentes de datos externas de forma uniforme. Con MCP configurado, Cursor puede:

- ✅ Consultar tu base de datos Supabase directamente
- ✅ Analizar esquemas de base de datos
- ✅ Generar SQL automáticamente
- ✅ Interactuar con GitHub repositories
- ✅ Acceder a contexto en tiempo real

## Estado de Configuración

✅ **Archivo de configuración creado**: `.cursor/mcp.json`
✅ **Token de Supabase configurado**: `sbp_12778f3e...` 
✅ **Token de GitHub configurado**: `ghp_eoxA64c0...`
✅ **Modo read-only activado** para seguridad

## Cómo Activar en Cursor

### 1. Verificar Configuración en Cursor

1. Abre Cursor
2. Ve a **Settings → MCP**
3. Deberías ver estado **"active" verde** para ambos servidores:
   - ✅ **supabase** - Acceso a base de datos
   - ✅ **github** - Acceso a repositorios

### 2. Reiniciar Cursor (si es necesario)

Si no ves los servidores activos:
1. Cierra Cursor completamente
2. Reabre Cursor
3. Los servidores MCP se cargarán automáticamente

## Comandos de Ejemplo

¡Ya puedes usar estos comandos directamente en Cursor!

### 🗃️ Supabase Commands:
```
- "¿Qué proyectos de Supabase tengo disponibles?"
- "Muéstrame el esquema de mi base de datos"
- "¿Cuántas tablas hay en mi proyecto?"
- "Crea una tabla para eventos de tango con campos: id, titulo, fecha, lugar, precio"
- "Genera SQL para insertar un usuario de prueba"
```

### 🐙 GitHub Commands:
```
- "Muestra los issues abiertos en este repositorio"
- "¿Cuáles son los últimos commits?"
- "Busca archivos relacionados con autenticación"
- "¿Qué branches existen en este repo?"
- "Crea un nuevo issue para documentar la migración de Cloudflare a Supabase"
```

## Funcionalidades Disponibles

### Supabase MCP Server
- 📋 **Gestión de proyectos**: Listar, crear, configurar proyectos
- 🗄️ **Operaciones de base de datos**: Consultas SQL (solo lectura)
- 📊 **Análisis de esquemas**: Explorar tablas, columnas, relaciones
- 🔍 **Información de proyecto**: Configuración, estadísticas

### GitHub MCP Server  
- 📂 **Repositorios**: Listar, buscar, información de repos
- 🐛 **Issues**: Listar, crear, buscar issues
- 📝 **Pull Requests**: Información de PRs
- 🔍 **Búsqueda de código**: Encontrar archivos y contenido
- 📈 **Commits**: Historia y detalles de commits

## Seguridad Implementada

🔒 **Configuración Segura:**
- ✅ Modo **read-only** para operaciones de base de datos
- ✅ Tokens protegidos en `.gitignore`
- ✅ Archivo template disponible para otros desarrolladores
- ✅ Sin project-ref específico (acceso a todos los proyectos)

## Próximos Pasos

1. **Prueba la conexión** preguntando a Cursor:
   ```
   "¿Puedes conectarte a mis proyectos de Supabase?"
   ```

2. **Explora tu base de datos** preguntando:
   ```
   "¿Qué proyectos de Supabase tengo y cuál sería el mejor para UDance?"
   ```

3. **Analiza tu repositorio** preguntando:
   ```
   "¿Qué archivos hay en este proyecto relacionados con autenticación?"
   ```

## Troubleshooting

Si tienes problemas:

1. ✅ **Node.js instalado** - Verificado
2. ✅ **Tokens válidos** - Configurados
3. 🔄 **Reinicia Cursor** si no aparecen los servidores
4. 📋 **Verifica en Settings → MCP** el estado de conexión

## Archivos del Proyecto

```
.cursor/
├── mcp.json          # Configuración activa (con tokens reales)
└── mcp.json.template # Template para otros desarrolladores

MCP_SETUP.md          # Esta documentación
```

## Recursos

- [Documentación oficial MCP](https://modelcontextprotocol.io/)
- [Supabase MCP Server](https://github.com/supabase/mcp-server-supabase)
- [GitHub MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/github)

---

**🎉 ¡MCP está configurado y listo para usar! Prueba preguntando a Cursor sobre tu base de datos o repositorio.**
