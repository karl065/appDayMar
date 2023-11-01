'use client';
import login from '@/helpers/login';
import {userLogin} from '@/redux/Slices/slice';
import {useFormik} from 'formik';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const page = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Escribe un email valido')
      .required('Email requerido'),
    password: Yup.string().required('Contraseña requerida'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = await login(values.email, values.password);

      if (data.error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: data.error,
          showConfirmButton: false,
          timer: 2500,
        });
        formik.setValues({
          email: '',
          password: '',
        });
        return;
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login exitoso',
        showConfirmButton: false,
        timer: 2500,
      });
      const {token, id, email, rol} = data;
      localStorage.setItem('token', token);
      const usuario = {
        token,
        id,
        email,
        rol,
      };
      dispatch(userLogin(usuario));
      if (rol === 'Cliente') router.push('/');
      if (rol === 'SuperUser' || rol === 'Admin') router.push('/Admin');
    },
  });
  return (
    <div className="flex p-4 justify-center ">
      <div className="bg-black opacity-75 p-8 rounded shadow-lg">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
            <div className="text-blue-500 text-sm">
              <a href="#">Olvide mi contraseña</a>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>
        {/* <div className="my-4 border-b border-gray-300 flex items-center space-x-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="text-gray-600">Iniciar sesión con cuentas sociales</p>
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
        </div> */}
        <p className="text-gray-600 mt-4">
          No tienes cuenta?{' '}
          <Link href="/Register" className="text-blue-500">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
