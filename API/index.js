const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host:'localhost',
        database: 'db_sys_vet',
        user: 'root',
        password: ''
    }
)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexión exitosa a la base de datos');
})

app.get('/', (req, res) => {
    res.send('API')
})

app.post('/login/', (req, res)=> {
    
    const objeto = {}

    const login = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    }

    const query = `SELECT * FROM usuarios WHERE usuario='${login.usuario}' AND contrasena='${login.contrasena}';`

    conexion.query(query, (error, result) => {

        if (error) return console.error(error.message)

        if(result.length == 1) {

            objeto.codigo = 200
            objeto.mensaje = `Bienvenido a SysVet ${login.usuario}`,
            objeto.resultado = []

        } else {

            objeto.codigo = 400
            objeto.mensaje = "Lo sentimos no existe el registro, contacta a soporte",
            objeto.resultado = []
        }

        res.send(objeto)

    })
})





// MASCOTAS //

// MASCOTA READ ID_MASCOTA
app.get('/mascotas/', (req, res) => {

    const { id_mascota } = req.query

    if(!id_mascota) {

        objeto.codigo = 400
        objeto.mensaje = "Lo sentimos, falta el campo obligatorio"
        objeto.resultado = []

    } else {

        const query = `SELECT * FROM mascotas WHERE id_mascota='${id_mascota}';`

        conexion.query(query, (error, result) => {
            if(error) return console.error(error.message)
            
            if(result.length == 1) {
                objeto.codigo = 200
                objeto.mensaje = "Mascota registrada"
                objeto.resultado = result
            } else {
                objeto.codigo = 200
                objeto.mensaje = "No hay registros de mascotas"
                objeto.resultado = []
            }

        })

    }

    res.send(objeto)
    
})

// MASCOTAS READ
app.get('/mascotas/', (req, res) => {

    const query = `SELECT * FROM mascotas`

    conexion.query(query, (error, result) => {

        if(error) return console.error(error.message)
        
        if(result.length > 0) {

            objeto.codigo = 200
            objeto.mensaje = "Lista mascotas registradas"
            objeto.resultado = result

        } else {

            objeto.codigo = 400
            objeto.mensaje = "No hay registros de mascotas"
            objeto.resultado = []

        }

        res.send(objeto)

    })
})

// MASCOTAS ADD
app.post('/mascotas/add', (req, res) => {

    const milisegundos = Date.now()

    const mascota = {
        nom_mascota: req.body.nom_mascota,
        edad: req.body.edad,
        raza: req.body.raza,
        id_dueno: req.body.id_dueno,
        especie: req.body.especie
    }

    mascota.id_mascota = milisegundos

    if(
        !mascota.nom_mascota ||
        !mascota.edad ||
        !mascota.raza ||
        !mascota.id_dueno ||
        !mascota. especie
    ) {

        objeto.codigo = 400
        objeto.mensaje = "Lo sentimos, faltan campos obligatorios revisalos nuevamente"
        objeto.resultado = []

    } else {
        
        const query = `INSERT INTO mascotas SET ?;`

        conexion.query(query, mascota, (error, result) => {

            if (error) return console.error(error.message)

            objeto.codigo = 200
            objeto.mensaje = "Se inserto correctamente la mascota"
            objeto.resultado = []
            
        })
        
    }

    res.send(objeto)

})

// MASCOTA UPDATE ID
app.put('/mascotas/update/', (req, res) => {
    const mascota = {
        id_mascota: req.body.id_mascota,
        nom_mascota: req.body.nom_mascota,
        edad: req.body.edad,
        raza: req.body.raza,
        id_dueno: req.body.id_dueno,
        especie: req.body.especie
    }

    if(
        !mascota.nom_mascota ||
        !mascota.edad ||
        !mascota.raza ||
        !mascota.id_dueno ||
        !mascota. especie
    ) {

        objeto.codigo = 400
        objeto.mensaje = "Lo sentimos, faltan campos obligatorios revisalos nuevamente"
        objeto.resultado = []

    } else {

        const query = `
            UPDATE mascotas 
            SET 
                nom_mascota='${mascota.nom_mascota}',
                edad='${mascota.edad}',
                raza='${mascota.raza}',
                id_dueno='${mascota.id_dueno}',
                especie='${mascota.especie}'
            WHERE id_mascota='${mascota.id_mascota}';
        `

        conexion.query(query, mascota, (error, result) => {

            if (error) return console.error(error.message)

            objeto.codigo = 200
            objeto.mensaje = "Se actualizo correctamente la mascota"
            objeto.resultado = []

        })

    }

    res.send(objeto)

})





