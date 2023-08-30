'use client';
import Card from '@/componentes/Card/Card';
import {getProductos} from '@/redux/Services/productos/getProductos';
import {getUsuarios} from '@/redux/Services/usuarios/getUsuarios';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.valores.usuarios);
  const productos = useSelector((state) => state.valores.productos);
  console.log(usuarios);
  console.log(productos);
  useEffect(() => {
    getProductos(dispatch);
    getUsuarios(dispatch);
  }, []);
  return (
    <div className="flex justify-center m-6">
      {productos.map((producto, index) => (
        <Card key={index} producto={producto} />
      ))}
    </div>
  );
};

export default HomePage;
