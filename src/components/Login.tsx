import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    const captcha = useRef(null)
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaValid) {
            Swal.fire({
                icon: 'warning',
                title: 'Captcha no resuelto',
                text: 'Por favor, resuelva el reCAPTCHA.',
            });
            return;
        }

        if (email === 'admin@admin.com' && password === 'Admin') {
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido, Admin!',
            }).then(() => {
                navigate('/characters');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrecto',
            });
        }
    };


    const handleCaptchaChange = (value: string | null) => {
        setCaptchaValid(!!value);
    };

    return (
        <div className='bg-gray-100'>
            <div className="min-h-screen flex items-center justify-center">
                <div className="grid grid-cols-2  bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex items-center justify-center">
                        <img
                            src="https://www.tuproyectodevida.pe/wp-content/uploads/2022/11/razones-estudiar-enfermeria-1200x628.jpg"
                            alt="Imagen de ejemplo"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block mb-2">Usuario:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Contraseña:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                />
                            </div>
                            <div className="mt-4">
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LfapjUqAAAAAF9PVBbT-hrDpVBphsBbB6pUzl3d"
                                    onChange={handleCaptchaChange}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!captchaValid}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 disabled:bg-gray-400"
                            >
                                Iniciar Sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;
