# Tracker

APP de Geolocalización en tiempo real y guardado de coordenadas en firebase para seguimiento en un mapa.

Usa framework Ionic para dispositivos móviles.

Esta app trabaja en conjunto con la app para escritorio companion que se encuentra en este mismo repositorio y que muestra en tiempo real en un mapa la geo localización de los dispositivos conectados a la base de datos.


Necesita una api key de google maps que podrá encontrar en la web (https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key)

Cuando tenga esa API KEY copiela y peguela en el archivo : src/app/app.module.ts linea: 50



Para iniciar esta aplicación tiene que ir primero a (https://firebase.google.com) y obtener una cuenta de firebase. Crear un proyecto nuevo llamado firechat

En database de firestore elija Real Time Data base


Ponga en las reglas de la database esta regla:

```

{
  "rules": {
    ".read": "auth == null",
    ".write": "auth == null"
  }
}

```


Vaya a proyect overview y elija agregar firebase a tu web app copie y pegue el contenido de sus credenciales en el archivo de la carpeta: src/config/firebase.config.ts  linea 3 a 8

```

apiKey: "",
authDomain: "",
databaseURL: "",
projectId: "",
storageBucket: "",
messagingSenderId: ""

```
# Instalación

Abra la carpeta platforms/android con Android Studio compile y pruebe en un dispositivo real.
