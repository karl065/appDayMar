import {server} from '@/connections/connections';
import axios from 'axios';
import {useEffect, useState} from 'react';

const MAX_IMAGES = 5;

const CloudinaryWidget = ({imagen, setImagen}) => {
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);

  const [loadedImages, setLoadedImages] = useState(0); // Variable para llevar el conteo de imágenes cargadas

  const firma = async () => {
    try {
      const {data} = await axios.get(`${server.baseUrl}cloudinary`);
      setupCloudinaryWidget(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    firma();
  }, []);

  const setupCloudinaryWidget = (data) => {
    const options = {
      cloudName: data.cloudName,
      apiKey: data.apiKey,
      uploadSignatureTimestamp: data.timestamp,
      uploadSignature: data.signature,
      cropping: false,
      maxFiles: 5,
      upload_preset: 'appDayMarOficial',
      locale: 'es',
    };

    const processResults = (error, result) => {
      if (!error && result && result.event === 'success') {
        if (loadedImages < MAX_IMAGES) {
          setImagen((prevImagenes) => [
            ...prevImagenes,
            result.info.secure_url + ',' + result.info.public_id,
          ]);
          setLoadedImages(loadedImages + 1); // Incrementar el contador de imágenes cargadas
        }
      }
    };

    const widget = window.cloudinary.createUploadWidget(
      options,
      processResults
    );
    setCloudinaryWidget(widget);
  };

  const handleOpenWidget = () => {
    // Verificar si el widget se ha inicializado antes de abrirlo
    if (cloudinaryWidget) {
      cloudinaryWidget.open();
    }
  };

  const handleBorrarImagen = async (publicId) => {
    try {
      await axios.post(`${server.baseUrl}cloudinary`, {
        publicId,
      });
      setImagen((prevImagenes) =>
        prevImagenes.filter((img) => !img.includes(publicId))
      );
      setLoadedImages(loadedImages - 1); // Decrementar el contador de imágenes cargadas
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex">
        {imagen?.map((img, index) => {
          const [secureUrl, publicId] = img.split(',');
          return (
            <img
              src={secureUrl}
              alt={publicId}
              key={index}
              className="w-[100px] h-[100px] mx-2 rounded-lg"
              onClick={() => handleBorrarImagen(publicId)}
            />
          );
        })}
      </div>
      {loadedImages < MAX_IMAGES && (
        <button
          type="button"
          onClick={handleOpenWidget}
          className="bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Agregar Imágenes
        </button>
      )}
    </div>
  );
};

export default CloudinaryWidget;
