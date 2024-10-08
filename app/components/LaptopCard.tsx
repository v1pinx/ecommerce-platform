
interface Laptop {
    id: number;
    name: string;
    screen: string;
    processor: string;
    graphics: string;
    ram: string;
    storage: string;
    weight: string;
    os: string;
    battery: string;
    image: string;
}

interface LaptopCardProps {
    laptop: Laptop;
}

export default function LaptopCard({ laptop }: LaptopCardProps) {
    return (
        <div className="max-w-60 rounded overflow-hidden shadow-lg border border-gray-300">
            <img
                className="w-full h-40 object-cover"
                src={laptop.image}
                alt={laptop.name}
            />
            <div className="px-3 py-3">
                <div className="font-bold text-sm mb-2 text-center">{laptop.name}</div>
                <p className="text-gray-700 text-xs text-center">{laptop.screen}</p>
                <p className="text-gray-700 text-xs text-center">{laptop.processor}</p>
                <p className="text-gray-700 text-xs text-center">{laptop.graphics}</p>
                <p className="text-gray-700 text-xs text-center">{laptop.ram}</p>
                <p className="text-gray-700 text-xs text-center">{laptop.storage}</p>
                <p className="text-gray-700 text-xs text-center">{laptop.weight}</p>
                <p className="text-gray-700 text-xs text-center">{laptop.os}</p>
                <p className="text-gray-700 text-xs text-center">{laptop.battery}</p>
            </div>
            <div className="px-3 py-3 flex gap-2 justify-center">
                <button className="bg-teal-500 text-white text-sm font-semibold py-2 px-3 rounded">
                    View Details
                </button>
                <button className="text-gray-500 border border-gray-500 text-sm font-semibold py-2 px-3 rounded">
                    Amazon
                </button>
            </div>
        </div>
    );
}
