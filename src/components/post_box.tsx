import Image from "next/image";
import { useState } from "react";

export default function PostBox() {
    const [content, setContent] = useState("");
    const maxLength = 280;

    return (
        <div className="border-b w-full  border-gray-300  p-8  bg-black">
            <div className="flex items-start space-x-3">
                <Image src="https://via.placeholder.com/50" alt="avatar" className="w-12 h-12 rounded-full" />
                <div className="w-full">
                    <textarea
                        className="w-full resize-none border-none focus:ring-0 text-lg placeholder-gray-500"
                        rows={3}
                        placeholder="¿Qué estás pensando?"
                        value={content}
                        maxLength={maxLength}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <span className={`text-sm ${content.length === maxLength ? "text-red-500" : "text-gray-500"}`}>
                            {content.length} / {maxLength}
                        </span>
                        <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-600 disabled:bg-gray-400"
                            disabled={content.trim().length === 0}
                        >
                            Publicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
