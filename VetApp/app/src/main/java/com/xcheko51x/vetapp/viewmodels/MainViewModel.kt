package com.xcheko51x.vetapp.viewmodels

import android.content.Context
import android.content.Intent
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.xcheko51x.vetapp.models.Login
import com.xcheko51x.vetapp.network.RetrofitClient
import com.xcheko51x.vetapp.views.MenuActivity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainViewModel: ViewModel() {

    private var _mensaje = MutableLiveData<String>()
    val mensaje: LiveData<String> get() = _mensaje

    fun login(context: Context, usuario: Login) {
        val isValido = validarCampos(usuario)

        if (isValido) {
            loginWebService(context, usuario)
        }
    }

    fun loginWebService(context: Context, usuario: Login) {
        viewModelScope.launch(Dispatchers.IO) {
            val response = RetrofitClient.webService.login(usuario)
            withContext(Dispatchers.Main) {
                //Log.d("API", response.body().toString())
                if (response.body()!!.codigo == 200) {
                    _mensaje.value = response.body()!!.mensaje

                    val intent = Intent(context, MenuActivity::class.java)
                    //intent.putExtra("usuario", usuario.usuario)
                    context.startActivity(intent)

                } else {
                    _mensaje.value = response.body()!!.mensaje
                }
            }
        }
    }

    fun validarCampos(usuario: Login): Boolean {
        if (
            usuario.usuario.isNullOrEmpty() ||
            usuario.contrasena.isNullOrEmpty()
            ) {
            _mensaje.value = "Faltan campos por llenar, revisalo e intentalo nuevamente"
            return false
        } else {
            return  true
        }
    }
}