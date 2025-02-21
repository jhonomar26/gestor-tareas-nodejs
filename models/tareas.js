const { red } = require("colors");
const Tarea = require("./tarea");

class Tareas {
    // Es un objeto que tiene una propiedad: id  y su valor, el objeto
    _listado = {};

    get listadoArr() {
        const listado = [];
        //  Object.keys(this._listado); Lo que hace es extraer todas las llaves de ese objeto
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;

    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        // this._listado[tarea.id] = tarea;
        tareas.forEach(objeto => {
            this._listado[objeto['id']] = objeto;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;


    }

    listadoCompleto() {
        console.log('======================================');
        console.log('Tareas'.green);
        console.log('======================================');
        this.listadoArr.forEach((tarea, id) => {
            // 1.  (verde) Descripcion de la tarea:: Completada verde| Pendiente Rojo
            const idx = `${id + 1}`.green;
            // Determinamos el estado del objeto
            const estado = tarea.completadoEn != null ? 'Completada'.green : 'Pendiente'.red;

            // Imprimimos el mensaje formateado
            console.log(`${idx}. ${tarea.desc} :: ${estado}`);

        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log('======================================');
        console.log('Tareas'.green);
        console.log('======================================');
        this.listadoArr.forEach((tarea, id) => {
            // 1.  (verde) Descripcion de la tarea:: Completada verde| Pendiente Rojo
            const idx = `${id + 1}`.green;
            // Determinamos el estado del objeto
            const { completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            if (completadas && completadoEn) {
                console.log(`${idx}. ${tarea.desc} :: ${completadoEn.green}`);
            } else {
                if (!completadas && !completadoEn) console.log(`${idx}. ${tarea.desc} :: ${estado}`);

            }
        })


    }
    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];

        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                console.log(`Antes: ${JSON.stringify(tarea)}`);
                tarea.completadoEn = new Date().toISOString();
                console.log(`Después: ${JSON.stringify(tarea)}`);
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                console.log(`Reseteando tarea: ${tarea.desc}`);
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}
module.exports = Tareas;