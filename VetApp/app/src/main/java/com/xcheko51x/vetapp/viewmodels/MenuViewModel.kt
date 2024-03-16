package com.xcheko51x.vetapp.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.xcheko51x.vetapp.models.Expediente
import com.xcheko51x.vetapp.models.ExpedienteUpdate
import com.xcheko51x.vetapp.network.RetrofitClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MenuViewModel: ViewModel() {

    private var _mensaje = MutableLiveData<String>()
    val mensaje: LiveData<String> get() = _mensaje

    private var _expediente = MutableLiveData<Expediente>()
    val expediente: LiveData<Expediente> get() = _expediente

    fun expediente(expediente: String) {
        val isValido = validarCampo(expediente)

        if (isValido) {
            obtenerExpediente(expediente)
        }
    }

    fun validarCampo(expediente: String): Boolean {
        if (expediente.isNullOrEmpty()) {
            _mensaje.value = "Tienes que poner el expediente a buscar o el nombre de la mascota, revisalo e intentalo nuevamente"
            return false
        } else {
            return  true
        }
    }

    fun updateExpediente(expedienteUpdate: ExpedienteUpdate) {
        val isValido = validarCampos(expedienteUpdate)

        if (isValido) {
            actualizarExpediente(expedienteUpdate)
        }
    }

    fun obtenerExpediente(expediente: String) {
        //Log.d("EXP", expediente)
        viewModelScope.launch(Dispatchers.IO) {
            val response = RetrofitClient.webService.obtenerExpediente(expediente)
            withContext(Dispatchers.Main) {
                //Log.d("API2", response.body().toString())
                _expediente.value = response.body()!!.resultado[0]
                //Log.d("API2", response.body()!!.resultado[0].toString())
            }
        }
    }

    fun validarCampos(expediente: ExpedienteUpdate): Boolean {
        if (
            expediente.id_expediente.isNullOrEmpty() ||
            expediente.sintomas.isNullOrEmpty() ||
            expediente.tratamiento.isNullOrEmpty()
        ) {
            _mensaje.value = "Algo salio mal, vuelve a intentarlo"
            return false
        } else {
            return true
        }
    }

    fun actualizarExpediente(expediente: ExpedienteUpdate) {
        viewModelScope.launch(Dispatchers.IO) {
            val response = RetrofitClient.webService.actualizarExpediente(expediente)
            withContext(Dispatchers.Main) {
                //Log.d("API4", response.body().toString())
                if (response.body()!!.codigo == 200) {
                    _mensaje.value = response.body()!!.mensaje

                    _expediente.value = Expediente(
                        0,
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                    )

                } else {
                    _mensaje.value = response.body()!!.mensaje
                }
            }
        }
    }

}