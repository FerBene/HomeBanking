//Declaración de variables
var nombreUsuario="Fer Bene";
var saldoCuenta=15000;
var limiteExtraccion=20000;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    iniciarSesion();
}

function sumarDinero(dineroASumar) {
    saldoCuenta=saldoCuenta+dineroASumar;
}

function restarDinero(dineroARestar) {
    saldoCuenta=saldoCuenta-dineroARestar;
}

function checkvaluetype(numero) {
    if (isNaN(numero)) {
        alert("No ha ingresado un numero valido. Por favor vuelva ingrese un numero valido");
        return false;
    } else {
        if (numero<0) {
        alert ("El numero ingresado debe ser mayor o igual que cero");
        return false;
        }
    }
    return true;
}

function pagar(montoAPagar) {
    if (saldoCuenta<montoAPagar) {
        alert("No hay suficiente saldo en tu cuenta para pagar el servicio.");
    }
    else {
        var saldoAnterior=saldoCuenta;
        restarDinero(montoAPagar);
        alert("Has pagado la factura de "+servicio+".\nSaldo anterior: $"+saldoAnterior+".\nDinero descontado: $"+montoAPagar+"\nSaldo actual: $"+saldoCuenta);
        actualizarSaldoEnPantalla(saldoCuenta);
    }  
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var nuevoLimiteDeExtraccion=parseInt(prompt("Ingrese el nuevo limite de extraccion deseado."));
    if (checkvaluetype(nuevoLimiteDeExtraccion)) {
        limiteExtraccion=nuevoLimiteDeExtraccion;
        actualizarLimiteEnPantalla();
        alert("Tu nuevo limite de extraccion es: $"+limiteExtraccion);
    }
}


function extraerDinero() {
    var dineroAExtraer=parseInt(prompt("Ingrese la cantidad de dinero que desea extraer."));
    var limiteActual=Math.min(saldoCuenta, limiteExtraccion);
    if (dineroAExtraer>saldoCuenta) {
        alert("No hay suficiente saldo disponible. Ingrese un monto menor o igual a $ "+limiteActual);
    }
    else if (dineroAExtraer>limiteExtraccion) { 
        alert("El monto solicitado supera el limite de extraccion. Ingrese un monto menor o igual a $ "+limiteExtraccion);
    }
    else if (dineroAExtraer%100 != 0) { 
        alert("Este Home Banking solo entrega billetes de 100. Por favor, ingrese un monto multiplo de 100.");
    }
    else if (checkvaluetype(dineroAExtraer)) {
        var saldoAnterior=saldoCuenta;
        restarDinero(dineroAExtraer);
        actualizarSaldoEnPantalla();
        alert("Has extraido: $"+dineroAExtraer+"\nSaldo anterior: $"+saldoAnterior+"\nSaldo actual: $"+saldoCuenta);
    }
}

function depositarDinero() {
    var dineroADepositar=parseInt(prompt("Ingrese la cantidad de dinero que desea depositar."));
    if (checkvaluetype(dineroADepositar)) {
        var saldoAnterior=saldoCuenta;
        sumarDinero(dineroADepositar);
        actualizarSaldoEnPantalla();
        alert("Has depositado: $"+dineroADepositar+"\nSaldo anterior: $"+saldoAnterior+"\nSaldo actual: $"+saldoCuenta);
    }
}

function pagarServicio() {
    var agua=350;
    var telefono=425;
    var luz=210;
    var internet=570;
    var servicioAPagar = prompt("Ingrese el numero que corresponde con el servicio que quiere pagar:\n1-Agua: $ "+agua+"\n2-Telefono: $ "+telefono+"\n3-Luz: $ "+luz+"\n4-Internet: $ "+internet);
        switch (servicioAPagar) {
            case"1":
                servicio="agua";
                pagar(agua);
                break;
            case"2":
                servicio="telefono";
                pagar(telefono);
                break;
            case"3":
                servicio="luz";
                pagar(luz);
                break;
            case"4":
                servicio="internet";
                pagar(internet);
                break;
            default:
                alert("El numero ingresado no corresponde a ningun servicio.");
            }
}

function transferirDinero() {
    var cuentaAmiga1=1234567;
    var cuentaAmiga2=7654321;
    var montoATransferir = prompt("Ingrese el monto que desea transferir.");
    if (checkvaluetype(montoATransferir)) {
        if (montoATransferir>saldoCuenta) {
            alert("No hay suficiente saldo disponible. Ingrese un monto menor o igual a $ "+saldoCuenta);
        } else {
            numeroDeCuenta = prompt("Ingrese el numero de la cuenta destino de la transferencia.");
            if ((numeroDeCuenta!=cuentaAmiga1)&&(numeroDeCuenta!=cuentaAmiga2)) {
                alert("Solo puede transferir dinero a una cuenta amiga.");
            } else {
                saldoAnterior=saldoCuenta;
                restarDinero(montoATransferir);
                alert("Has transferido: $"+montoATransferir+"\nSaldo anterior: $"+saldoAnterior+"\nSaldo actual: $"+saldoCuenta+"\nCuenta Destino:"+numeroDeCuenta);
                actualizarSaldoEnPantalla(saldoCuenta);
            }
        }
    }
}

function iniciarSesion() {
    var clave=1234;
    var claveIngresada = prompt("Ingrese su codigo de seguridad.");
    if (clave != claveIngresada) {
        alert ("El codigo de seguridad ingresado es incorrecto. Sus fondos seran bloqueados momentaneamente por razones de seguridad.");
        saldoCuenta = 0;
        actualizarSaldoEnPantalla(saldoCuenta);
    }
    else {
            alert ("Bienvenido "+nombreUsuario+".\nYa puedes comenzar a realizar operaciones.");
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}