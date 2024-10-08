import LaptopCard from './LaptopCard'; // Adjust the import based on your file structure

export default function LaptopShowcase() {
    const laptops = [
        {
            id: 1,
            name: "Lenovo Education 500e",
            screen: "11.6\" - 1366x768",
            processor: "INTEL Celeron N4120",
            graphics: "INTEL HD Graphics 600",
            ram: "4 GB DDR3",
            storage: "32 GB - EMMC",
            weight: "1.35 Kg / 2.98 lb",
            os: "Chrome OS",
            battery: "Estimated 11.7 - 12.5 h",
            image: "https://via.placeholder.com/300x180",
        },
        {
            id: 2,
            name: "HP Pavilion 15",
            screen: "15.6\" - 1920x1080",
            processor: "AMD Ryzen 5 4500U",
            graphics: "NVIDIA GeForce MX250",
            ram: "8 GB DDR4",
            storage: "512 GB SSD",
            weight: "1.75 Kg / 3.85 lb",
            os: "Windows 10",
            battery: "Estimated 10 - 12 h",
            image: "https://via.placeholder.com/300x180",
        },
        {
            id: 3,
            name: "Dell XPS 13",
            screen: "13.3\" - 1920x1080",
            processor: "INTEL Core i7-1165G7",
            graphics: "Intel Iris Xe Graphics",
            ram: "16 GB LPDDR4x",
            storage: "1 TB SSD",
            weight: "1.2 Kg / 2.64 lb",
            os: "Windows 10",
            battery: "Estimated 12 - 14 h",
            image: "https://via.placeholder.com/300x180",
        },
        {
            id: 4,
            name: "Asus ZenBook 14",
            screen: "14\" - 1920x1080",
            processor: "INTEL Core i5-1135G7",
            graphics: "Intel Iris Xe Graphics",
            ram: "8 GB LPDDR4x",
            storage: "256 GB SSD",
            weight: "1.3 Kg / 2.87 lb",
            os: "Windows 10",
            battery: "Estimated 15 - 16 h",
            image: "https://via.placeholder.com/300x180",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {laptops.map((laptop) => (
                <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
        </div>
    );
}
