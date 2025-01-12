# Transactions Api

## Instrucciones

NOTA: Versión de node utilizada: 18.13.0

1. Se debe crear un archivo .env en la carpeta raíz con el siguiente contenido:

```bash
PORT=3000
APILAYER_KEY=KNTOyXynx2lG2iQIWoAMs5e0XCvHi5N6
APILAYER_BASE_URL=https://api.apilayer.com/fixer
DB_URI=mongodb+srv://rcaram:<dbPass>@cluster0.jtrgfn7.mongodb.net/transactionsDB
JWT_SECRET=asfaskfjasf123
```

2. En la carpeta raíz del proyecto ejecutar los siguiente comandos:

```bash
npm install
```

```bash
npm run build
```

```bash
npm run start
```

```bash
npm run seed:db
```

Esto instala las dependencias del proyecto y lo levanta en el puerto especificado en el archivo .env
Además alimenta la base de datos con los datos inciales.

## Comentarios

### Mecanismo de login

El proyecto cuenta con un endpoint de login para obtener un token dado un username.
El token siempre se genera con el usuario recibido, no se hacen validaciones de ningún tipo.
Para poder transferir se debe iniciar sesión con un usuario existente que tenga al menos una cuenta, usando solamente el campo username en el body.

### Mejoras pendientes

Se deberían implementar validadores para los inputs, de forma de validar los datos que se reciben en cada solicitud.

Ejemplo: Validar campos requeridos al hacer una transferencia, validar que el amount sea un número mayor a 0, etc.

Se deberían contemplar más errores y efectuar mayores controles para los valores recibidos en body o parámetros.

Se podría hacer uso de Redis para almacenar datos de la api externa en lugar de utilizar node-cache.

### Supuestos

Para el endpoint que obtiene las transacciones de un usuario, asumí que solamente obtiene las que el usuario realizó y no las que el usuario recibió.
Si se quisiera traer ambas, sería solamente agregar un filtro más al momento de obtener de la base de datos.
