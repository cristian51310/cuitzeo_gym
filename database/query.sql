CREATE DATABASE cuitzeo_gym

USE cuitzeo_gym

/****************************************************************/
/*                        SUSCRIPCIONES                         */
/****************************************************************/

CREATE TABLE Suscripcion(
  id_suscripcion INT PRIMARY KEY,
  nombre VARCHAR(50),
  duracion INT,
  precio DECIMAL(10, 2),
  descripcion VARCHAR(100)
);

INSERT INTO Suscripcion (id_suscripcion, nombre, duracion, precio, descripcion) VALUES
  (1, 'Gratis', 0, 0, 'Suscripcion Gratis'),
  (2, 'Basico', 15, 150, 'Plan Quincenal'),
  (3, 'Intermedio', 30, 300, 'Plan Mensual'),
  (4, 'Premium', 365, 3000, 'Plan Anual');

/****************************************************************/
/*                             ROLES                            */
/****************************************************************/

CREATE TABLE Rol (
  id_rol INT PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE
);

INSERT INTO Rol (id_rol, nombre) VALUES
  (1, 'Usuario'),
  (2, 'Administrador');

/****************************************************************/
/*                           USUARIOS                           */
/****************************************************************/

CREATE TABLE Usuario(
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50),
  apellido_paterno VARCHAR(50),
  apellido_materno VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  id_rol INT DEFAULT 1,
  id_suscripcion INT DEFAULT 1,
  FOREIGN KEY (id_rol) REFERENCES Rol(id_rol),
  FOREIGN KEY (id_suscripcion) REFERENCES Suscripcion(id_suscripcion)
);

INSERT INTO Usuario(id_usuario, nombre, apellido_paterno, apellido_materno, email, password, id_rol) 
VALUES (1, 'Cristian Ruben', 'Figueroa', 'Espinoza', 'admin@gmail.com', '12345678', 2);

/****************************************************************/
/*                          OBJETIVOS                           */
/****************************************************************/

CREATE TABLE Objetivo (
  id_objetivo INT PRIMARY KEY,
  nombre VARCHAR(50)
);

INSERT INTO Objetivo (id_objetivo, nombre) VALUES
  (1, 'Ganar masa muscular'),
  (2, 'Bajar de peso'),
  (3, 'Mantener mi peso'),
  (4, 'Mejorar la resistencia'),
  (5, 'Reducir el estres');

/****************************************************************/
/*                           MAQUINAS                           */
/****************************************************************/

CREATE TABLE Maquina (
  id_maquina INT PRIMARY KEY,
  nombre VARCHAR(50),
  descripcion VARCHAR(300),
  imagen VARCHAR(50)
);

INSERT INTO Maquina (id_maquina ,nombre, descripcion, imagen) VALUES 
(1, 'Prensa de piernas', 'La prensa de piernas es una máquina de entrenamiento de fuerza que se utiliza para trabajar los músculos de las piernas, incluyendo los cuádriceps, los glúteos y los isquiotibiales.', 'prensa_piernas.jpg'),
(2, 'Remo sentado', 'El remo sentado es una máquina de entrenamiento de fuerza que se utiliza para trabajar los músculos de la espalda, incluyendo los dorsales y los trapecios.', 'remo_sentado.jpg'),
(3, 'Banco inclinado', 'El banco inclinado es una máquina de entrenamiento de fuerza que se utiliza para trabajar los músculos del pecho, incluyendo los pectorales mayores y menores.', 'banco_inclinado.jpg'),
(5, 'Máquina de bíceps', 'La máquina de bíceps es una máquina de entrenamiento de fuerza que se utiliza para trabajar los músculos del brazo, incluyendo el bíceps braquial y el braquial anterior.', 'maquina_biceps.jpg'),
(6, 'Bicicleta estática', 'La bicicleta estática es una máquina diseñada para el ejercicio cardiovascular y la quema de calorías. Es ideal para trabajar las piernas y la resistencia física.', 'bicicleta_estatica.jpg'),
(7, 'Remoergómetro', 'El remoergómetro o máquina de remo es una máquina diseñada para trabajar el cuerpo de manera completa, especialmente el tren superior y la espalda. Es ideal para mejorar la resistencia y tonificar los.', 'remoergometro.jpg'),
(8, 'Máquina de step', 'La máquina de step es una máquina de ejercicio cardiovascular diseñada para trabajar las piernas y los glúteos. Es ideal para tonificar y fortalecer los músculos de la parte inferior del cuerpo.', 'maquina_step.jpg'),
(9, 'Prensa de pecho', 'La prensa de pecho es una máquina diseñada para trabajar los músculos del pecho, los hombros y los tríceps. Es ideal para tonificar y fortalecer los músculos del tren superior.', 'prensa_pecho.jpg'),
(10, 'Máquina de abdominales', 'La máquina de abdominales es una máquina diseñada para trabajar los músculos abdominales. Es ideal para tonificar y fortalecer los músculos del abdomen.', 'maquina_abdominales.jpg'),
(11, 'Extensiones de piernas', 'La máquina de extensiones de piernas es una máquina diseñada para trabajar los músculos de las piernas, especialmente los cuádriceps. Es ideal para fortalecer los músculos de las piernas.', 'extensiones_piernas.jpg');

/****************************************************************/
/*                            PERFIL                            */
/****************************************************************/

CREATE TABLE Perfil (
  id_perfil INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL UNIQUE,
  edad INT,
  peso INT,
  estatura INT,
  id_objetivo INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
  FOREIGN KEY (id_objetivo) REFERENCES Objetivo(id_objetivo)
);
