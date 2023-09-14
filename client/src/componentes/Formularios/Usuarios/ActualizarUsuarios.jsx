import {useFormik} from 'formik';
import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import putUsuarios from '@/redux/Services/usuarios/putUsuarios';

const ActualizarUsuario = () => {
  const dispatch = useDispatch();
  const [rol, setRol] = useState('');
  const roles = ['Admin', 'Empleado', 'Cliente'];
  const router = useRouter();
  const params = useSearchParams();
  const path = usePathname();
  const usuarios = useSelector((state) => state.valores.usuarios);

  const idUser = parseInt(params.get('id'));

  const usuario = usuarios.find((user) => user.idUser === idUser);
  const [selectRol, setSelectRol] = useState(false);
  const toggleRol = () => {
    setSelectRol(!selectRol);
  };

  const handleRol = (e) => {
    e.preventDefault();
    setRol(e.target.value);

    // Alternar el estado del botón de selección
    setSelectRol(!selectRol);
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre requerido'),
    direccion: Yup.string().required('Direccion requerida'),
    celular: Yup.string().required('Celular requerido'),
    email: Yup.string()
      .trim()
      .email('Escribe un email valido')
      .required('Email requerido'),
    password: Yup.string().required('Contraseña requerida'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('Confirmacion requerida'),
  });

  const formik = useFormik({
    initialValues: {
      idUser: '',
      nombre: '',
      direccion: '',
      celular: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      rol: rol,
    },
    validationSchema,
    onSubmit: async (values) => {
      await putUsuarios(
        {
          nombre: values.nombre,
          direccion: values.direccion,
          celular: values.celular,
          email: values.email,
          password: values.password,
          rol: rol,
        },
        values.idUser,
        dispatch
      );
      Swal.fire({
        title: 'Usuario Actualizado con exito',
        icon: 'success',
        confirmButtonText: 'ok',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/Admin/Usuarios');
        }
      });
    },
  });

  useEffect(() => {
    if (usuario) {
      setRol(usuario.rol);
      formik.setValues({
        idUser: usuario.idUser,
        nombre: usuario.nombre,
        direccion: usuario.direccion,
        celular: usuario.celular,
        email: usuario.email,
        rol: usuario.rol,
      });
    }
  }, [usuario]);

  return (
    <div className="flex items-center justify-center mt-2">
      <div className="bg-black opacity-75 p-8 rounded shadow-lg">
        <form className="flex space-x-2" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <label
              type="text"
              name="idUser"
              id="idUser"
              value={formik.values.idUser}
              className="w-full border text-white rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {formik.values.idUser}
            </label>

            <div className="space-y-2">
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nombre"
                className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="text-red-900 font-bold">
                  {formik.errors.nombre}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                name="direccion"
                id="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Direccion"
                className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {formik.touched.direccion && formik.errors.direccion ? (
                <div className="text-red-900 font-bold">
                  {formik.errors.direccion}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                name="celular"
                id="celular"
                value={formik.values.celular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Celular"
                className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {formik.touched.celular && formik.errors.celular ? (
                <div className="text-red-900 font-bold">
                  {formik.errors.celular}
                </div>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-900 font-bold">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Contraseña"
                className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-900 font-bold">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirma la contraseña"
                className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation ? (
                <div className="text-red-900 font-bold">
                  {formik.errors.passwordConfirmation}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="space-y-2">
              <button
                id="dropdownDelayButton"
                data-dropdown-toggle="dropdownDelay"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={toggleRol}
              >
                {rol ? rol : 'Seleccione un Rol'}{' '}
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                    selectRol === true ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {selectRol && (
                <div
                  id="dropdownDelay"
                  className={`z-60 ${
                    selectRol ? 'absolute' : 'hidden'
                  } bg-black divide-y divide-black rounded-lg shadow p-2 dark:bg-black border-white border-2 opacity-75 dark:opacity-100`}
                >
                  <ul
                    className="text-sm text-white dark:text-white flex flex-col"
                    aria-labelledby="dropdownDelayButton"
                  >
                    {roles.map((rolSel, index) => (
                      <button
                        key={index}
                        className="z-50 "
                        id={rolSel}
                        onClick={handleRol}
                        value={rolSel}
                      >
                        {rolSel}
                      </button>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              className="bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarUsuario;
