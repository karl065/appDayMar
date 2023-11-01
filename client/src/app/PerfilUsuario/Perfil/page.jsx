'use client';
import React from 'react';
import UserPage from '../page';
import {useSelector} from 'react-redux';

const page = () => {
  const usuario = useSelector((state) => state.valores.login);

  return (
    <UserPage>
      <div className="w-full h-full p-4 bg-black rounded-lg opacity-70">
        <div className="grid items-center h-full grid-flow-col justify-items-stretch">
          <div className="flex flex-col justify-center w-full h-full p-2 mr-0 space-y-5 uppercase border-t-2 border-b-2 border-r-2 border-white rounded-md">
            <div className="flex space-x-4">
              <label>Nombre:</label>
              <h1>{usuario.nombre}</h1>
              <h1>✏</h1>
            </div>
            <div className="flex space-x-4">
              <label>Direccion:</label>
              <h1>{usuario.direccion}</h1>
              <h1>✏</h1>
            </div>
            <div className="flex space-x-4">
              <label>Celular:</label>
              <h1>{usuario.celular}</h1>
              <h1>✏</h1>
            </div>
            <div className="flex space-x-4">
              <label>Email:</label>
              <h1>{usuario.email}</h1>
              <h1>✏</h1>
            </div>
            <div className="flex space-x-4">
              <label>Actualizar la Contraseña:</label>
              <input
                type="password"
                placeholder="Contraseña nueva"
                className="px-1 uppercase bg-black border border-transparent rounded-lg shadow-md w-[15rem] sm:text-base hover:bg-lime-600/80 shadow-white hover:text-black"
              />
            </div>
            <div className="flex space-x-4">
              <label>Confirme la Contraseña:</label>
              <input
                type="password"
                placeholder="Confirme la contraseña"
                className="px-1 uppercase bg-black border border-transparent rounded-lg shadow-md w-[15rem] sm:text-base hover:bg-lime-600/80 shadow-white hover:text-black"
              />
            </div>
            <div className="flex justify-center">
              <button className="flex items-center justify-center p-2 py-2 text-sm font-bold text-white uppercase transition-colors duration-300 border border-transparent rounded-lg shadow-md sm:text-base gap-x-3 hover:bg-lime-600/80 shadow-white">
                Actualizar Contraseña
              </button>
            </div>
          </div>
          <div className="items-center justify-center hidden w-full h-full border-t-2 border-b-2 border-l-2 border-white rounded-md sm:flex ">
            <img
              src="https://res.cloudinary.com/dpjeltekx/image/upload/v1693415055/appDayMar/app/Resultado_Final_zokhlr.png"
              alt="daymar"
              className="w-[300px] h-[300px]"
            />
          </div>
        </div>
      </div>
    </UserPage>
  );
};

export default page;
