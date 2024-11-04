window.addEventListener("click", inicio);



function inicio() {
    //REGISTRO DE USUARIO
    document.querySelector("#btnRegistrarUsuario").addEventListener("click", tomarDatosRegistro);
    //LOGIN DE USUARIO
    document.querySelector("#btnLogin").addEventListener("click", iniciarSesion);
}

let sistema = new Sistema();

        // Hardcodeando un usuario para pruebas
        const usuarioPrueba = new Usuarios(
            "0",
            "Juan",
            "Pérez",
            "juanperez",
            "clave123",
            "Juan Pérez",
            "1234567890123456",
            "123"
        );
        sistema.registrarUsuario(usuarioPrueba);

//REGISTRO DE USUARIO
let idUsuario = 0
function tomarDatosRegistro() {
    let nombre = document.querySelector("#txtNombrePersona").value;
    let apellido = document.querySelector("#txtApellido").value;
    let nombreUsuario = document.querySelector("#txtUserNameRegistro").value;
    let contrasenia = document.querySelector("#txtContraseñaRegistro").value;
    let tarjetaCredito = document.querySelector("#txtTarjetaCredito").value;
    let cvc = document.querySelector("#txtCvc").value;
    let mensaje = ""

    let camposCompletos = sistema.validarCamposVaciosRegistro(nombre, apellido, contrasenia, nombreUsuario, tarjetaCredito, cvc);
    let usuarioRepetido = sistema.buscarElemento(sistema.usuarios, "nombreDeUsuario", nombreUsuario);
    if (camposCompletos && !usuarioRepetido) {
        let nuevoUsuario = new Usuarios(idUsuario, nombre, apellido, nombreUsuario, contrasenia, tarjetaCredito, cvc)
        idUsuario++
        sistema.registrarUsuario(nuevoUsuario)
        mensaje = "Registro Exitoso!"
        document.querySelector("#txtNombrePersona").value = "";
        document.querySelector("#txtApellido").value = "";
        document.querySelector("#txtUserNameRegistro").value = "";
        document.querySelector("#txtContraseñaRegistro").value = "";
        document.querySelector("#txtTarjetaCredito").value = "";
        document.querySelector("#txtCvc").value = "";
    } else {
        document.querySelector("#txtUsuarioRegistro").value = "";
        document.querySelector("#txtClaveRegistro").value = "";
        document.querySelector("#txtNombreCompletoRegistro").value = "";
        mensaje = "Error en Registro: Los campos son todos obligatorios, la pass es minimo de 5 caracteres o ya existe un usuario con ese nombre";
    }
    document.querySelector("#pMensajesRegistro").innerHTML = mensaje;

}


// LOGIN DE USUARIO

function iniciarSesion() {
    let nombre = document.querySelector("#txtNombreLogin").value;
    let clave = document.querySelector("#txtClaveLogin").value;

    let camposCompletos = sistema.validarCamposLogin(nombre, clave)
    let usuario = sistema.obtenerObjeto(sistema.usuarios, "nombreDeUsuario", nombre);
    if(camposCompletos && usuario){
        if(clave === usuario.contrasenia){
            mensaje = "Login exitoso"
        }else {
            mensaje = "contrasenia incorrecta"
        }
    }else{
        mensaje = "usuario no encontrado"
    }

    document.querySelector("#pLogin").innerHTML = mensaje
}