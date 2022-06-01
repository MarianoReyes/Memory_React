const imagen_cartas = [
    {"src":"/cartas/casco-romano.png", match : false, volteada: false},
    {"src":"/cartas/escultura.png", match : false, volteada: false},
    {"src":"/cartas/faraon.png", match : false, volteada: false},
    {"src":"/cartas/fosil.png", match : false, volteada: false},
    {"src":"/cartas/cuadro.png", match : false, volteada: false},
    {"src":"/cartas/moai.png", match : false, volteada: false},
]

const App = () => {

    const [cartas, setCartas] = React.useState([])
    const [turnos, setTurnos] = React.useState(0)
    const [opcion1, setOpcion1] = React.useState(null)
    const [opcion2, setOpcion2] = React.useState(null)
    const [ganar, setGanar] = React.useState(0)

    //mezclar cartas
    const mezclar_cartas = () => {
        const mezclar_cartas = [...imagen_cartas, ...imagen_cartas]
            //esto devuelve el array mezclado
            .sort(() => Math.random() - 0.5)
            //y esto le asigna un id
            .map((carta) => ({ ...carta, id: Math.random() }))
        setOpcion1(null)
        setOpcion2(null)
        setCartas(mezclar_cartas)
        setTurnos(0)
        setGanar(0)
    }

    //auto inicio
    React.useEffect(() => {
        mezclar_cartas()
    }, [])


    //al hacer click en las cartas
    function click_carta(carta){
        opcion1 ? setOpcion2(carta) : setOpcion1(carta)
        carta.volteada = true
    }

    //comparar 2 cartas
    React.useEffect(() => {
        if(opcion1 && opcion2){
            if(opcion1.src === opcion2.src){

                setCartas( prevCartas => {
                    return prevCartas.map( carta => {
                        if(carta.src === opcion1.src){
                            return {...carta, match : true}
                        }
                        else{
                            return carta
                        }
                    })
                })

                resetTurno()
            }else{
                opcion1.volteada = false
                opcion2.volteada = false
                setTimeout( () => resetTurno(), 1000)
            }
        }
    }, [opcion1,opcion2])

    

    var bandera_ganar=false
    

    //verificacion ganar
    React.useEffect(() => {
        for( const carta of cartas){
            if(carta.match===true){
                setGanar(prevganar => prevganar + 1)
            }
        }
    
        if(ganar === 30){
            bandera_ganar=true
            document.getElementById("ganar").className = "banner_ganar"
        }
        else{
            bandera_ganar=false
            document.getElementById("ganar").className = "disp_none"
        }
    }, [cartas])


    //reset de opciones y otro turno
    const resetTurno = () => {
        setOpcion1(null)
        setOpcion2(null)       
        setTurnos(prevturnos => prevturnos + 1)
    }
    

    
    return(
        <div className="App">
            <h1 className="titulo">Juego de Memoria</h1>
            
            <div className="grid_cartas">
                {cartas.map( carta => (
                    
                    <div className="carta" key={carta.id}>
                        <div className={carta.volteada ? "volteada" : ""}>
                            <img className="frente" src={carta.src} alt="carta frente"/>
                            <img className="atras" src="/cartas/museo.png" alt="carta atras"  onClick={()=>{click_carta(carta)}}/>
                        </div>
                    </div>

                ))}
                <div className="disp_none" id="ganar">
                    <h1>Ganaste</h1>
                </div>
            </div>
            <div className="footer">
                <p className="foot_element">Movimientos: {turnos}</p>
                <button className="btn_jugar foot_element" onClick={mezclar_cartas}>Nuevo Juego</button>
            </div>
            

            
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)