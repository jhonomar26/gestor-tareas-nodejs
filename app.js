// Lo recomendable es que primero vayan las importaciones de terceros, después las nuestras
const { guardarDB, leerDB } = require('./helpers/guardarArchivo.js');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer.js');

const Tareas = require('./models/tareas.js');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        // Cargar tareas desde la base de datos
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        console.clear(); // Limpia la consola antes de mostrar el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1': {
                // Crear una tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            }
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true); // Solo completadas
                break;
            case '4':
                tareas.listarPendientesCompletadas(false); // Solo pendientes
                break;
            case '5': {
                // Completar o marcar tareas como pendientes
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            }
            case '6': {
                // Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro que desea borrarla?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.red);
                    }
                }
                break;
            }
        }

        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
}

main();
