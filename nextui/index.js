'use client'
import { NextUIProvider } from '@nextui-org/system'

export const UIProvider = ({ children }) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}
