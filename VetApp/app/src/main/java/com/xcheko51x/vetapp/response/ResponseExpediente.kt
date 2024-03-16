package com.xcheko51x.vetapp.response

import com.xcheko51x.vetapp.models.Expediente

data class ResponseExpediente(
    val codigo: Int,
    val mensaje: String,
    val resultado: MutableList<Expediente>
)