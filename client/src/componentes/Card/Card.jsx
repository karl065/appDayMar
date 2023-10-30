const Card = ({producto}) => {
  const precioFormateado = producto.precioVenta.toLocaleString('es-CO');
  const imagenFondo = {
    backgroundImage: `url(${producto.imagen[0].split(',')[0]})`,
    backgroundSize: '200px 200px',
    backgroundPosition: 'center',
  };
  const sombraTexto = {
    textShadow: '0px 0px 5px white',
  };

  const estiloCombinado = {
    ...imagenFondo,
    ...sombraTexto,
  };
  return (
    <div
      className="card w-[200px] h-[200px] bg-black shadow-2xl shadow-black rounded-md flex flex-col justify-center items-center p-2 text-black font-bold mb-2"
      style={estiloCombinado}
    >
      {/* <img src={producto.imagen} alt={producto.nombre} className="w-30 h-20" /> */}
      <div className="flex space-x-1" style={{textShadow: '0px 0px 5px white'}}>
        <label style={{textShadow: '0px 0px 5px white'}}>Nombre: </label>
        <h1>{producto.nombre}</h1>
      </div>
      <div className="flex space-x-1">
        <label>Precio: </label>
        <h2> ${precioFormateado}</h2>
      </div>
    </div>
  );
};

export default Card;
