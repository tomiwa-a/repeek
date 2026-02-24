import React, { createContext, useContext, useState } from 'react'

interface UIContextType {
  isSlipBuilderOpen: boolean
  openSlipBuilder: () => void
  closeSlipBuilder: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isSlipBuilderOpen, setIsSlipBuilderOpen] = useState(false)

  const openSlipBuilder = () => setIsSlipBuilderOpen(true)
  const closeSlipBuilder = () => setIsSlipBuilderOpen(false)

  return (
    <UIContext.Provider value={{ isSlipBuilderOpen, openSlipBuilder, closeSlipBuilder }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
