import React, { createContext, useContext, useState } from 'react'

import type { Slip } from '../data/mockSlips'

interface UIContextType {
  isSlipBuilderOpen: boolean
  openSlipBuilder: () => void
  closeSlipBuilder: () => void
  isSlipDetailOpen: boolean
  selectedSlip: Slip | null
  openSlipDetail: (slip: Slip) => void
  closeSlipDetail: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isSlipBuilderOpen, setIsSlipBuilderOpen] = useState(false)
  const [isSlipDetailOpen, setIsSlipDetailOpen] = useState(false)
  const [selectedSlip, setSelectedSlip] = useState<Slip | null>(null)

  const openSlipBuilder = () => setIsSlipBuilderOpen(true)
  const closeSlipBuilder = () => setIsSlipBuilderOpen(false)
  
  const openSlipDetail = (slip: Slip) => {
    setSelectedSlip(slip)
    setIsSlipDetailOpen(true)
  }
  
  const closeSlipDetail = () => {
    setIsSlipDetailOpen(false)
    setTimeout(() => setSelectedSlip(null), 300) // Delay to match transition
  }

  return (
    <UIContext.Provider value={{ 
      isSlipBuilderOpen, openSlipBuilder, closeSlipBuilder,
      isSlipDetailOpen, selectedSlip, openSlipDetail, closeSlipDetail
    }}>
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
