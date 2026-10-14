// Pantalla de demostración. Todavía no se conecta con PHP ni con la base de datos.
const contenedorAcceso = document.getElementById('contenedorAcceso');
const formularioIngreso = document.getElementById('formularioIngreso');
const formularioRegistro = document.getElementById('formularioRegistro');
const botonCambiarFormulario = document.getElementById('botonCambiarFormulario');

// hidden oculta un formulario. La clase modo-registro mueve las tarjetas con CSS.
function cambiarFormulario(mostrarRegistro, moverFoco) {
  contenedorAcceso.classList.toggle('modo-registro', mostrarRegistro);
  formularioIngreso.hidden = mostrarRegistro;
  formularioRegistro.hidden = !mostrarRegistro;
  document.getElementById('tituloBienvenida').textContent = mostrarRegistro ? '¡Qué bueno verte!' : '¡Bienvenido!';
  document.getElementById('descripcionBienvenida').textContent = mostrarRegistro
    ? 'Ya tienes tu espacio. Inicia sesión y continúa acompañando.'
    : 'Un espacio para acompañar cada pequeño avance.';
  botonCambiarFormulario.textContent = mostrarRegistro ? 'INICIAR SESIÓN' : 'REGISTRARSE';
  document.title = mostrarRegistro ? 'Crear cuenta · Fluidez' : 'Inicio de sesión · Fluidez';
  if (moverFoco) {
    document.getElementById(mostrarRegistro ? 'tituloRegistro' : 'tituloIngreso').focus();
  }
}

botonCambiarFormulario.addEventListener('click', function () {
  cambiarFormulario(formularioRegistro.hidden, true);
});

// registro.html permite entrar directamente con el registro abierto.
cambiarFormulario(contenedorAcceso.classList.contains('modo-registro'), false);

function mostrarMensaje(identificador, texto, tipo) {
  const mensaje = document.getElementById(identificador);
  mensaje.textContent = texto;
  mensaje.className = 'mensaje-formulario ' + tipo;
}

function marcarError(campo, identificador, texto) {
  campo.classList.toggle('invalido', texto !== '');
  document.getElementById(identificador).textContent = texto;
  if (texto) campo.setAttribute('aria-invalid', 'true');
  else campo.removeAttribute('aria-invalid');
}

// Esta expresión comprueba el formato básico de un correo electrónico.
function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

formularioIngreso.addEventListener('submit', function (evento) {
  evento.preventDefault();
  const correo = document.getElementById('correoIngreso');
  const contrasena = document.getElementById('contrasenaIngreso');
  marcarError(correo, 'errorCorreoIngreso', correoValido(correo.value.trim()) ? '' : 'Ingresa un correo válido.');
  marcarError(contrasena, 'errorContrasenaIngreso', contrasena.value.trim() ? '' : 'Ingresa tu contraseña.');
  const campoInvalido = formularioIngreso.querySelector('.invalido');
  if (campoInvalido) {
    mostrarMensaje('mensajeIngreso', 'Revisa los campos señalados.', 'error');
    campoInvalido.focus();
    return;
  }
  if (correo.value.trim().toLowerCase() === 'profesional@fluidez.com' && contrasena.value === '123456') {
    mostrarMensaje('mensajeIngreso', 'Acceso de prueba correcto. El panel profesional se habilitará más adelante.', 'correcto');
  } else {
    mostrarMensaje('mensajeIngreso', 'Los datos no coinciden con la cuenta de prueba.', 'error');
  }
});

formularioRegistro.addEventListener('submit', function (evento) {
  evento.preventDefault();
  const nombre = document.getElementById('nombreRegistro');
  const apellido = document.getElementById('apellidoRegistro');
  const correo = document.getElementById('correoRegistro');
  const contrasena = document.getElementById('contrasenaRegistro');
  const confirmacion = document.getElementById('confirmarContrasena');
  marcarError(nombre, 'errorNombreRegistro', nombre.value.trim() ? '' : 'Ingresa tu nombre.');
  marcarError(apellido, 'errorApellidoRegistro', apellido.value.trim() ? '' : 'Ingresa tu apellido.');
  marcarError(correo, 'errorCorreoRegistro', correoValido(correo.value.trim()) ? '' : 'Ingresa un correo válido.');
  marcarError(contrasena, 'errorContrasenaRegistro', contrasena.value.length >= 8 && contrasena.value.trim() ? '' : 'Usa al menos 8 caracteres.');
  marcarError(confirmacion, 'errorConfirmarContrasena', confirmacion.value && confirmacion.value === contrasena.value ? '' : 'Las contraseñas deben coincidir.');
  const campoInvalido = formularioRegistro.querySelector('.invalido');
  if (campoInvalido) {
    mostrarMensaje('mensajeRegistro', 'Revisa los campos señalados.', 'error');
    campoInvalido.focus();
    return;
  }
  mostrarMensaje('mensajeRegistro', 'Datos válidos para la demostración. La cuenta todavía no se ha guardado.', 'correcto');
});

// Al corregir un campo, quitamos su error y el mensaje anterior.
document.querySelectorAll('.campo input').forEach(function (campo) {
  campo.addEventListener('input', function () {
    marcarError(campo, campo.getAttribute('aria-describedby'), '');
    if (campo.id === 'contrasenaRegistro') {
      marcarError(document.getElementById('confirmarContrasena'), 'errorConfirmarContrasena', '');
    }
    mostrarMensaje(campo.closest('form').id === 'formularioIngreso' ? 'mensajeIngreso' : 'mensajeRegistro', '', '');
  });
});

// Breve salida al acceso infantil. El enlace conserva su dirección normal.
document.getElementById('irNinos').addEventListener('click', function (evento) {
  if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey || evento.button !== 0) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  evento.preventDefault();
  const direccion = this.href;
  document.body.classList.add('saliendo');
  setTimeout(function () { window.location.assign(direccion); }, 180);
});

window.addEventListener('pageshow', function () {
  document.body.classList.remove('saliendo');
});
