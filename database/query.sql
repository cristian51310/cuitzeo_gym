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

























CREATE TABLE Ejercicio(
  id_ejercicio INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50),
  series INT,
  min_reps INT,
  max_reps INT
)

CREATE TABLE Rutina(
  id_rutina INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  dia VARCHAR(20),
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
)

CREATE TABLE Rutina_Ejercicio (
  id_rutina_ejercicio INT PRIMARY KEY AUTO_INCREMENT,
  id_rutina INT,
  id_ejercicio INT,
  FOREIGN KEY (id_rutina) REFERENCES Rutina(id_rutina),
  FOREIGN KEY (id_ejercicio) REFERENCES Ejercicio(id_ejercicio)
);



/****************************************************************/
/*                          INSERTS                             */
/****************************************************************/




INSERT INTO Ejercicio (id_ejercicio, nombre, series, min_reps, max_reps) VALUES
(1, 'Sentadillas', 4, 8, 12),
(2, 'Press de banca', 3, 8, 12),
(3, 'Peso muerto', 3, 6, 10),
(4, 'Dominadas', 3, 8, 12),
(5, 'Flexiones de brazos', 3, 10, 15),
(6, 'Press militar', 3, 8, 12),
(7, 'Remo con barra', 4, 8, 12),
(8, 'Curl de bíceps', 3, 10, 15),
(9, 'Extensión de tríceps', 3, 10, 15),
(10, 'Elevación de pantorrillas', 3, 12, 20),
(11, 'Prensa de piernas', 3, 10, 15),
(12, 'Extensiones de piernas', 3, 12, 15),
(13, 'Femoral sentado', 3, 12, 15),
(14, 'Banco de pecho inclinado', 3, 8, 12),
(15, 'Remo sentado en máquina', 3, 10, 12),
(16, 'Máquina de curl de bíceps', 3, 10, 12),
(17, 'Máquina de tríceps', 3, 10, 12),
(18, 'Máquina de hombro press', 3, 10, 12),
(19, 'Máquina de pull-down', 3, 10, 12),
(20, 'Máquina de butterfly', 3, 8, 10),
(21, 'Flexiones en anillas', 3, 8, 12),
(22, 'Dominadas con agarre ancho', 3, 8, 12),
(23, 'Sentadillas con salto', 3, 10, 15),
(24, 'Burpees', 3, 10, 15),
(25, 'Pistol squats', 3, 6, 10),
(26, 'Planchas', 3, 30, 60),
(27, 'Saltos al cajón', 3, 10, 15),
(28, 'Caminata del oso', 3, 10, 15),
(29, 'Zancadas', 3, 10, 12),
(30, 'Abdominales en bicicleta', 3, 10, 15),
(31, 'Saltos con cuerda', 3, 30, 60),
(32, 'Sentadillas con barra por detrás', 4, 8, 12),
(33, 'Flexiones con manos juntas', 3, 10, 15),
(34, 'Pull-ups con agarre cerrado', 3, 8, 12),
(35, 'Press militar con mancuernas', 3, 8, 12),
(36, 'Elevaciones laterales con mancuernas', 3, 10, 15),
(37, 'Curl de bíceps con mancuernas', 3, 10, 15),
(38, 'Extensiones de tríceps con mancuernas', 3, 10, 15),
(39, 'Paseos con peso', 3, 30, 60),
(40, 'Sentadillas con salto y peso', 3, 10, 15),
(41, 'Abdominales en suelo', 3, 15, 20),
(42, 'Plancha lateral', 3, 30, 45),
(43, 'Burpees', 3, 10, 15),
(44, 'Flexiones diamante', 3, 10, 15),
(45, 'Sentadilla con salto', 3, 10, 15),
(46, 'Saltos con cuerda', 3, 30, 45),
(47, 'Caminata con peso', 3, 10, 12),
(48, 'Mountain climbers', 3, 20, 30),
(49, 'Levantamiento de cadera en suelo', 3, 12, 15),
(50, 'Elevación de piernas colgado', 3, 10, 12),
(51, 'Desplantes', 3, 10, 12),
(52, 'Zancadas', 3, 10, 12),
(53, 'Elevación de hombros con mancuernas', 3, 10, 12),
(54, 'Curl de bíceps con mancuernas', 3, 10, 12),
(55, 'Extensión de tríceps con mancuernas', 3, 10, 12),
(56, 'Flexiones en anillas', 3, 8, 12),
(57, 'Dominadas en anillas', 3, 8, 12),
(58, 'Saltos al cajón', 3, 10, 15),
(59, 'Flexiones en pica', 3, 10, 12),
(60, 'Press de pecho en máquina', 3, 8, 12),
(61, 'Remo en máquina', 3, 8, 12),
(62, 'Extensiones de piernas en máquina', 3, 10, 15),
(63, 'Curl de piernas en máquina', 3, 10, 15),
(64, 'Press de hombros en máquina', 3, 8, 12),
(65, 'Prensa de piernas en máquina', 3, 8, 12),
(66, 'Polea alta para tríceps', 3, 10, 15),
(67, 'Polea baja para bíceps', 3, 10, 15),
(68, 'Curl de bíceps en máquina', 3, 10, 15),
(69, 'Extensiones de tríceps en máquina', 3, 10, 15),
(70, 'Sentadilla hack en máquina', 3, 8, 12),
(71, 'Press de piernas en máquina', 3, 8, 12),
(72, 'Vuelos laterales en máquina', 3, 10, 15),
(73, 'Vuelos frontales en máquina', 3, 10, 15),
(74, 'Curl de femorales en máquina', 3, 10, 15),
(75, 'Abducciones en máquina', 3, 10, 15),
(76, 'Aducciones en máquina', 3, 10, 15),
(77, 'Press de pecho inclinado en máquina', 3, 8, 12),
(78, 'Remo bajo en máquina', 3, 8, 12),
(79, 'Extensión de tríceps en polea', 3, 10, 15);
