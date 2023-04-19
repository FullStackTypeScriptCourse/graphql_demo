import { createContext, useState } from 'react';
import { Theme } from '../types';
export const ThemeContext = createContext<Theme>({isLight:true, light: { text: '#555', ui: '#ddd', bg: '#eee',}, dark: { text: '#ddd', ui: '#333', bg: '#555',}});


export default function ThemeContextProvider(props:{children:JSX.Element}) {
    const [theme, setTheme] = useState<Theme>({
        isLight:true,
        light: {
            text: '#555',
            ui: '#ddd',
            bg: '#eee',
        },
        dark: {
            text: '#ddd',
            ui: '#333',
            bg: '#555',
        }
    });
  return (
    <ThemeContext.Provider value={{...theme}}>
        <button onClick={() => setTheme({...theme, isLight: !theme.isLight})}>Toggle Theme</button>
        {props.children}
    </ThemeContext.Provider>
  )
}
