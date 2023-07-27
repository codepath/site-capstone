import Modal from '@mui/material/Modal'

export default function HotelModal({ setModalOpen, modalOpen, hotel }) {
    
    return (
        <Modal open={modalOpen}>
            <div className="flex justify-center items-center h-screen font-sans">
                <div className="border w-72 bg-white border-blue-500 rounded-md px-3">
                    <button onClick={() => {setModalOpen(false), console.log(modalOpen)}}>X</button>
                    <div>Worked...</div>
                </div>
            </div>


        </Modal>
    )
}