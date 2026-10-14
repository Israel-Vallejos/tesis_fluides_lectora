// Demostración del acceso infantil. El PIN completo se guarda en el campo oculto.
const formularioNino = document.getElementById('formularioNino');
const usuario = document.getElementById('usuario');
const pin = document.getElementById('pin');
const casillas = document.querySelectorAll('.casilla-pin');

function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById('mensajeNino');
  mensaje.textContent = texto;
  mensaje.className = 'mensaje-infantil ' + tipo;
}

function actualizarPin() {
  pin.value = '';
  casillas.forEach(function (casilla) { pin.value += casilla.value; });
}

function marcarErrorUsuario(texto) {
  document.getElementById('errorUsuario').textContent = texto;
  usuario.classList.toggle('invalido', texto !== '');
  if (texto) usuario.setAttribute('aria-invalid', 'true');
  else usuario.removeAttribute('aria-invalid');
}

function marcarErrorPin(texto) {
  document.getElementById('errorPin').textContent = texto;
  casillas.forEach(function (casilla) {
    casilla.classList.toggle('invalido', texto !== '');
    if (texto) casilla.setAttribute('aria-invalid', 'true');
    else casilla.removeAttribute('aria-invalid');
  });
}

function enfocarCasilla(indice) {
  casillas[indice].focus();
  casillas[indice].select();
}

function limpiarErrorPin() {
  actualizarPin();
  marcarErrorPin('');
  mostrarMensaje('', '');
}

// Repartir permite escribir uno a uno o pegar los seis números a la vez.
function repartirNumeros(texto, indice) {
  const numeros = texto.replace(/[^0-9]/g, '').slice(0, 6 - indice);
  if (!numeros) {
    casillas[indice].value = '';
    limpiarErrorPin();
    return;
  }
  for (let posicion = 0; posicion < numeros.length; posicion++) {
    casillas[indice + posicion].value = numeros[posicion];
  }
  limpiarErrorPin();
  enfocarCasilla(Math.min(indice + numeros.length, 5));
}

casillas.forEach(function (casilla, indice) {
  casilla.addEventListener('focus', function () { casilla.select(); });
  casilla.addEventListener('input', function () { repartirNumeros(casilla.value, indice); });
  casilla.addEventListener('paste', function (evento) {
    const texto = evento.clipboardData.getData('text');
    if (!/[0-9]/.test(texto)) return;
    evento.preventDefault();
    repartirNumeros(texto, indice);
  });
  casilla.addEventListener('keydown', function (evento) {
    if (evento.key === 'Backspace') {
      evento.preventDefault();
      if (casilla.value) casilla.value = '';
      else if (indice > 0) {
        casillas[indice - 1].value = '';
        enfocarCasilla(indice - 1);
      }
      limpiarErrorPin();
    } else if (evento.key === 'ArrowLeft' || evento.key === 'ArrowRight') {
      evento.preventDefault();
      const siguiente = indice + (evento.key === 'ArrowLeft' ? -1 : 1);
      enfocarCasilla(Math.max(0, Math.min(siguiente, 5)));
    }
  });
});

usuario.addEventListener('input', function () {
  marcarErrorUsuario('');
  mostrarMensaje('', '');
});

formularioNino.addEventListener('submit', function (evento) {
  evento.preventDefault();
  actualizarPin();
  marcarErrorUsuario('');
  marcarErrorPin('');
  if (!usuario.value.trim()) {
    marcarErrorUsuario('Escribe tu usuario.');
    mostrarMensaje('Revisa los campos señalados.', 'error');
    usuario.focus();
    return;
  }
  for (let indice = 0; indice < casillas.length; indice++) {
    if (!/^[0-9]$/.test(casillas[indice].value)) {
      marcarErrorPin('Completa tus 6 números.');
      mostrarMensaje('Vamos paso a paso. Revisa tus números.', 'error');
      enfocarCasilla(indice);
      return;
    }
  }
  if (usuario.value.trim().toLowerCase() === 'lucia' && pin.value === '123456') {
    mostrarMensaje('¡Muy bien! Probaste tu entrada. Pronto encontrarás aquí tus lecturas.', 'correcto');
  } else {
    mostrarMensaje('Para esta prueba usa lucia y el PIN 123456.', 'error');
  }
});

document.getElementById('botonAyuda').addEventListener('click', function () {
  const ayuda = document.getElementById('ayudaNino');
  ayuda.hidden = !ayuda.hidden;
  this.setAttribute('aria-expanded', String(!ayuda.hidden));
});

document.getElementById('volverProfesional').addEventListener('click', function (evento) {
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
