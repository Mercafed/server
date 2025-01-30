// importaciones
import React, {useState} from "react";

// inicializaciones
class Login extends React.Component {
    render() {
      return (
        <html lang="es">
          <head>
            <title>iniciar sesion</title>
            <link rel="stylesheet" href="/public/css/cssLogin.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          </head>
          <body>
            <main>
              <header>
                <h1>Iniciar Sesión</h1>
              </header>              
              <form action="/login" method="post">
                <input type="text" name="usuario" placeholder="Usuario" required/>
                <input type="password" name="contraseña" placeholder="Contraseña" required/>
                <button type="submit">Iniciar Sesión</button>
              </form>
            </main>
          </body>
        </html>
      );
    }
}
  
export default Login;