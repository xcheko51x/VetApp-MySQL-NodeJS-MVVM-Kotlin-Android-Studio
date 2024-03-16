package com.xcheko51x.vetapp.network

import com.xcheko51x.vetapp.models.ExpedienteUpdate
import com.xcheko51x.vetapp.models.Login
import com.xcheko51x.vetapp.response.ResponseExpediente
import com.xcheko51x.vetapp.response.ResponseExpedienteUpdate
import com.xcheko51x.vetapp.response.ResponseLogin
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface WebService {

    //LOGIN
    @POST("/login/")
    suspend fun login(
        @Body login: Login
    ): Response<ResponseLogin>

    // READ EXPEDIENTES
    @GET("/expedientes/{find}")
    suspend fun obtenerExpediente(
        @Path("find") find: String
    ): Response<ResponseExpediente>

    // UPDATE EXPEDIENTE
    @PUT("/expedientes/update/")
    suspend fun actualizarExpediente(
        @Body expediente: ExpedienteUpdate
    ): Response<ResponseExpedienteUpdate>
}