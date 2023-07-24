import './index.css'

export default function ImageCard({ description, img }) {
    return (
        <div className="relative h-48 w-full">
            <img src={img} className="h-full w-full object-cover" alt="Image" />
            <div className="absolute bottom-0 left-0 right-0 pl-4
            py-2 bg-black bg-opacity-50 text-white">
                {description}
            </div>
        </div>

    )
}