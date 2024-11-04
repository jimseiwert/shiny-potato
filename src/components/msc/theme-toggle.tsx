"use client";
import React from 'react'
import { useTheme } from "next-themes";
import { Moon, Sun } from 'lucide-react';

export function ModeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
      <button 
          onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
          className='dark:text-white text-gray-800 h-full'>
          {currentTheme === 'light' && <Sun/>}
          {currentTheme === 'dark' && <Moon/>}
      </button>
  )
}
