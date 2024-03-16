package com.xcheko51x.vetapp.response

data class ResponseLogin(
    val codigo: Int,
    val mensaje: String,
    val resultado: MutableList<String>
)