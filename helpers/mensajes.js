require('colors');
const readline = require('readline');

const mostrarMenu = () => {
    return new Promise((resolve) => {
        console.clear();
        console.log('========================='.green);
        console.log('   Seleccione una opción'.white);
        console.log('=========================\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar una tarea`);
        console.log(`${'0.'.green} Salir\n`);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Seleccione una opción: ', (opt) => {
            rl.close();
            resolve(opt);
        });
    });
};

const pausa = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`\nPresione ${'ENTER'.green} para continuar\n`, () => {
            rl.close();
            resolve();
        });
    });
};

module.exports = {
    mostrarMenu,
    pausa
};
