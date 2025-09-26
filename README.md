# Tareas Habituales

Esta es una aplicación web responsive para gestionar tareas diarias repetitivas, separadas en tareas de mañana y noche. La aplicación permite marcar las tareas como completadas y se reinicia automáticamente cada día.

📱 **[Ver Demo en GitHub Pages](https://jmgranabuab.github.io/tareasHabituales/)**

## Características

- ✨ Interfaz responsive y modo oscuro
- 📝 Gestión separada de tareas de mañana y noche
- 🔄 Reinicio automático diario de las tareas
- 💾 Almacenamiento local persistente
- 👥 Dos vistas diferentes: usuario y administrador
- 🎨 Indicadores visuales de estado (verde/rojo)

## Vistas de la Aplicación

### Vista de Usuario (index.html)
- Visualización de tareas existentes
- Marcar/desmarcar tareas como completadas
- Interfaz simplificada sin opciones de administración
- Indicador visual del estado de cada tarea

### Vista de Administrador (admin.html)
- Todas las funcionalidades de la vista de usuario
- Agregar nuevas tareas
- Eliminar tareas existentes
- Gestión completa del sistema

## Tecnologías Utilizadas

- HTML5
- CSS3 (con diseño responsive)
- JavaScript (Vanilla)
- LocalStorage para persistencia de datos

## Funcionalidades Destacadas

### Persistencia de Datos
- Las tareas se guardan automáticamente en el localStorage del navegador
- Los datos persisten entre sesiones
- Reinicio automático del estado de las tareas cada día

### Diseño Responsive
- Adaptable a diferentes tamaños de pantalla
- Diseño optimizado para móviles y tablets
- Interfaz intuitiva y fácil de usar

### Tema Oscuro
- Diseño optimizado para reducir la fatiga visual
- Colores contrastados para mejor legibilidad
- Indicadores de estado adaptados al modo oscuro

## Cómo Usar

1. **Vista de Usuario**
   - Abre `index.html` en tu navegador
   - Las tareas aparecerán en sus respectivas secciones (mañana/noche)
   - Haz clic en "Completar" para marcar una tarea como hecha
   - Haz clic en "Deshacer" para marcar una tarea como pendiente

2. **Vista de Administrador**
   - Abre `admin.html` en tu navegador
   - Usa los formularios para agregar nuevas tareas
   - Puedes eliminar tareas existentes
   - Mantiene todas las funcionalidades de la vista de usuario

## Estructura del Proyecto

```
tareasHabituales/
│
├── index.html      # Vista de usuario
├── admin.html      # Vista de administrador
├── style.css       # Estilos de la aplicación
├── script.js       # Lógica de la aplicación
└── README.md       # Documentación
```

## Notas Adicionales

- Las tareas se reinician automáticamente cada día
- Los datos se almacenan localmente en el navegador
- Compatible con todos los navegadores modernos
- No requiere instalación ni configuración adicional

## Contribuir

Si deseas contribuir a este proyecto:

1. Haz un Fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Este proyecto está distribuido bajo la Licencia MIT. Consulta el archivo [`LICENSE`](LICENSE) para más información.

Copyright (c) 2025 JMgranaBUAB