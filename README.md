# EMPLOYEE WEBPAGE
 Desarrollo de app web para busqueda de trabajo

# Plataforma de Búsqueda de Empleo

## Descripción
Plataforma interactiva diseñada para conectar buscadores de empleo con oportunidades laborales. Los usuarios pueden crear perfiles, subir CVs, y aplicar a ofertas de trabajo. Los empleadores pueden publicar ofertas de empleo y gestionar aplicaciones.

## Características
- Búsqueda de empleo avanzada con filtros personalizables
- Gestión de perfiles de usuario con capacidad de subir documentos
- Panel de control para empleadores para seguimiento de ofertas y aplicaciones
- Diseño responsivo para una óptima experiencia de usuario en cualquier dispositivo
- Seguridad robusta para proteger la privacidad de los usuarios

## Vistas Clave
- **Página de Inicio:** Búsqueda rápida, categorías principales, y accesos directos.
- **Listado de Trabajos:** Ofertas con filtros por ubicación, tipo y salario.
- **Perfil de Usuario:** Información personal, CV, experiencia, educación y habilidades.
- **Panel de Empleador:** Resumen de ofertas publicadas y aplicaciones recibidas.

## Diseño
Se adopta un enfoque minimalista y profesional, con esquemas de color monocromáticos y un diseño limpio y moderno.

## Modelo de Base de Datos (MongoDB)

### Colección de Usuarios
```json
{
  "_id": ObjectId("unique-user-id"),
  "username": "nombredeusuario",
  "password_hash": "hashed_password",
  "email": "usuario@email.com",
  "profile": {
    "firstName": "Nombre",
    "lastName": "Apellido",
    "contactNumber": "1234567890",
    "location": "Ciudad, País",
    "resume": "URL/Path_to_Resume",
    "skills": ["skill1", "skill2", "skill3"],
    "education": [
      {
        "institution": "Nombre de la Institución",
        "degree": "Título obtenido",
        "fieldOfStudy": "Campo de estudio",
        "startDate": "Fecha de inicio",
        "endDate": "Fecha de fin",
        "details": "Detalles adicionales"
      }
    ],
    "workExperience": [
      {
        "companyName": "Nombre de la Empresa",
        "title": "Cargo",
        "location": "Ubicación",
        "startDate": "Fecha de inicio",
        "endDate": "Fecha de fin",
        "current": true/false,
        "details": "Descripción del trabajo realizado"
      }
    ]
  },
  "settings": {
    "notificationPreferences": {
      "email": true,
      "sms": false
    },
    "theme": "dark/light"
  },
  "createdAt": "fecha de creación ISODate",
  "updatedAt": "fecha de última actualización ISODate"
}

```

### Coleccion de Trabajos
```json
{
  "_id": ObjectId("unique-job-id"),
  "employerId": ObjectId("unique-employer-user-id"),
  "title": "Título del trabajo",
  "description": "Descripción detallada del trabajo",
  "requirements": ["requerimiento1", "requerimiento2"],
  "skills": ["skill1", "skill2"],
  "salaryRange": {
    "min": 30000,
    "max": 50000
  },
  "jobType": "Full-Time/Part-Time/Internship/Remote",
  "location": "Ubicación del trabajo",
  "company": {
    "name": "Nombre de la Empresa",
    "description": "Descripción de la Empresa",
    "logo": "URL/Path_to_Logo"
  },
  "postedAt": "fecha de publicación ISODate",
  "status": "active/closed"
}

```