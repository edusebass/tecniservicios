import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const goToPage = (page: string) => {
        //Se valida que la ruta la que quiero ir es diferente a la de origen, sino no tiene sentido navegar ni reiniciar el state de items
        if (location.pathname !== page) {
        navigate(page);
        
        }
    };

    return (
        <div className="sticky top-0 z-20">
            <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
                <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 rounded-b-2xl shadow-md">
                    <div className="flex flex-col max-w-screen-xl px-4 mx-auto sm:items-center sm:justify-between sm:flex-row sm:px-6 lg:px-8">
                        <div className="flex flex-row items-center justify-between p-4">
                            <a
                                href="#"
                                className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
                            >
                                TECNISERVICIOS
                            </a>
                            <button
                                className={`rounded-lg sm:hidden focus:outline-none focus:shadow-outline flex items-center justify-center transition ease-in-out duration-400 ${isOpen ? 'rotate-180 mt-1' : 'rotate-0 mt-2'}`}
                                onClick={toggleMenu}
                            >
                                <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
                                    <path
                                        fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <nav
                            className={`sm:items-center sm:justify-end sm:flex sm:flex-row ${isOpen ? 'flex' : 'hidden'} flex-col rounded-xl justify-center items-center py-4 gap-1`}
                        >
                            <a
                                className="px-4 py-3 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline border-b sm:border-none w-full text-center duration-300"
                                // onClick={toggleMenu}
                                onClick={() => goToPage("/")}
                            >
                                Inicio
                            </a>
                            <a
                                className="px-4 py-3 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline w-full text-center duration-300 border-b sm:border-none"
                                onClick={() => goToPage("/sendemail")}
                            >
                                Enviar al correo
                            </a>
                            <a
                                className="px-4 py-3 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline w-full text-center duration-300 border-b sm:border-none"
                                onClick={() => goToPage("/sendPhone")}
                            >
                                Enviar al celular
                            </a>
                            <button className="rounded-lg sm:hidden focus:outline-none focus:shadow-outline flex items-center justify-center rotate-180 w-full" onClick={toggleMenu}>
                                <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
                                    <path
                                        className={`duration-300 ease-in-out ${isOpen ? 'none opacity-0' : 'block opacity-100'}`} fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"
                                    ></path>
                                    <path
                                        className={`duration-300 ease-in-out ${isOpen ? 'block opacity-100' : 'none opacity-0'}`}
                                        fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
