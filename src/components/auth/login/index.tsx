import { useState, FC } from "react";
import { useRouter } from "next/router";
import "../../../app/globals.css";

type User = {
    username: string;
    password: string;
};

const Login: FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null); // Error state
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null); // Reset error before trying again

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                credentials: "include",
                body: JSON.stringify(user), // Send user directly
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error en el login");
            }

            router.push("/"); // Redirect on success
        } catch (error: any) {
            setError(error.message || "Hubo un error durante el login"); // Set error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-black p-6 rounded-2xl shadow-xl w-md relative border border-gray-700">
                <h2 className="text-7xl font-bold text-white mb-4 text-center">Inicia sesión</h2>

                <form onSubmit={handleLogin}>
                    <div className="mt-4 space-y-4">
                        <input
                            name="username" // Use "username" instead of "user"
                            onChange={handleChange}
                            type="text"
                            placeholder="Usuario"
                            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Contraseña"
                            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {error && (
                            <div className="text-red-500 text-sm mt-2">{error}</div> // Display error message
                        )}
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-white text-black rounded-full"
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? "Cargando..." : "Ingresar"} {/* Show loading text */}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;