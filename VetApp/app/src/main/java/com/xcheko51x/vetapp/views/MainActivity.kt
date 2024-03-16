package com.xcheko51x.vetapp.views

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.ViewModelProvider
import com.xcheko51x.vetapp.R
import com.xcheko51x.vetapp.databinding.ActivityMainBinding
import com.xcheko51x.vetapp.models.Login
import com.xcheko51x.vetapp.viewmodels.MainViewModel

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        enableEdgeToEdge()
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        viewModel = ViewModelProvider(this)[MainViewModel::class.java]

        viewModel.mensaje.observe(this) {
            Toast.makeText(this, it, Toast.LENGTH_LONG).show()
        }

        binding.btnLogin.setOnClickListener {
            val login = Login(
                binding.titUsuario.text.toString().trim(),
                binding.titContrasena.text.toString().trim()
            )

            viewModel.login(this, login)
        }
    }
}