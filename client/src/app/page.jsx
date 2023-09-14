'use client';
import Card from '@/componentes/Card/Card';
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getProductos(dispatch);
    getUsuarios(dispatch);
  }, []);
  return (
    <div className="flex flex-col space-y-2 p-2">
      <FiltroProductos />
      <div className="flex flex-wrap">
        {isLoading ? (
          <div className="flex flex-col bg-black opacity-75 p-2 mx-auto rounded justify-center items-center shadow-lg space-y-2">
            <Spinner />
          </div>
        ) : productos.length > 0 ? (
          <div className="flex justify-center space-x-2  h-full w-full">
            {productos.map((producto, index) => (
              <Card key={index} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <SinResultados />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
