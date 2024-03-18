-- Active: 1706143260686@@127.0.0.1@5432@api_rest

create table tbl_rol 
(
    id serial PRIMARY key,
    nombre_rol varchar(200), 
    fecha_creacion TIMESTAMP DEFAULT current_timestamp, 
    activo BOOLEAN DEFAULT true
);

INSERT INTO tbl_rol (nombre_rol) VALUES 
    ('cliente'),
    ('admin');


create table tbl_usuarios 
(
    nombre_usuario  varchar(20) primary key,
    correo_electronico varchar(50),
    contrasena varchar(20),
    nombre varchar(200),
    apellido varchar(200),
    id_rol int,
    fecha_creacion TIMESTAMP DEFAULT current_timestamp, 
    activo BOOLEAN DEFAULT true, 
    constraint fk_id_rol FOREIGN key (id_rol) REFERENCES tbl_rol (id)
);

select * from tbl_usuarios


create table tbl_publicacion
(
    id SERIAL PRIMARY key,
    caption varchar(250), 
    nombre_usuario varchar(20) REFERENCES tbl_usuarios(nombre_usuario), 
    fecha_post TIMESTAMP DEFAULT current_timestamp, 
    activo bool DEFAULT true
);

SELECT * FROM tbl_publicacion

CREATE TABLE tbl_comentarios 
(
    id SERIAL PRIMARY KEY,
    id_publicacion INT REFERENCES tbl_publicacion(id),
    nombre_usuario VARCHAR(20) REFERENCES tbl_usuarios(nombre_usuario),
    comentario VARCHAR(300),
    fecha_comentario TIMESTAMP DEFAULT current_timestamp
);


