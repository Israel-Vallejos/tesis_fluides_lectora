-- Fluidez: estructura basada en bdd_correcion2_tesis.pdf y su revision grabada.
-- Preparado para MySQL 8.0. Fecha: 2026-10-02.
-- Crea una base independiente para conservar intacta la base anterior.
-- No contiene DROP, datos de ejemplo ni procedimientos almacenados.
-- Ejecutar el archivo completo en MySQL Workbench.
-- Si la base ya existe, detenerse: este archivo no es una migracion.

SET NAMES utf8mb4;

CREATE DATABASE `bdd_tesis_lectora_corregida`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `bdd_tesis_lectora_corregida`;

CREATE TABLE `usuarios` (
  `usu_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usu_nombre_usuario` VARCHAR(50) NOT NULL,
  `usu_clave_hash` VARCHAR(255) NOT NULL,
  `usu_rol` VARCHAR(20) NOT NULL,
  `usu_nombres` VARCHAR(100) NOT NULL,
  `usu_apellidos` VARCHAR(100) NOT NULL,
  `usu_fecha_nacimiento` DATE NULL,
  `usu_correo` VARCHAR(120) NULL,
  `usu_telefono` VARCHAR(20) NULL,
  `usu_especialidad` VARCHAR(100) NULL,
  `usu_estado` VARCHAR(20) NOT NULL,
  `usu_fecha_registro` TIMESTAMP NOT NULL,
  PRIMARY KEY (`usu_id`),
  UNIQUE KEY `uq_usuarios_nombre_usuario` (`usu_nombre_usuario`)
) ENGINE=InnoDB;

CREATE TABLE `historias_clinicas` (
  `his_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `his_id_nino` BIGINT UNSIGNED NOT NULL,
  `his_fecha_apertura` DATE NOT NULL,
  `his_diagnostico_profesional` TEXT NULL,
  `his_dificultades_observadas` TEXT NULL,
  `his_objetivos_trabajo` TEXT NULL,
  `his_observaciones` TEXT NULL,
  `his_estado` VARCHAR(20) NOT NULL,
  `his_fecha_actualizacion` TIMESTAMP NOT NULL,
  PRIMARY KEY (`his_id`),
  UNIQUE KEY `uq_historias_nino` (`his_id_nino`),
  CONSTRAINT `fk_historias_nino` FOREIGN KEY (`his_id_nino`)
    REFERENCES `usuarios` (`usu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE `sesiones` (
  `ses_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ses_id_historia` BIGINT UNSIGNED NOT NULL,
  `ses_id_profesional` BIGINT UNSIGNED NOT NULL,
  `ses_numero` INT NOT NULL,
  `ses_fecha` TIMESTAMP NOT NULL,
  `ses_tipo` VARCHAR(30) NOT NULL,
  `ses_modalidad` VARCHAR(20) NOT NULL,
  `ses_duracion_minutos` INT NULL,
  `ses_observaciones` TEXT NULL,
  `ses_avances_observados` TEXT NULL,
  `ses_resultado_evaluacion` TEXT NULL,
  `ses_indicaciones` TEXT NULL,
  PRIMARY KEY (`ses_id`),
  KEY `idx_sesiones_historia` (`ses_id_historia`),
  KEY `idx_sesiones_profesional` (`ses_id_profesional`),
  CONSTRAINT `fk_sesiones_historia` FOREIGN KEY (`ses_id_historia`)
    REFERENCES `historias_clinicas` (`his_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_sesiones_profesional` FOREIGN KEY (`ses_id_profesional`)
    REFERENCES `usuarios` (`usu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE `ejercicios` (
  `eje_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `eje_id_sesion` BIGINT UNSIGNED NOT NULL,
  `eje_titulo` VARCHAR(150) NOT NULL,
  `eje_tipo` VARCHAR(30) NOT NULL,
  `eje_contenido_lectura` TEXT NOT NULL,
  `eje_instrucciones` TEXT NULL,
  `eje_nivel_dificultad` VARCHAR(20) NULL,
  `eje_orden_ejecucion` INT NOT NULL,
  `eje_origen` VARCHAR(20) NOT NULL,
  `eje_recomendacion` TEXT NULL,
  `eje_criterio_adaptacion` TEXT NULL,
  `eje_estado` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`eje_id`),
  KEY `idx_ejercicios_sesion` (`eje_id_sesion`),
  CONSTRAINT `fk_ejercicios_sesion` FOREIGN KEY (`eje_id_sesion`)
    REFERENCES `sesiones` (`ses_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE `grabaciones` (
  `gra_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `gra_id_ejercicio` BIGINT UNSIGNED NOT NULL,
  `gra_numero_intento` INT NOT NULL,
  `gra_ubicacion_audio` VARCHAR(500) NOT NULL,
  `gra_duracion_segundos` DECIMAL(8,2) NULL,
  `gra_fecha` TIMESTAMP NOT NULL,
  `gra_estado_procesamiento` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`gra_id`),
  KEY `idx_grabaciones_ejercicio` (`gra_id_ejercicio`),
  CONSTRAINT `fk_grabaciones_ejercicio` FOREIGN KEY (`gra_id_ejercicio`)
    REFERENCES `ejercicios` (`eje_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE `analisis_automaticos` (
  `ana_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ana_id_grabacion` BIGINT UNSIGNED NOT NULL,
  `ana_transcripcion_obtenida` TEXT NULL,
  `ana_palabras_correctas_minuto` DECIMAL(8,2) NULL,
  `ana_cantidad_pausas` INT NULL,
  `ana_cantidad_omisiones` INT NULL,
  `ana_cantidad_sustituciones` INT NULL,
  `ana_cantidad_inserciones` INT NULL,
  `ana_cantidad_repeticiones` INT NULL,
  `ana_detalle_errores` JSON NULL,
  `ana_fecha` TIMESTAMP NOT NULL,
  `ana_estado` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ana_id`),
  UNIQUE KEY `uq_analisis_grabacion` (`ana_id_grabacion`),
  CONSTRAINT `fk_analisis_grabacion` FOREIGN KEY (`ana_id_grabacion`)
    REFERENCES `grabaciones` (`gra_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE `validaciones_analisis` (
  `val_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `val_id_analisis` BIGINT UNSIGNED NOT NULL,
  `val_fecha_revision` TIMESTAMP NOT NULL,
  `val_resultado` VARCHAR(20) NOT NULL,
  `val_transcripcion_corregida` TEXT NULL,
  `val_palabras_correctas_minuto_corregidas` DECIMAL(8,2) NULL,
  `val_observaciones` TEXT NULL,
  `val_retroalimentacion_nino` TEXT NULL,
  PRIMARY KEY (`val_id`),
  UNIQUE KEY `uq_validaciones_analisis` (`val_id_analisis`),
  CONSTRAINT `fk_validaciones_analisis` FOREIGN KEY (`val_id_analisis`)
    REFERENCES `analisis_automaticos` (`ana_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;

-- Verificacion visible al terminar en Workbench: deben aparecer siete tablas.
SHOW TABLES;
