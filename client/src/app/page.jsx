'use client';
import Card from '@/componentes/Card/Card';
import DetalleProducto from '@/componentes/DetalleProducto/DetalleProducto';
import FiltroProductos from '@/componentes/Filtros/FiltroProductos';
import SinResultados from '@/componentes/SinResultados/SinResultados';
import Spinner from '@/componentes/Spinner/Spinner';
import {getProductos} from '@/redux/Services/productos/getProductos';
import {getUsuarios} from '@/redux/Services/usuarios/getUsuarios';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.valores.usuarios);
  const productos = useSelector((state) => state.valores.productos);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posicion, setPosicion] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getProductos(dispatch);
    getUsuarios(dispatch);
  }, []);

  const nextProduct = () => {
    const nextPosition = posicion + 1;
    if (nextPosition < productos.length) {
      setSelectedProduct(productos[nextPosition]);
      setPosicion(nextPosition);
    }
  };
  const afterProduct = () => {
    const nextPosition = posicion - 1;
    if (nextPosition >= 0) {
      setSelectedProduct(productos[nextPosition]);
      setPosicion(nextPosition);
    }
  };

  const openModal = (product, index) => {
    setPosicion(index);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setSelectedProduct(productos[0]);
  }, productos);

  return (
    <div>
      <div className="flex flex-col space-y-2 p-2 space-x-4">
        <FiltroProductos />
        <div className="flex flex-wrap">
          {isLoading ? (
            <div className="flex flex-col bg-black opacity-75 p-2 mx-auto rounded justify-center items-center shadow-lg space-y-2">
              <Spinner />
            </div>
          ) : productos.length > 0 ? (
            <div className="flex flex-wrap justify-center space-x-2 ">
              {productos.map((producto, index) => (
                <button onClick={() => openModal(producto, index)}>
                  <Card key={index} producto={producto} className="flex-grow" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <SinResultados />
            </div>
          )}
        </div>
      </div>
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <button onClick={afterProduct}>
            <img
              src="https://res.cloudinary.com/dpjeltekx/image/upload/v1698704716/appDayMar/app/arrow_back_ios_FILL0_wght400_GRAD0_opsz48_wdault.png"
              alt="atras"
              style={{filter: 'invert(100%)', color: 'green'}}
            />
          </button>
          <DetalleProducto producto={selectedProduct} onClose={closeModal} />
          <button onClick={nextProduct}>
            <img
              src="https://res.cloudinary.com/dpjeltekx/image/upload/v1698704716/appDayMar/app/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48_yghwzi.png"
              alt="adelante"
              style={{filter: 'invert(100%)', color: 'green'}}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
