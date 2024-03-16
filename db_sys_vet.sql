create database db_sys_vet;

create table mascotas(
    id_mascota varchar(20) primary key,
    nom_mascota varchar(50) not null,
    edad int not null,
    raza varchar(50) not null,
    id_dueno varchar(20) not null,
    especie varchar(50) not null
);

create table duenos(
    id_dueno varchar(20) primary key,
    nombre varchar(50) not null,
    ap_paterno varchar(50) not null,
    ap_materno varchar(50) not null,
    tel varchar(15)
);

create table usuarios(
    usuario varchar(10) primary key,
    contrasena varchar(10) not null,
    nom_veterinario varchar(100) not null,
    tel varchar(15)
);

create table expedientes(
    id_expediente varchar(20) primary key,
    id_dueno varchar(20) not null,
    id_mascota varchar(20) not null,
    usuario varchar(10) not null,
    sintomas text not null,
    tratamiento text not null,
    fecha_consulta date not null
);