// DUEÑOS //

// DUENO READ ID_DUENO
app.get('/duenos/', (req, res) => {

    const { id_dueno } = req.query

    if(!id_dueno) {

        objeto.codigo = 400
        objeto.mensaje = "Lo sentimos, falta el campo obligatorio"
        objeto.resultado = []

    } else {

        const query = `SELECT * FROM duenos WHERE id_dueno='${id_dueno}';`

        conexion.query(query, (error, result) => {
            if(error) return console.error(error.message)
            
            if(result.length == 1) {
                objeto.codigo = 200
                objeto.mensaje = "Dueno registrado"
                objeto.resultado = result
            } else {
                objeto.codigo = 200
                objeto.mensaje = "No hay registros del dueno"
                objeto.resultado = []
            }

        })

    }

    res.send(objeto)
    
})

// READ 
app.get('/duenos/', (req, res) => {

    const query = `SELECT * FROM duenos`

    conexion.query(query, (error, result) => {

        if(error) return console.error(error.message)
        
        if(result.length > 0) {

            objeto.codigo = 200
            objeto.mensaje = "Lista duenos registrados"
            objeto.resultado = result

        } else {

            objeto.codigo = 400
            objeto.mensaje = "No hay registros de duenos"
            objeto.resultado = []

        }

        res.send(objeto)

    })
})

// DUENOS ADD
app.post('/duenos/add', (req, res) => {

    const milisegundos = Date.now()

    const dueno = {
        nombre: req.body.nombre,
        ap_paterno: req.body.ap_paterno,
        ap_materno: req.body.ap_materno,
        tel: req.body.tel
        
    }

    dueno.id_dueno = milisegundos

    if(
        !dueno.nombre ||
        !dueno.ap_paterno ||
        !dueno.ap_materno
    ) {

        objeto.codigo = 400
        objeto.mensaje = "Lo sentimos, faltan campos obligatorios revisalos nuevamente"
        objeto.resultado = []

    } else {
        
        const query = `
        INSERT INTO duenos 
        VALUES(
            '${dueno.id_dueno}',
            '${dueno.nombre}',
            '${dueno.ap_paterno}',
            '${dueno.ap_materno}',
            '${dueno.tel}'
        ) 
        `

        conexion.query(query, (error, result) => {

            if (error) return console.error(error.message)

            objeto.codigo = 200
            objeto.mensaje = "Se inserto correctamente el dueno"
            objeto.resultado = []
            
        })
        
    }

    res.send(objeto)

})

// DUENO UPDATE ID
app.put('/duenos/update/', (req, res) => {
    const dueno = {
        id_dueno: req.body.id_dueno,
        nombre: req.body.nombre,
        ap_paterno: req.body.ap_paterno,
        ap_materno: req.body.ap_materno,
        tel: req.body.tel
    }

    if(
        !dueno.id_dueno ||
        !dueno.nombre ||
        !dueno.ap_paterno ||
        !dueno.ap_materno
    ) {

        objeto.codigo = 400
        objeto.mensaje = "Lo sentimos, faltan campos obligatorios revisalos nuevamente"
        objeto.resultado = []

    } else {

        const query = `
            UPDATE duenos 
            SET 
                nombre='${dueno.nombre}',
                ap_paterno='${dueno.ap_paterno}',
                ap_materno='${dueno.ap_materno}',
                tel='${dueno.tel}'
            WHERE id_dueno='${dueno.id_dueno}';
        `

        conexion.query(query, dueno, (error, result) => {

            if (error) return console.error(error.message)

            objeto.codigo = 200
            objeto.mensaje = "Se actualizo correctamente el dueno"
            objeto.resultado = []

        })

    }

    res.send(objeto)

})





