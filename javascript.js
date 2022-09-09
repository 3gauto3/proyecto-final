// VARIABLES GLO

const formularioUsuario = document.getElementById("formularioUsuario")
const listaActividadesUsuario = document.getElementById("listaActividades")
let arrayActividades = []

// FUNCIONES

const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
    }

    arrayActividades.push(item);
    return item;
}

const GuardarDB = () => {
    localStorage.setItem("tareas", JSON.stringify(arrayActividades))
    PintarDB()

}

const PintarDB = () => {

    listaActividadesUsuario.innerHTML = "";
    arrayActividades = JSON.parse(localStorage.getItem("tareas"));
    setTimeout(() => {
         if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(elemento => {
            listaActividadesUsuario.innerHTML += `
        <div class="alert alert-light my-3" role="alert">
         <span class="float-end">
         <button class="btn btn-danger">X</button></span>
         <b>${elemento.actividad}</b></div></div>`
        });
    }
}, 500);

}




const EliminarDB = (actividad) => {

    let indexArray
    arrayActividades.forEach((elemento, index) => {

        if (elemento.actividad === actividad) {
            indexArray = index;
        }

    });

    arrayActividades.splice(indexArray, 1)
    GuardarDB();

}


// addEventListener

formularioUsuario.addEventListener("submit", (e) => {
    

    Toastify({
        text: "Actividad agregada",
        duration: 1000,
        //   destination: "https://github.com/apvarun/toastify-js",
        //   newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "rgb(41, 34, 34)",
        },
        onClick: function () {} // Callback after click
    }).showToast();

    e.preventDefault();
    let actividadUsuario = document.getElementById("actividadUsuario").value

    CrearItem(actividadUsuario);
    GuardarDB()

    formularioUsuario.reset();

});

document.addEventListener("DOMContentLoaded", PintarDB);

listaActividadesUsuario.addEventListener("click", (e) => {

    e.preventDefault();

    if (e.target.innerHTML === "X") {
        Toastify({
            text: "Actividad eliminada",
            duration: 1000,
            //   destination: "https://github.com/apvarun/toastify-js",
            //   newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "rgb(41, 34, 34)",
            },
            onClick: function () {} // Callback after click
        }).showToast();
        let texto = e.path[2].childNodes[3].innerHTML
        if (e.target.innerHTML === "X") {
            EliminarDB(texto);
        }
    }

})