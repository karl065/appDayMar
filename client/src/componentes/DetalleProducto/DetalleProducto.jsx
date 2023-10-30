const DetalleProducto = ({producto, onClose}) => {
  const precioFormateado = producto.precioVenta.toLocaleString('es-CO');
  const imagenFondo = {
    backgroundImage: `url(${producto.imagen[0].split(',')[0]})`,
    backgroundSize: '400px 400px',
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
      className="card w-[400px] h-[400px] bg-black shadow-2xl space-y-2 shadow-black rounded-md flex flex-col text-2xl justify-center items-center p-2 text-black font-bold mb-2"
      style={estiloCombinado}
    >
      <div className="space-y-2" onClick={onClose}>
        <div
          className="flex space-x-1"
          style={{textShadow: '0px 0px 5px white'}}
        >
          <label style={{textShadow: '0px 0px 5px white'}}>Nombre: </label>
          <h1 className="border-l-4 border-black bg-gradient-to-r from-slate-50 from-30% via-slate-500 via-60% to-slate-950 to-100% rounded-xl p-1">
            {producto.nombre}
          </h1>
        </div>
        <div
          className="flex space-x-1"
          style={{textShadow: '0px 0px 5px white'}}
        >
          <label style={{textShadow: '0px 0px 5px white'}}>Categoria: </label>
          <h1 className="border-l-4 border-black bg-gradient-to-r from-slate-50 from-30% via-slate-500 via-60% to-slate-950 to-100% rounded-xl p-1">
            {producto.categorias.nombreCategoria}
          </h1>
        </div>
        <div
          className="flex space-x-1"
          style={{textShadow: '0px 0px 5px white'}}
        >
          <label style={{textShadow: '0px 0px 5px white'}}>Tipo: </label>
          <h1 className="border-l-4 border-black bg-gradient-to-r from-slate-50 from-30% via-slate-500 via-60% to-slate-950 to-100% rounded-xl p-1">
            {producto.tipo}
          </h1>
        </div>
        <div
          className="flex space-x-1"
          style={{textShadow: '0px 0px 5px white'}}
        >
          <label style={{textShadow: '0px 0px 5px white'}}>Descripcion: </label>
          <h1 className="border-l-4 border-black bg-gradient-to-r from-slate-50 from-30% via-slate-500 via-60% to-slate-950 to-100% rounded-xl p-1">
            {producto.descripcion}
          </h1>
        </div>
        <div className="flex space-x-1">
          <label>Precio: </label>
          <h2 className="border-l-4 border-black bg-gradient-to-r from-slate-50 from-30% via-slate-500 via-60% to-slate-950 to-100% rounded-xl p-1">
            ${precioFormateado}
          </h2>
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-stone-50 from-30% via-stone-500 via-60% to-stone-950 to-100% text-black rounded-lg p-2 border-l-4 border-black"
        style={{textShadow: '0px 0px 10px white'}}
      >
        Agregar a Pedido
      </button>
    </div>
  );
};

export default DetalleProducto;
