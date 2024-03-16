package com.xcheko51x.vetapp.models

data class Expediente(
    var edad: Int,
    val especie: String,
    val fecha_consulta: String,
    val id_dueno: String,
    var id_expediente: String,
    val id_mascota: String,
    var nom_mascota: String,
    var nom_veterinario: String,
    var raza: String,
    var sintomas: String,
    var tratamiento: String
)

data class ExpedienteUpdate(
    val id_expediente: String,
    val sintomas: String,
    val tratamiento: String
)
