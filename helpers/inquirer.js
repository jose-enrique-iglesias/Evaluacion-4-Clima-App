const { green } = require('colors');
const inquirer = require('inquirer');
require('colors');
//envio de informacion de manera automatica
let preguntas=[
    {
        type: 'list',
        name: 'opcion',
        message: 'que desea hacer?',
        choices: [
            {
                value:1,
                name:`${'1.'.green} Crear tarea`
            },
            {
                value:2,
                name:`${'2.'.green} Listar Tareas`
            },
            {
                value:0,
                name:`${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu = async()=>{
    console.clear();
    console.log('======================='.green);
    console.log('Seleccione una opcion'.white );
    console.log('=======================\n'.green);

    //Se espera el parametro que se ingresara
    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
};

const pausa = async()=>{
    const question = [
        {
            type:'input',
            name:'enter',
            message:`Presione ${'enter'.green} para continuar`
        }
    ];
    console.log('\n')
    await inquirer.prompt(question);
}

const leerInput = async(message) =>{
    const question = [
        {
            type:'input', //valor de entrada
            name: 'desc', //generador de desestructuracion
            message, //mensaje
            validate(value){
                if(value.length===0){
                    return "Por favor ingrese un valor";
                }
                return true;
            }
        }
    ];
    //aplicamos la desestructuracion
    const {desc}=await inquirer.prompt(question);
    return desc;
}


const listadoLugares= async(lugares=[])=>{
    //con estas lineas de codigo se manipulara la informacion que esta proporcionando el sistema
    const  choices = lugares.map((lugar, i )=>{
        const idx = `${i+1}.`.green;
        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });
    //Se reciben las preguntas
    choices.unshift({
        value: '0',
        name: '0.'.green+'Cancelar'
    });
    const preguntas=[
        {
            type:'list',
            name:'id',
            message:'Seleccionar Lugar: ',
            choices
        }
    ]
    const{id}=await inquirer.prompt(preguntas);
    return id;
}

const mostrarListadoChecklist = async(tareas=[])=>{
    const  choices = tareas.map((tarea, i )=>{
        const idx = `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }
    });
    const pregunta=[
        {
            type:'checkbox',
            name:'ids',
            message:'Seleccionar lugar',
            choices
        }
    ]
    const{ids}=await inquirer.prompt(preguntas);
    return ids;
}

const confirmar = async (message)=>{
    //Se genera el menu de preguntas y opciones
    const question =[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok
}

module.exports = {
     inquirerMenu, 
     pausa,
     leerInput,
     listadoLugares,
     confirmar,
     mostrarListadoChecklist
};