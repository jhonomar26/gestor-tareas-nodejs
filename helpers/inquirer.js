const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            { value: '1', name: `${'1.'.green} Crear tarea` },
            { value: '2', name: `${'2.'.green} Listar tareas` },
            { value: '3', name: `${'3.'.green} Listar tareas completadas` },
            { value: '4', name: `${'4.'.green} Listar tareas pendientes` },
            { value: '5', name: `${'5.'.green} Completar tareas` },
            { value: '6', name: `${'6.'.green} Borrar tarea` },
            { value: '0', name: `${'0.'.green} Salir` },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('   Seleccione una opción'.white);
    console.log('=========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        },
    ]);
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                return value.length === 0 ? 'Por favor ingrese un valor' : true;
            },
        },
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => ({
        value: tarea.id,
        name: `${`${i + 1}.`.green} ${tarea.desc}`,
    }));

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`.red,
    });

    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea a borrar:',
            choices,
        },
    ]);
    return id;
};

const confirmar = async (message) => {
    const { ok } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'ok',
            message,
        },
    ]);
    return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => ({
        value: tarea.id,
        name: `${`${i + 1}.`.green} ${tarea.desc}`,
        checked: !!tarea.completadoEn,
    }));

    const { ids } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione tareas a completar:',
            choices,
        },
    ]);
    return ids;
};

// Exportar funciones
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
};
