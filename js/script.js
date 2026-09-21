document.addEventListener("DOMContentLoaded", () => {
  const inputTelefono = document.getElementById("telefono");

  //Expresiones regulares
  const REGEX_SOLO_DIGITOS = /\D/g;
  const REGEX_FORMATO_MASCARA = /^(\d{4})(\d{1,4})$/;
  
  //^[267] obliga a iniciar con 2, 6 o 7, seguido de 3 digitos, guion y 4 digitos finales
  const REGEX_VALIDACION_DIGITOS = /^[267]\d{3}-\d{4}$/;

  inputTelefono.addEventListener("input", (e) => {
    //Remueve cualquier caracter que no sea un numero
    let campoTexto = e.target.value.replace(REGEX_SOLO_DIGITOS, "");

    //Filtro estricto al inicio: impide escribir si el primer digito no es 2, 6 o 7
    if (campoTexto.length > 0 && !/^[267]/.test(campoTexto)) {
      campoTexto = "";
    }

    //Restriccion a un maximo de 8 digitos numericos
    campoTexto = campoTexto.slice(0, 8);

    //Aplicacion de la mascara (agrega el guion a partir del quinto digito)
    const valorFormateado = campoTexto.replace(REGEX_FORMATO_MASCARA, "$1-$2");
    e.target.value = valorFormateado;

    //Validacion final con Bootstrap
    if (REGEX_VALIDACION_DIGITOS.test(valorFormateado)) {
      inputTelefono.classList.remove("is-invalid");
      inputTelefono.classList.add("is-valid");
    } else if (valorFormateado.length > 0) {
      inputTelefono.classList.remove("is-valid");
      inputTelefono.classList.add("is-invalid");
    } else {
      inputTelefono.classList.remove("is-valid", "is-invalid");
    }
  });
});