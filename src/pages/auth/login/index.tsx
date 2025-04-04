import { useAuth } from "@/context/auth";
import { useState } from "react";
import "../../../app/globals.css"
import { useRouter } from "next/router";

type User = {
    username: string
    password: string
}
export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState<User>({ username: "", password: "" })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(user)
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                credentials: "include",
                body: JSON.stringify({ user }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error en el login');
            }

            router.push("/")
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-black p-6 rounded-2xl shadow-xl w-md relative border border-gray-700">
                <h2 className="text-7xl font-bold text-white mb-4 text-left text-center">Inicia sesion</h2>
                <form onSubmit={handleLogin}>

                    <div className="mt-4 space-y-4">
                        <input name="user" onChange={handleChange} type="text" placeholder="Usuario" className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input name="password" onChange={handleChange} type="password" placeholder="Contraseña" className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <div className="flex justify-between">

                            <button type="submit" className="px-4 py-2 bg-white text-black rounded-full ">Ingresar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}