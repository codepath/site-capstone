import './index.css'

export default function ImageCard({ description, img }) {
    return (
        <div className="h-48 w-full object-cover">
            <img src={img} />
            <div>{description}</div>
        </div>
    )
}