//const url = 'https://api-servicio-k24k.onrender.com/servicios'
const url = 'http://localhost:8282/servicios '

const regresarListar = () => {
    window.location.href = 'index.html';
}

const recargarListarServicio= () => {
    listarServicio();
};
const cogerPrecioDolar = async () => {
    try {
        const response = await fetch('https://www.datos.gov.co/resource/mcec-87by.json');
        if (!response.ok) {
            throw new Error('Error al capturar el dólar');
        }
        const data = await response.json();
        const precioDolar = parseFloat(data[0].valor);
        document.getElementById('precioDolar').value = precioDolar.toFixed(2);
    } catch (error) {
    }
};

document.addEventListener('DOMContentLoaded', cogerPrecioDolar);
const listarServicio = async () => {

    let objectId = document.getElementById('contenido')
    let contenido = '';
    await cogerPrecioDolar();
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())
        .then(function (data) {
            let listarServicios = data.msg

            listarServicios.map(function (servicio) {
                objetoServicio = Object.keys(servicio).map(key => key + '=' + encodeURIComponent(servicio[key])).join('&');
            
                contenido = contenido + '<tr>' +
                    '<td>' + servicio.idServicio + '</td>' +
                    '<td>' + servicio.nombreServicio + '</td>' +
                    '<td>' + servicio.precioServicio + '</td>' +
                    '<td>' + servicio.frecuenciaServicio + '</td>' +
                    '<td>' + servicio.fechaInicio + '</td>' +
                    '<td>' + servicio.fechaFin + '</td>' +
                    '<td>' + servicio.precioDolar + '</td>' +
                    '<td>' + servicio.observaciones + '</td>' +
                    '<td> <button type="button" onclick="redireccionarEditar(\'' + objetoServicio + '\')" class="btn btn-success">Editar: servicio</button></td>' +
                    '<td> <button type="button" class="btn btn-danger btnEliminar" onclick="eliminarServicio(\'' + servicio.idServicio + '\');">Eliminar</button></td>' +
                    '</tr>';
            });
            
            objectId.innerHTML = contenido;
 
        })
}

const registrarServicios = () => {

    const idServicios = document.getElementById('idServicio').value
    const nombreServicios = document.getElementById('nombreServicio').value
    const precioServicios = document.getElementById('precioServicio').value
    const frecuenciaServicios = document.getElementById('frecuenciaServicio').value
    const fechaInicios = document.getElementById('fechaInicio').value
    const fechaFins = document.getElementById('fechaFin').value
    const precioDolars = document.getElementById('precioDolar').value
    const observacioness = document.getElementById('observaciones').value



    if (idServicios.length == 0) {
        document.getElementById('idHelp').innerHTML = 'Dato requerido'

    }
    else if (nombreServicios.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (precioServicios == 0) {
        document.getElementById('precioHelp').innerHTML = 'Dato requerido'
    }
    else if (frecuenciaServicios == 0) {
        document.getElementById('frecuenciaHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaInicios == 0) {
        document.getElementById('fechainicioHelp').innerHTML = 'Dato requerido'
    }

    else if (fechaFins == 0) {
        document.getElementById('fechacinHelp').innerHTML = 'Dato requerido'
    }
    else if (precioDolars == 0) {
        document.getElementById('precioDolarHelp').innerHTML = 'Dato requerido'
    }
    else if (observacioness == 0) {
        document.getElementById('observacionesHelp').innerHTML = 'Dato requerido'
    }
     else {
        let servicio = {
            idServicio: idServicios,
            nombreServicio: nombreServicios,
            precioServicio: precioServicios,
            frecuenciaServicio: frecuenciaServicios,
            fechaInicio: fechaInicios,
            fechaFin: fechaFins,
            precioDolar:precioDolars,
            observaciones:observacioness
        }

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(servicio),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "editada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    regresarListar();
                }, 2000);
                // regresarListar(); // Esto está comentado, puedes descomentarlo si deseas redirigir después de registrar
            })
            cogerPrecioDolar();
            
    }
}



const eliminarServicio = async (idServicio) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ idServicio })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "error",
            title: "eliminada exitosamente",
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            regresarListar();
        }, 2000);

        // Puedes realizar alguna acción adicional después de eliminar, como recargar la lista de donaciones
        // por ejemplo:
        // recargarListaDonaciones();
    } catch (error) {
        console.error('Error al eliminar el servicio:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('Error al eliminar la donación. Por favor, inténtalo de nuevo más tarde.');
    }
};



const actualizarServicio = () => {

    const idServicios = document.getElementById('idServicio').value
    const nombreServicios = document.getElementById('nombreServicio').value
    const precioServicios = document.getElementById('precioServicio').value
    const frecuenciaServicios = document.getElementById('frecuenciaServicio').value
    const fechaInicios = document.getElementById('fechaInicio').value
    const fechaFins = document.getElementById('fechaFin').value
    const precioDolars = document.getElementById('precioDolar').value
    const observacioness = document.getElementById('observaciones').value


    if (idServicios.length == 0) {
        document.getElementById('idHelp').innerHTML = 'Dato requerido'

    }
    else if (nombreServicios.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (precioServicios == 0) {
        document.getElementById('precioHelp').innerHTML = 'Dato requerido'
    }
    else if (frecuenciaServicios == 0) {
        document.getElementById('frecuenciaHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaInicios == 0) {
        document.getElementById('fechainicioHelp').innerHTML = 'Dato requerido'
    }

    else if (fechaFins == 0) {
        document.getElementById('fechacinHelp').innerHTML = 'Dato requerido'
    }
    else if (precioDolars == 0) {
        document.getElementById('precioDolarHelp').innerHTML = 'Dato requerido'
    }
    else if (observacioness == 0) {
        document.getElementById('observacionesHelp').innerHTML = 'Dato requerido'
    }
     else {
        let servicio = {
            idServicio: idServicios,
            nombreServicio: nombreServicios,
            precioServicio: precioServicios,
            frecuenciaServicio: frecuenciaServicios,
            fechaInicio: fechaInicios,
            fechaFin: fechaFins,
            precioDolar:precioDolars,
            observaciones:observacioness
        }
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(servicio), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "actualizada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    regresarListar();
                }, 2000);
                //Imprimir el mensaje de la transacción
            })
            cogerPrecioDolar();
    }

}

const redireccionarEditar = (servicio) => {
    document.location.href = "editarServicio.html?servicio" + servicio
}

const editarServicio = () => {
    var urlparams = new URLSearchParams(window.location.search);

    document.getElementById('idServicio').value = urlparams.get('idServicio');
    document.getElementById('nombreServicio').value = urlparams.get('nombreServicio');
    document.getElementById('precioServicio').value = urlparams.get('precioServicio');
    document.getElementById('frecuenciaServicio').value = urlparams.get('frecuenciaServicio');
    document.getElementById('fechaInicio').value = urlparams.get('fechaInicio');
    document.getElementById('fechaFin').value = urlparams.get('fechaFin');
    document.getElementById('precioDolar').value = urlparams.get('precioDolar');
    document.getElementById('observaciones').value = urlparams.get('observaciones');


}








if (document.querySelector('#btnRegistrar')) { //Si objeto exitste
    document.querySelector('#btnRegistrar').addEventListener('click', registrarServicios)
}

if (document.querySelector('#btnActualizar')) {//Si objeto existe
    document.querySelector('#btnActualizar').addEventListener('click', actualizarServicio)
}

if (document.querySelector('#btnEliminar')) {//Si objeto existe
    document.querySelector('#btnEliminar')
        .addEventListener('click', eliminarServicio)

}