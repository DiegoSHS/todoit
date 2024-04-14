'use client'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider } from 'next-themes'

export const UIProvider = ({ children }) => {
    return (
        <NextUIProvider>
            <ThemeProvider attribute='class' enableSystem enableColorScheme>
                {children}
            </ThemeProvider>
        </NextUIProvider>
    )
}
