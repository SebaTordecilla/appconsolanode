require('colors');

const {
    inquirerMenu,
    pausa,
    leerInput
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


        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0') {
        //pausa();
    }

}




main();