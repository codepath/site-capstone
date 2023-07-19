import Button from '@mui/material/Button'

export default function Navbar() {
    return (
        <div className="px-64 bg-gray-100 bg-opacity-75 mb-6 justify-end flex h-16 border-b border-blue-500 sticky top-0 z-10">
            <Button>Sign up</Button>
            <Button>Log in</Button>
        </div>
    )
}