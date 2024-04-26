// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import AppContext from '../contexts/app'
import { CssBaseline } from '@mui/material'
import { ChakraProvider, extendTheme as chakraExtendTheme } from '@chakra-ui/react';
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from '@mui/material/styles';
import { PostsContextProvider } from '@/contexts/posts';

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
          <CssBaseline />
          <AppContext >
          <PostsContextProvider>
              {children}
          </PostsContextProvider>
          </AppContext>
        </MaterialThemeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}