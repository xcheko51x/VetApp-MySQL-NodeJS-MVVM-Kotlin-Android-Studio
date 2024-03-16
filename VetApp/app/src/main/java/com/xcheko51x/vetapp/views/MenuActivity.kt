package com.xcheko51x.vetapp.views

import android.app.Activity
import android.opengl.Visibility
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.ViewModelProvider
import com.xcheko51x.vetapp.R
import com.xcheko51x.vetapp.databinding.ActivityMenuBinding
import com.xcheko51x.vetapp.models.ExpedienteUpdate
import com.xcheko51x.vetapp.viewmodels.MenuViewModel

class MenuActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMenuBinding

    private lateinit var viewModel: MenuViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMenuBinding.inflate(layoutInflater)
        enableEdgeToEdge()
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        viewModel = ViewModelProvider(this)[MenuViewModel::class.java]

        viewModel.mensaje.observe(this) {
            Toast.makeText(this, it, Toast.LENGTH_LONG).show()
        }

        viewModel.expediente.observe(this) {
            binding.tvIdExpediente.text = it.id_expediente
            binding.tvNomMascota.text = it.nom_mascota
            binding.tvEdad.text = it.edad.toString()
            binding.tvRaza.text = it.raza
            binding.tvNomVeterinario.text = it.nom_veterinario
            binding.tvSintomas.text = it.sintomas
            binding.etSintomas.setText(it.sintomas)
            binding.tvTratamiento.text = it.tratamiento
            binding.etTratamiento.setText(it.tratamiento)
        }

        binding.btnFind.setOnClickListener {
            viewModel.expediente(binding.titExpNom.text.toString().trim())
        }


        binding.btnEditar.setOnClickListener {
            binding.tvSintomas.visibility = View.GONE
            binding.etSintomas.visibility = View.VISIBLE

            binding.tvTratamiento.visibility = View.GONE
            binding.etTratamiento.visibility = View.VISIBLE

            binding.btnActualizar.visibility = View.VISIBLE
        }

        binding.btnActualizar.setOnClickListener {
            val expedienteUpdate = ExpedienteUpdate(
                binding.tvIdExpediente.text.toString().trim(),
                binding.etSintomas.text.toString().trim(),
                binding.etTratamiento.text.toString().trim()
            )

            viewModel.updateExpediente(expedienteUpdate)

            binding.titExpNom.setText("")

            binding.tvSintomas.visibility = View.VISIBLE
            binding.etSintomas.visibility = View.GONE

            binding.tvTratamiento.visibility = View.VISIBLE
            binding.etTratamiento.visibility = View.GONE

            binding.btnActualizar.visibility = View.GONE
        }

        binding.btnLogout.setOnClickListener { finish() }
    }
}