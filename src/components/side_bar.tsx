import { useAuth } from "@/context/auth";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) {
    const { userLogged } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<{
        title: string;
        content: React.ReactNode;
    } | null>(null);

    const openModal = (title: string, content: React.ReactNode) => {
        setModalContent({ title, content });
        setModalOpen(true);
    };

    return (
        <div
            className={`fixed h-screen py-5 bg-black shadow-md w-full flex justify-between transform transition-all duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0 sm:w-auto sm:pl-30`}
        >
            {/* Botón de Cerrar (solo en dispositivos móviles) */}
            <button
                type="button"
                className="sm:hidden absolute right-5 bg-gray-50 text-black rounded-full w-10 h-10 flex items-center justify-center"
                onClick={() => setOpen(!open)}
            >
                x
            </button>

            <div className="space-y-4 flex flex-col mt-5 sm:mt-0 px-10">
                <button
                    onClick={() => openModal("Inicio", <p>Contenido de inicio...</p>)}
                    className="text-lg font-semibold text-white text-left hover:text-blue-500"
                >
                    Inicio
                </button>
                <button
                    onClick={() =>
                        openModal("Configuración", <p>Opciones de configuración...</p>)
                    }
                    className="text-lg text-left font-semibold text-white hover:text-blue-500"
                >
                    Configuración
                </button>

                <div className="text-gray-700 font-semibold mt-auto self-start">
                    {dropdownOpen && (
                        <div className="bottom-full mb-2 w-48 bg-white shadow-lg rounded-md py-2">
                            <button
                                onClick={() => openModal("Perfil", <p>Información del perfil...</p>)}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                            >
                                Ver perfil
                            </button>
                            {userLogged ? (
                                <button
                                    onClick={() =>
                                        openModal("Cerrar sesión", <p>¿Seguro que quieres cerrar sesión?</p>)
                                    }
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                >
                                    Cerrar sesión
                                </button>
                            ) : (
                              
                                <Link href={"/auth/login"}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200">

                                    Iniciar sesión
                          
                                </Link>
                            )}
                        </div>
                    )}
                    <button
                        className="text-gray-700 font-semibold bg-gray-100 px-5 py-2 rounded-full text-xl"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {userLogged && userLogged.user ? userLogged.user : "@usuario"}
                    </button>
                </div>
            </div>

            {/*     {modalContent && (
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalContent.title}>
                    {modalContent.content}
                </Modal>
            )} */}
        </div>
    );
}
