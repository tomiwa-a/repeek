import React, { createContext, useContext, useState } from 'react'
import type { Slip, Game, SlipLeg } from '../types/slips'

export interface ShareData {
  title: string
  url: string
  text?: string
}

interface UIContextType {
  isSlipBuilderOpen: boolean
  openSlipBuilder: () => void
  closeSlipBuilder: () => void
  isSlipDetailOpen: boolean
  selectedSlip: Slip | null
  openSlipDetail: (slip: Slip) => void
  closeSlipDetail: () => void
  builderLegs: SlipLeg[]
  builderTitle: string
  setBuilderTitle: (title: string) => void
  builderAnalysis: string
  setBuilderAnalysis: (analysis: string) => void
  addLegToBuilder: (game: Game) => void
  removeLegFromBuilder: (gameId: string) => void
  updateLegInBuilder: (gameId: string, updates: Partial<SlipLeg>) => void
  clearBuilder: () => void
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isShareModalOpen: boolean
  shareData: ShareData | null
  openShareModal: (data: ShareData) => void
  closeShareModal: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isSlipBuilderOpen, setIsSlipBuilderOpen] = useState(false)
  const [isSlipDetailOpen, setIsSlipDetailOpen] = useState(false)
  const [selectedSlip, setSelectedSlip] = useState<Slip | null>(null)
  const [builderLegs, setBuilderLegs] = useState<SlipLeg[]>([])
  const [builderTitle, setBuilderTitle] = useState('NEW_STRATEGY_DOCKET')
  const [builderAnalysis, setBuilderAnalysis] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareData, setShareData] = useState<ShareData | null>(null)

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

  const openShareModal = (data: ShareData) => {
    setShareData(data)
    setIsShareModalOpen(true)
  }

  const closeShareModal = () => {
    setIsShareModalOpen(false)
    setTimeout(() => setShareData(null), 300)
  }

  const addLegToBuilder = (game: Game) => {
    if (!builderLegs.find(l => l.game.id === game.id)) {
      setBuilderLegs(prev => [...prev, { game, pick: 'home', analysis: '' }])
    }
  }

  const removeLegFromBuilder = (gameId: string) => {
    setBuilderLegs(prev => prev.filter(l => l.game.id !== gameId))
  }

  const updateLegInBuilder = (gameId: string, updates: Partial<SlipLeg>) => {
    setBuilderLegs(prev => prev.map(l => l.game.id === gameId ? { ...l, ...updates } : l))
  }

  const clearBuilder = () => {
    setBuilderLegs([])
    setBuilderTitle('NEW_STRATEGY_DOCKET')
    setBuilderAnalysis('')
  }

  return (
    <UIContext.Provider value={{ 
      isSlipBuilderOpen, openSlipBuilder, closeSlipBuilder,
      isSlipDetailOpen, selectedSlip, openSlipDetail, closeSlipDetail,
      builderLegs, addLegToBuilder, removeLegFromBuilder, updateLegInBuilder, clearBuilder,
      builderTitle, setBuilderTitle, builderAnalysis, setBuilderAnalysis,
      isSidebarOpen, setIsSidebarOpen,
      isShareModalOpen, shareData, openShareModal, closeShareModal
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
