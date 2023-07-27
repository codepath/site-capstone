import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ authenticated, setAuthenticated }) {
    const [registerOpen, setRegisterOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function handleRegister(e) {
        e.preventDefault()
        const userData = {
            password: password,
            email: email
        }
        try {
            axios.post()
            setEmail("")
            setPassword("")
        } catch (error) {
            
        }

    }

    async function handleLogin(e) {
        e.preventDefault
        const userData = {
            password: password,
            email: email
        }
        
    }

    return (
        <div className="px-56 bg-gray-100 bg-opacity-75 flex h-16 border-b border-blue-500 sticky top-0 z-10 justify-between">
            <Link to="/" className="flex">
                <div className="flex">
                    {/*TODO: fix nav bar home button.*/}
                    <Button disabled={true}>Home</Button>

                </div>
            </Link>
            <div className="flex">
                <Button>FAQ</Button>
                <Button onClick={() => setRegisterOpen(true)}>Sign up</Button>
                <Button onClick={() => setLoginOpen(true)}>Log in</Button>
                <Modal 
                    open={registerOpen}
                    >
                        <div className="flex justify-center items-center h-screen font-sans">
                            <div className="border w-72 bg-white border-blue-500 rounded-md px-3">
                                <div>
                                    <form onSubmit={handleRegister}>
                                        <div className="flex justify-between">
                                            <div><h2 className="text-2xl">Register</h2></div>
                                            <div title="Close register modal" className="flex cursor-pointer w-5 justify-end" onClick={() => setRegisterOpen(false)}>—</div>
                                        </div>
                                        <div>Save your itineraries and view past bookings.</div>
                                        <div className="bg-blue-500 w-full h-0.5 my-3"></div>
                                        <div>Email<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-4" 
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            type="email" required 
                                        />
                                        <div>Password<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-4" 
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            type="password" required 
                                        />
                                        <div>Confirm password<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-2" 
                                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            type="password" required 
                                        />
                                        {(confirmPassword !== password) && (
                                            <div className="text-red-500 mb-3">Passwords do not match.</div>
                                        )}
                                        <Button sx={{'border': '1px solid', 
                                                    'height' : '50px',
                                                    'width' : '100%',
                                                    'borderRadius' : '5px',
                                                    'marginBottom' : '10px'}}
                                                disabled={email === "" ||
                                                        password === "" ||
                                                        confirmPassword === "" ||
                                                        confirmPassword !== password
                                                        ? true : false}
                                                onClick={handleRegister}>Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                </Modal>
                <Modal 
                    open={loginOpen}
                    >
                        <div class="flex justify-center items-center h-screen font-sans">
                            <div className="border w-72 bg-white border-blue-500 rounded-md px-3">
                                <div>
                                    <form onSubmit={handleLogin}>
                                        <div className="flex justify-between">
                                            <div><h2 className="text-2xl">Log in</h2></div>
                                            <div title="Close log in modal" className="flex cursor-pointer w-5 justify-end" onClick={() => setLoginOpen(false)}>—</div>
                                        </div>
                                        <div>View your saved itineraries and past bookings.</div>
                                        <div className="bg-blue-500 w-full h-0.5 my-3"></div>
                                        <div>Email<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-4" 
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            type="email" required 
                                        />
                                        <div>Password<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-4" 
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            type="password" required 
                                        />
                                        <Button sx={{'border': '1px solid', 
                                                    'height' : '50px',
                                                    'width' : '100%',
                                                    'borderRadius' : '5px',
                                                    'marginBottom' : '10px'}}
                                                disabled={email === "" ||
                                                        password === ""
                                                        ? true : false}
                                                onClick={handleLogin}>Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                </Modal>
            </div>
        </div>
    )
}