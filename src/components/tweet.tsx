interface TweetCardProps {
    username: string;
    body: string;
    title: string
    avatar: string;
}
export default function TweetCard({ username, body, title, avatar }: TweetCardProps) {
    return (
        <div className=" border-b p-8 py-3 bg-black">
            <div className="flex items-start space-x-3">
                <img src={`${avatar}`} alt="avatar" className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-semibold text-white">{username}</p>
                    <p className="text-gray-700 text-xl text-white mt-1">{body}</p>
                    <div className="flex items-center space-x-4 text-gray-500 text-sm mt-2">

                        <button className="hover:text-red-500 text-white">❤️ Me gusta</button>
                    </div>
                </div>
            </div>
        </div>
    );
}