// Declara un arreglo global (accesible desde cualquier función del script) para guardar las calificaciones promedio de los alumnos agregados.
let listaPromedios = [];

// Función encargada de extraer, convertir y validar los datos ingresados en los campos del formulario.
function obtenerDatosFormulario() {
    // Captura la cadena de texto ingresada en el campo de texto con id "nombre".
    let nombre = document.getElementById("nombre").value;
    
    // Captura el valor del campo con id "edad".
    let edad = document.getElementById("edad").value;

    // Extrae la cadena de texto de cada campo de calificación y la convierte a un número de punto flotante (decimal) usando parseFloat.
    let calificacion1 = parseFloat(document.getElementById("calificacion1").value);
    let calificacion2 = parseFloat(document.getElementById("calificacion2").value);
    let calificacion3 = parseFloat(document.getElementById("calificacion3").value);
    let calificacion4 = parseFloat(document.getElementById("calificacion4").value);

    // Primera estructura de validación: Comprueba si falta algún dato requerido.
    if (
        // .trim() remueve espacios en blanco al inicio y al final; verifica si el nombre quedó completamente vacío.
        nombre.trim() === "" ||
        // Comprueba si el campo de edad no contiene ningún valor escrito.
        edad === "" ||
        // isNaN() evalúa si el resultado de convertir cada entrada a número falló (Not-a-Number).
        isNaN(calificacion1) ||
        isNaN(calificacion2) ||
        isNaN(calificacion3) ||
        isNaN(calificacion4)
    ) {
        // Despliega una ventana emergente de alerta indicando que existen datos faltantes o inválidos.
        alert("Por favor, completa todos los datos correctamente.");
        // Detiene la ejecución de la función inmediatamente y regresa 'null' para indicar que hubo un error de validación.
        return null;
    }

    // Segunda estructura de validación: Comprueba que el rango numérico de las notas sea el permitido (0 a 10).
    if (
        calificacion1 < 0 || calificacion1 > 10 ||
        calificacion2 < 0 || calificacion2 > 10 ||
        calificacion3 < 0 || calificacion3 > 10 ||
        calificacion4 < 0 || calificacion4 > 10
    ) {
        // Alerta al usuario si alguna de las calificaciones ingresadas se sale del rango permitido.
        alert("Las calificaciones deben ser valores entre 0 y 10.");
        // Detiene la función y devuelve 'null'.
        return null;
    }

    // Suma las cuatro calificaciones y las divide entre 4 para obtener la media aritmética del alumno.
    let promedio = (calificacion1 + calificacion2 + calificacion3 + calificacion4) / 4;

    // Variable encargada de guardar el mensaje de retroalimentación según el rendimiento.
    let mensaje = "";
    
    // Evalúa si el promedio se encuentra en el rango de 9.0 a 10.
    if (promedio >= 9.0 && promedio <= 10) {
        mensaje = "Excelente";
    // Evalúa si el promedio está entre 8.0 y 8.99.
    } else if (promedio >= 8.0 && promedio <= 8.99) {
        mensaje = "Muy bien";
    // Evalúa si el promedio está entre 7.0 y 7.99.
    } else if (promedio >= 7.0 && promedio <= 7.99) {
        mensaje = "Bien";
    // Evalúa si el promedio está entre 6.5 y 6.99.
    } else if (promedio >= 6.5 && promedio <= 6.99) {
        mensaje = "Piensa en conta";
    // Evalúa si el promedio está entre 6.0 y 6.49.
    } else if (promedio >= 6.0 && promedio <= 6.49) {
        mensaje = "Date de baja";
    // Evalúa si el promedio está reprobado (de 0 a 5.99).
    } else if (promedio >= 0 && promedio <= 5.99) {
        mensaje = "Vete a turismo :D";
    }

    // Devuelve un objeto de JavaScript con todos los datos procesados listos para ser utilizados por las otras funciones.
    return { nombre, edad, promedio, mensaje };
}

// Función asociada al primer botón: Muestra únicamente los datos y promedio del alumno actual.
function calcularPromedio() {
    // Llama a la función de extracción de datos para obtener los valores validados.
    let datos = obtenerDatosFormulario();
    // Si la validación falló (devuelve null), interrumpe el proceso y no muestra ningún resultado.
    if (!datos) return;

    // Modifica el contenido HTML del contenedor div con id "resultado" para renderizar la información formateada.
    // .toFixed(2) recorta el número de promedio a un máximo de 2 decimales.
    document.getElementById("resultado").innerHTML =
        "<strong>Alumno:</strong> " + datos.nombre + "<br>" +
        "<strong>Edad:</strong> " + datos.edad + " años<br>" +
        "<strong>Promedio:</strong> " + datos.promedio.toFixed(2) + "<br><br>" +
        "<strong>Estatus:</strong> " + datos.mensaje;
}

// Función asociada al segundo botón: Registra al alumno en la lista global y calcula el promedio acumulado del grupo.
function agregarAlumno() {
    // Obtiene y valida los datos actuales del formulario.
    let datos = obtenerDatosFormulario();
    // Si la validación falló, finaliza la ejecución sin alterar la lista.
    if (!datos) return;

    // Agrega el valor numérico del promedio del alumno al final del arreglo global 'listaPromedios'.
    listaPromedios.push(datos.promedio);

    // Variable acumuladora para almacenar la suma de todas las notas del grupo.
    let sumaTotal = 0;
    
    // Bucle 'for' que recorre cada elemento del arreglo 'listaPromedios'.
    for (let i = 0; i < listaPromedios.length; i++) {
        // Suma el valor de la posición actual 'i' a la variable acumuladora.
        sumaTotal += listaPromedios[i];
    }
    
    // Calcula la media aritmética del grupo dividiendo el total sumado entre el número total de elementos del arreglo.
    let promedioGeneral = sumaTotal / listaPromedios.length;

    // Actualiza el contenedor "resultado" para confirmar que el alumno fue registrado con éxito.
    document.getElementById("resultado").innerHTML =
        "<strong>¡Alumno Agregado!</strong><br>" +
        "<strong>Alumno:</strong> " + datos.nombre + "<br>" +
        "<strong>Promedio:</strong> " + datos.promedio.toFixed(2);

    // Actualiza el contenedor "resultado-general" para mostrar las estadísticas globales actualizadas.
    // listaPromedios.length da la cantidad total de alumnos que se han guardado hasta el momento.
    document.getElementById("resultado-general").innerHTML =
        "<strong>--- PROMEDIO GENERAL DE ALUMNOS ---</strong><br>" +
        "<strong>Total de Alumnos:</strong> " + listaPromedios.length + "<br>" +
        "<strong>Promedio Grupal:</strong> " + promedioGeneral.toFixed(2);
}

// Función asociada al tercer botón: Restablece todos los campos del formulario a su estado original.
function limpiarFormulario() {
    // Limpia las cajas de texto estableciendo sus valores en cadenas vacías ("").
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("calificacion1").value = "";
    document.getElementById("calificacion2").value = "";
    document.getElementById("calificacion3").value = "";
    document.getElementById("calificacion4").value = "";
    
    // Vacía el contenido visual del contenedor de resultados individuales.
    document.getElementById("resultado").innerHTML = "";
}