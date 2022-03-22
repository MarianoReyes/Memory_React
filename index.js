const MiPrimerComponente = () => {
    const [contador, setContador] = React.useState(1)
    return (
        <div>
            <h1 onClick={() => setContador(contador + 1)}>Yo soy un contador: {contador} </h1>
        </div>
    )
}

ReactDOM.render(
    <MiPrimerComponente />,
    document.getElementById('contador')
)