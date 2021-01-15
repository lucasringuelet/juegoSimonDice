const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const nivelJuego = document.getElementById('nivel')


class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }



    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        btnEmpezar.classList.add('hide')
        nivelJuego.classList.add('hide')
        this.nivel = 1
        this.cantNiveles = Number(window.prompt('¿Cuantos niveles queres jugar?'))
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }





    generarSecuencia() {
        this.secuencia = new Array(this.cantNiveles).fill(0).map(n => Math.floor(Math.random() * 4))
    }







    siguienteNivel() {
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'verde'
            case 1:
                return 'violeta'
            case 2:
                return 'celeste'
            case 3:
                return 'naranja'
        }
    }
    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 500 * i)
        }
    }




    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'verde':
                return 0
            case 'violeta':
                return 1
            case 'celeste':
                return 2
            case 'naranja':
                return 3
        }
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        nivelJuego.classList.remove('hide')
        if (numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++
                if (this.subNivel === this.nivel) {
                    this.nivel++
                        this.eliminarEventosClick()

                    nivelJuego.innerHTML = (this.nivel - 1)
                    if (this.nivel === (this.cantNiveles + 1)) {
                        swal('GANASTE!', ':)', 'success')
                            .then(() => {
                                btnEmpezar.classList.remove('hide')
                                nivelJuego.classList.add('hide')
                            })
                    } else {
                        setTimeout(this.siguienteNivel, 1000)
                    }
                }

        } else {
            swal('PERDISTE', `:(`, 'error')
                .then(() => {
                    this.eliminarEventosClick()
                    btnEmpezar.classList.remove('hide')
                    nivelJuego.classList.add('hide')
                })

        }
    }
}






function empezarJuego() {

    window.juego = new Juego
}