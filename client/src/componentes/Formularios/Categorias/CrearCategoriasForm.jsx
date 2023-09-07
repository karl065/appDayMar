import {useFormik} from 'formik';
import {usePathname, useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import postCategorias from '@/redux/Services/categorias/postCategorias';

const CrearCategoriasForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const categorias = useSelector((state) => state.valores.categorias);
  const validationSchema = Yup.object().shape({
    nombreCategoria: Yup.string()
      .required('Nombre de categoria requerido')
      .test('unique-categoria', 'La categoria ya esta registrada', (value) => {
        return !categorias.some((cat) => cat.nombreCategoria === value.trim());
      }),
    descripcion: Yup.string().required('Descripcion requerida'),
  });

  const formik = useFormik({
    initialValues: {
      nombreCategoria: '',
      descripcion: '',
      status: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      await postCategorias(
        {
          nombreCategoria: values.nombreCategoria,
          descripcion: values.descripcion,
          status: values.status,
        },
        dispatch
      );
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro exitoso',
        showConfirmButton: false,
        timer: 1500,
      });
      router.push('/Admin/CrearProductos', {scroll: false});
    },
  });

  return (
    <div className="justify-center inline-block">
      <div className="flex bg-black opacity-75 p-8 rounded shadow-lg ">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <input
              type="text"
              name="nombreCategoria"
              id="nombreCategoria"
              value={formik.values.nombreCategoria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nombre de la Categoria"
              className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {formik.touched.nombreCategoria && formik.errors.nombreCategoria ? (
              <div className="text-red-900 font-bold">
                {formik.errors.nombreCategoria}
              </div>
            ) : null}
          </div>
          <div className="space-y-2">
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
          <button className="bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Registrar Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearCategoriasForm;
