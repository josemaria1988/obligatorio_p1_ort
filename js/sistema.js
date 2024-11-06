class Sistema{
    constructor(){
        this.destinos = [];
        this.usuarios = [];
        this.administradores = [];
        this.reservas = [];
    }

    agregarNuevoDestino(destino){
        this.destinos.push(destino);
    }

    agregarReserva(admin){
        this.administradores.push(admin);
    }

    validarCamposVaciosRegistro(pNombre, pApellido, pNombreUsuario, pClave, pNombreCompleto, pTarjetaCredito, pCvc){
        let campoValidos = false;
        if(pNombre !== "" && pApellido !== "" && pNombreUsuario !== "" && pClave !== "" && pNombreCompleto !== "" && pTarjetaCredito !== "" && pCvc !== ""){
            campoValidos = true;
        }
        return campoValidos;
    }

    registrarUsuario(usuario){
        this.usuarios.push(usuario)
    }
    buscarElemento(arrElementos, propiedad, valorBusqueda) {
        let existe = false
        for (let i = 0; i < arrElementos.length; i++) {
            const elElemento = arrElementos[i]
            if (elElemento[propiedad] === valorBusqueda) {
                existe = true
                break
            }
        }
        return existe
    }

    obtenerObjeto(arrElementos, propiedad, busqueda){
        let objeto = null;
        for (let i = 0; i < arrElementos.length; i++) {
            const unElemento = arrElementos[i];
            if(unElemento[propiedad] === busqueda){
                objeto = unElemento;
                break;
            }
        }
        return objeto;
    }

    validarCamposLogin(pNombre, pClave){
        let campoValidos = false;
        if(pNombre !== "" && pClave !== ""){
            campoValidos = true;
        }
        return campoValidos;
    }

    verificarFormatoPassword(password){
        let passwordValida = false;
        let tieneMayusculas = false;
        let tieneNumeros = false;
        let tieneMinusculas = false
        for(let i = 0; i < password.length; i++){
            
            if(!isNaN(password[i])){
                tieneNumeros = true;
            }
            if(password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90){
                tieneMayusculas = true;
            }
            if(password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122){
                tieneMinusculas = true;
            }
        }
        if(tieneNumeros && tieneMayusculas && password.length > 5){
            passwordValida = true;
        }
        return passwordValida;
    }
}