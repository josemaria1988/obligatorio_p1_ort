class Usuarios{
    constructor(id, tipoDeUsuario, nombre, apellido, nombreDeUsuario, contrasenia, numeroTarjetaCredito, cvc){
        this.id = id;
        this.tipo = tipoDeUsuario
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreDeUsuario = nombreDeUsuario;
        this.contrasenia = contrasenia;
        this.numeroTarjetaCredito = numeroTarjetaCredito;
        this.cvc = cvc;
        this.saldoInicial = 15000;
        this.millas = 0;
    }

}

class Destinos{
    constructor(idDestinos, nombreDestino, precioPorNoche, cuposDisponibles, imagen, estaEnOferta, descripcion, estado){
        this.id = idDestinos
        this.nombreDestino = nombreDestino;
        this.precioPorNoche = precioPorNoche;
        this.cuposDisponibles = cuposDisponibles;
        this.imagen = imagen;
        this.estaEnOferta = estaEnOferta;
        this.descripcion = descripcion;
        this.estado = estado;
    }
        
}

class Reserva{
    constructor(idReserva, idUsuario, nombreDestino, nombreDeUsuario, fechaReserva, cantidadPersonas, cantidadDeDias, importeTotal, medioDePago, estado, millas){
        this.idReserva = idReserva;
        this.idUsuario = idUsuario;
        this.nombreDestino = nombreDestino;
        this.nombreDeUsuario = nombreDeUsuario;
        this.fecha = fechaReserva;
        this.cantidadPersonas = cantidadPersonas;
        this.dias = cantidadDeDias;
        this.importeTotal = importeTotal;
        this.medioDePago = medioDePago;
        this.estado = estado;
        this.millas = millas
    }
}

//recorrer el array de reservas y sumar importeTotal

//recorrer el array de destinos y  por cada destino
//llamar a una funcion y le van a pasar el id de destino
//dentro de esa funcion van a rrecorrer el array de reservas y si el destino coincide con el destion de la reserva, van a sumar la cantidad de personas en esa reserva