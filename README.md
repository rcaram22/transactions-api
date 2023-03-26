# Transactions Api

## Instrucciones

NOTA: Versión de node utilizada: 18.13.0

1. Se debe crear un archivo .env en la carpeta raíz con el siguiente contenido:

```bash
PORT=8000
APILAYER_KEY=KNTOyXynx2lG2iQIWoAMs5e0XCvHi5N6
APILAYER_BASE_URL=https://api.apilayer.com/fixer
DB_URI=mongodb+srv://rcaram:7XZaMOg3zmj0R7Ob@cluster0.jtrgfn7.mongodb.net/transactionsDB
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

Esto instala las dependencias del proyecto y lo levanta en el puerto especificado en el archivo .env
