import {useFormik} from 'formik';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import CloudinaryWidget from '@/componentes/Cloudinary/Cloudinary';
import {useEffect, useState} from 'react';
import putProductos from '@/redux/Services/productos/putProductos';

const ActualizarProductos = () => {
  const dispatch = useDispatch();
  const [imagen, setImagen] = useState([]);
  const router = useRouter();
  const params = useSearchParams();
  const path = usePathname();

  const [categoria, setCategoria] = useState('');
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [selectCategoria, setSelectCategoria] = useState(false);
  const [categoriaError, setCategoriaError] = useState(false);
  const toggleCategoria = () => {
    setSelectCategoria(!selectCategoria);
    if (!categoria) setCategoriaError(true);
  };
  const handleCategoria = (e) => {
    e.preventDefault();
    formik.setFieldValue('idCategoria', e.target.value);
    setCategoria(e.target.value);
    setNombreCategoria(e.target.id);
    setCategoriaError(false);
    setSelectCategoria(!selectCategoria);
  };

  const idProducto = parseInt(params.get('id'));

  const categorias = useSelector((state) => state.valores.categorias);
  const productos = useSelector((state) => state.valores.productos);
  const producto = productos.find((prod) => prod.idProducto === idProducto);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre del producto requerido'),
    descripcion: Yup.string().required('Descripcion requerida'),
    precioCompra: Yup.string().required('Precio de compra requerido'),
    precioVenta: Yup.string().required('Precio de venta requerido'),
    stock: Yup.string().required('Stock requerido'),
    imagen: Yup.array().test(
      'min-images',
      'Seleccione al menos una imagen',
      (value) => {
        return value.length > 0;
      }
    ),
    tipo: Yup.string().required('Tipo requerido'),
    idCategoria: Yup.number()
      .test(
        'categoria-required',
        'Seleccione alguna categoria',
        (value) => value !== null && value !== undefined
      )
      .typeError('Seleccione alguna categoria'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      precioCompra: '',
      precioVenta: '',
      stock: '',
      imagen: [],
      tipo: '',
      status: 'D',
      idCategoria: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await putProductos(
        {
          nombre: values.nombre,
          descripcion: values.descripcion,
          precioCompra: parseInt(values.precioCompra),
          precioVenta: parseInt(values.precioVenta),
          stock: parseInt(values.stock),
          imagen: values.imagen,
          tipo: values.tipo,
          status: values.status,
          idCategoria: parseInt(values.idCategoria),
        },
        idProducto,
        dispatch
      );
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      router.push('/Admin/Productos', {scroll: false});
    },
  });
  useEffect(() => {
    if (producto) {
      if (path === '/Admin/ActualizarProducto') {
        setCategoria(producto.categorias.idCategoria);
        setNombreCategoria(producto.categorias.nombreCategoria);
        setImagen(producto.imagen);
        formik.setValues({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precioCompra: producto.precioCompra,
          precioVenta: producto.precioVenta,
          stock: producto.stock,
          imagen: producto.imagen,
          tipo: producto.tipo,
          status: producto.status,
          idCategoria: producto.categorias.idCategoria,
        });
      }
    }
  }, [producto]);
  useEffect(() => {
    formik.setFieldValue('imagen', imagen);
  }, [imagen]);
  return (
    <div className="flex items-center justify-center p-2">
      <div className="bg-black opacity-75 p-8 rounded shadow-lg inline-block">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <div className="space-y-3 mx-4">
              <div className="space-y-2">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Nombre del Producto"
                  className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="text-red-900 font-bold">
                    {formik.errors.nombre}
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <label>Tipo</label>
                <input
                  type="text"
                  name="tipo"
                  id="tipo"
                  value={formik.values.tipo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="tipo"
                  className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {formik.touched.tipo && formik.errors.tipo ? (
                  <div className="text-red-900 font-bold">
                    {formik.errors.tipo}
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <label>Descripcion</label>
                <input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Descripcion"
                  className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {formik.touched.descripcion && formik.errors.descripcion ? (
                  <div className="text-red-900 font-bold">
                    {formik.errors.descripcion}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="space-y-3 mx-4">
              <div className="space-y-2">
                <label>Precio de Compra</label>
                <input
                  type="text"
                  name="precioCompra"
                  id="precioCompra"
                  value={formik.values.precioCompra}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Precio de Compra"
                  className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {formik.touched.precioCompra && formik.errors.precioCompra ? (
                  <div className="text-red-900 font-bold">
                    {formik.errors.precioCompra}
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <label> Precio de Venta</label>
                <input
                  type="text"
                  name="precioVenta"
                  id="precioVenta"
                  value={formik.values.precioVenta}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Precio de Venta"
                  className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {formik.touched.precioVenta && formik.errors.precioVenta ? (
                  <div className="text-red-900 font-bold">
                    {formik.errors.precioVenta}
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <label>Stock</label>
                <input
                  type="text"
                  name="stock"
                  id="stock"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="stock"
                  className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {formik.touched.stock && formik.errors.stock ? (
                  <div className="text-red-900 font-bold">
                    {formik.errors.stock}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="space-y-3 mx-4">
              <div className="space-y-2">
                <label>Categoria</label>
                <div className="space-y-2">
                  <button
                    id="dropdownCategoriaButton"
                    data-dropdown-toggle="dropdownCategoria"
                    data-dropdown-delay="500"
                    data-dropdown-trigger="hover"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={toggleCategoria}
                  >
                    {categoria ? nombreCategoria : 'Seleccione una Categoría'}{' '}
                    <svg
                      className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                        selectCategoria === true ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {selectCategoria && (
                    <div
                      id="dropdownCategoria"
                      className={`z-60 ${
                        selectCategoria ? 'absolute' : 'hidden'
                      } bg-black divide-y divide-black rounded-lg shadow p-2 dark:bg-black border-white border-2 opacity-75 dark:opacity-100`}
                    >
                      <ul
                        className="text-sm text-white dark:text-white flex flex-col"
                        aria-labelledby="dropdownCategoriaButton"
                      >
                        {categorias.map((cat, index) => (
                          <button
                            key={index}
                            className="z-50 "
                            id={cat.nombreCategoria}
                            onClick={handleCategoria}
                            value={cat.idCategoria}
                          >
                            {cat.nombreCategoria}
                          </button>
                        ))}
                      </ul>
                    </div>
                  )}
                  {categoriaError && (
                    <div className="text-red-900 font-bold">
                      {formik.errors.idCategoria}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <CloudinaryWidget imagen={imagen} setImagen={setImagen} />
                {formik.touched.imagen && formik.errors.imagen ? (
                  <div className="text-red-900 font-bold">
                    {formik.errors.imagen}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <button
            onSubmit={formik.handleSubmit}
            className="bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Actualizar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarProductos;
