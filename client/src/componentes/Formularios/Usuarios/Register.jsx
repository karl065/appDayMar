import login from '@/helpers/login';
import register from '@/helpers/registerHelper';
import {useFormik} from 'formik';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import {getUsuarios} from '@/redux/Services/usuarios/getUsuarios';

const Register = () => {
  const dispatch = useDispatch();
  const [rol, setRol] = useState('');
  const roles = ['Admin', 'Empleado', 'Cliente'];
  const router = useRouter();
  const path = usePathname();
  const usuarios = useSelector((state) => state.valores.usuarios);

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
      .required('Email requerido')
      .test('unique-email', 'El email ya esta registrado', (value) => {
        return !usuarios.some((user) => user.email === value.trim());
      }),
    password: Yup.string().required('Contraseña requerida'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('Confirmacion requerida'),
  });

  const formik = useFormik({
    initialValues: {
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
      await register(
        values.nombre,
        values.direccion,
        values.celular,
        values.email,
        values.password,
        rol
      );
      Swal.fire({
        title: 'Registro exitoso',
        icon: 'success',
        confirmButtonText: 'ok',
      }).then((result) => {
        if (result.isConfirmed) {
          if (path === '/Admin/CrearUsuarios') {
            router.push('/Admin/Usuarios');
            getUsuarios(dispatch);
          } else {
            login(values.email, values.password);
            router.push('/', {scroll: false});
          }
        }
      });
    },
  });
  useEffect(() => {
    if (path === '/Register') setRol('Cliente');
  }, [path]);
  return (
    <div className="flex items-center justify-center mt-2">
      <div className="bg-black opacity-75 p-8 rounded shadow-lg">
        <form className="flex space-x-2" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
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
              {path === '/Admin/CrearUsuarios' ? (
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
              ) : null}
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
              {path === '/Admin/CrearUsuarios' ? 'Registrar' : 'Registrarse'}
            </button>
            {path !== '/Admin/CrearUsuarios' && (
              <div className="bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                <Link href="/Login">Iniciar sesión</Link>
              </div>
            )}
          </div>
        </form>
        {path !== '/Admin/CrearUsuarios' && (
          <div>
            <div className="my-4 border-b border-gray-300 flex items-center space-x-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="text-gray-600">
                Iniciar sesión con cuentas sociales
              </p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                aria-label="Log in with Google"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
              </button>
              <button
                aria-label="Log in with Twitter"
                className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                </svg>
              </button>
              <button
                aria-label="Log in with GitHub"
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 focus:outline-none focus:bg-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
