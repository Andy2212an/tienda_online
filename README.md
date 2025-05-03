# 📱 Sistema de Inventario de Celulares
## Proyecto CRUD con Node.js, Express y MySQL
### Creado por Andy 22 – SENATI Chincha

Este proyecto permite gestionar un inventario de celulares, incluyendo operaciones de crear, leer, actualizar y eliminar (CRUD), así como subir imágenes para cada producto. Está construido usando Node.js, Express, EJS y una base de datos MySQL.

---

## 🚀 Tecnologías utilizadas

* Node.js  
* Express.js  
* MySQL  
* EJS (para renderizar vistas)  
* Multer (para manejo de imágenes)  
* Bootstrap (para estilos)  

---

## 📁 Estructura del proyecto

```bash
tienda_online/
│
├── app.js                          # Archivo principal del servidor
├── routes/
│   └── celular.js                  # Lógica de rutas y CRUD de celulares
├── views/
│   ├── index.ejs                   # Página principal (listado)
│   ├── create.ejs                  # Formulario de creación
│   ├── edit.ejs                    # Formulario de edición
│   ├── home.ejs                    # Página de bienvenida
│   └── partials/                   # Componentes parciales para la vista
│       ├── header.ejs              # Encabezado de la página
│       └── footer.ejs              # Pie de página
├── public/
│   └── uploads/                    # Carpeta donde se guardan las imágenes
├── config/
│   ├── database.js                 # Conexión a la base de datos
│   └── scriptbd.sql                # Script para la creación de la base de datos
├── test/
│   └── arreglo.js                  # Archivo de prueba
├── README.md                       # Este archivo de documentación    
└── formatoalumnotrabajofinal/ 
    └── PIAD-527_FORMATOALUMNOTRABAJOFINAL.pdf   # Archivo de trabajo final
```
## 🛠️ Cómo ejecutar este proyecto en Visual Studio Code

Sigue estos pasos para descargar y ejecutar el proyecto en tu máquina local:

### 1️⃣ Clonar el repositorio desde GitHub
1. Asegúrate de tener instaladas las siguientes herramientas:
   - [Git](https://git-scm.com/)
   - [Visual Studio Code](https://code.visualstudio.com/)

2. Abre **Git Bash** y ejecuta el siguiente comando para clonar el repositorio:
   ```bash
   git clone https://github.com/Andy2212an/tienda_online.git
   ```

3. Una vez descargado, el proyecto estará en una carpeta llamada `tienda_online` dentro del directorio donde ejecutaste el comando.

### 2️⃣ Abrir el proyecto en Visual Studio Code
1. Abre **Visual Studio Code**.
2. Haz clic en **File** > **Open Folder...** y navega hasta la carpeta `tienda_online` que descargaste con `git clone`.
3. Selecciona la carpeta y haz clic en **Open**.

### 3️⃣ Instalar dependencias del proyecto
1. Abre el terminal integrado en Visual Studio Code. Para hacerlo:
   - Haz clic en **Terminal** > **New Terminal** en el menú superior.
2. Asegúrate de estar ubicado en la carpeta raíz del proyecto `tienda_online` en el terminal.
3. Ejecuta el siguiente comando para instalar las dependencias necesarias:
   ```bash
   npm install
   ```

### 4️⃣ Ejecutar el proyecto
1. Una vez instaladas las dependencias, puedes ejecutar el proyecto utilizando `nodemon`.
2. En el terminal de Visual Studio Code, escribe:
   ```bash
   nodemon app
   ```
3. El servidor se iniciará, y tendrás acceso al proyecto desde tu navegador en `http://localhost:3000`.

### Notas adicionales
- Si no tienes instalado `nodemon`, puedes instalarlo globalmente ejecutando:
  ```bash
  npm install -g nodemon
  ```
- Asegúrate de que la base de datos configurada en `config/database.js` esté disponible y correctamente configurada.

## 🔍 Uso del buscador

El buscador está diseñado para filtrar los celulares disponibles en el catálogo. Puedes buscar utilizando **detalles específicos** de un celular. Asegúrate de ingresar solo **uno de los siguientes campos** en el buscador para que funcione correctamente:

- **Almacenamiento**: Por ejemplo, "128GB".
- **RAM**: Por ejemplo, "8GB".
- **Año**: Por ejemplo, "2023".
- **Estado**: Por ejemplo, "Nuevo" o "Usado".
- **Precio**: Por ejemplo, "999.99".
- **Marca**: Por ejemplo, "Samsung".
- **Modelo**: Por ejemplo, "Galaxy S22".

Si ingresas más de un campo a la vez, el buscador podría no funcionar como se espera. Usa un solo criterio para obtener resultados precisos.

El entorno ya está configurado correctamente.

