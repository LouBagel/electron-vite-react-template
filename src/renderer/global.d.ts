// src/renderer/global.d.ts
export {}

// Extend the Window interface to include the type for electronAPI
declare global {
  interface Window {
    electronAPI?: {
      ping: () => void
      // add more methods if you exposed them in preload
    }
  }
}
