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
}