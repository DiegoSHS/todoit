'use client'

import { CircularProgress } from "@nextui-org/react"
import { Toaster, useToaster } from "react-hot-toast"
const Notify = () => {
    const { handlers: { startPause, endPause } } = useToaster()
    return (
        <div onMouseEnter={startPause} onMouseLeave={endPause}>
            <Toaster position="top-right" toastOptions={{
                error: {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                },
                loading: {
                    icon: <CircularProgress className="h-2" size="sm" />,
                }
            }} />
        </div>
    )
}

export default Notify