require('colors');

const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async() => {
    //console.log('hola CTM');
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);

    }
    //await pausa();
    do {
        opt = await inquirerMenu();
        //console.log({ opt });
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                //console.log(desc);
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;

            case '4':
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;



        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0') {
        //pausa();
    }

}




main();