// EXPEDIENTES //

// EXPEDIENTES READ ID
app.get('/expedientes/:find', (req, res) => {

    const objeto = {}

    const { find } = req.params

    const query = `SELECT 
    e.id_expediente, 
    e.id_dueno, 
    e.id_mascota, 
    u.nom_veterinario, 
    e.sintomas, 
    e.tratamiento, 
    e.fecha_consulta, 
    m.nom_mascota, 
    m.edad, 
    m.raza, 
    m.especie 
FROM 
    expedientes e, 
    mascotas m, 
    usuarios u 
WHERE 
    m.nom_mascota='${find}' || e.id_expediente='${find}';`

    conexion.query(query, (error, result) => {
        if(error) return console.error(error.message)
        
        if(result.length == 1) {
            objeto.codigo = 200
            objeto.mensaje = "Expediente registrado"
            objeto.resultado = result
        } else {
            objeto.codigo = 400
            objeto.mensaje = "No existe ese expediente, revisalo nuevamente"
            objeto.resultado = []
        }

        res.send(objeto)

    })
    
})

// EXPEDIENTES ADD
app.post('/expedientes/add', (req, res) => {

    const milisegundos = Date.now()

    const expediente = {
        id_mascota: req.body.id_mascota,
        id_dueno: req.body.id_dueno,
        sintomas: req.body.sintomas,
        tratamiento:req.body.tratamiento,
        fecha_consulta: req.body.fecha_consulta,
        usuario: req.body.usuario
    }

    expediente.id_expediente = milisegundos

    if(
        !expediente.id_mascota ||
        !expediente.id_dueno ||
        !expediente.sintomas ||
        !expediente.tratamiento ||
        !expediente.fecha_consulta ||
        !expediente.usuario
    ) {

        objeto.codigo = 400
        objeto.mensaje = "Lo sentimos, faltan campos obligatorios revisalos nuevamente"
        objeto.resultado = []

    } else {
        
        const query = `
        INSERT INTO expedientes 
        VALUES(
            '${expediente.id_expediente}',
            '${expediente.id_dueno}',
            '${expediente.id_mascota}',
            '${expediente.usuario}',
            '${expediente.sintomas}',
            '${expediente.tratamiento}',
            '${expediente.fecha_consulta}'
        ) 
        `

        conexion.query(query, (error, result) => {

            if (error) return console.error(error.message)

            objeto.codigo = 200
            objeto.mensaje = "Se inserto correctamente el expediente"
            objeto.resultado = []
            
        })
        
    }

    res.send(objeto)

})

// EXPEDIENTES UPDATE ID
app.put('/expedientes/update/', (req, res) => {

    var date = new Date()

    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()

    if(month < 10){
    month = `0${month}`
    }

    if(day < 10) {
    day = `0${day}`
    }

    const objeto = {}

    const expediente = {
        id_expediente: req.body.id_expediente,
        sintomas: req.body.sintomas,
        tratamiento:req.body.tratamiento
    }

    expediente.fecha_consulta = `${year}-${month}-${day}`

    if(
        !expediente.id_expediente ||
        !expediente.sintomas ||
        !expediente.tratamiento
    ) {

        objeto.codigo = 400
        objeto.mensaje = "Lo sentimos, faltan campos obligatorios revisalos nuevamente"
        objeto.resultado = []

    } else {
        
        const query = `
        UPDATE expedientes 
        SET 
            sintomas='${expediente.sintomas}',
            tratamiento='${expediente.tratamiento}',
            fecha_consulta='${expediente.fecha_consulta}' 
        WHERE 
            id_expediente='${expediente.id_expediente}'
        `

        conexion.query(query, (error, result) => {

            if (error) return console.error(error.message)

            objeto.codigo = 200
            objeto.mensaje = "Se actualizo correctamente el expediente"
            objeto.resultado = []
     
            res.send(objeto)
        })
        
    }

})