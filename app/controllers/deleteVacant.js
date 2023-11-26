window.addEventListener('DOMContentLoaded', (event) => {

    // Asigna el event listener a todos los botones con la clase 'btn-delete'
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', deleteItem);
    });
});

function deleteItem(event) {
    // Previene el comportamiento predeterminado del botón, si es necesario
    event.preventDefault();
    // Obtiene el ID del registro desde el atributo data-id del botón
    const Jobid = this.getAttribute('data-id');
    console.log('Delete button clicked with data-id:', Jobid);
    
    // Realiza la solicitud DELETE al servidor
    fetch(`http://localhost:3000/jobs/delete/${Jobid}`, { // Asegúrate de reemplazar `/route/` con tu ruta de API real
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Registro eliminado exitosamente: ",data.message);
            window.location.href = './publisher';

        } else {
            alert('Error al eliminar el registro:', data.message);
            // Maneja el caso de error, por ejemplo, mostrando un mensaje al usuario
        }
    })
    .catch(error => {
        console.error('Error en la petición fetch:', error);
    });
}
