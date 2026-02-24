export interface Notification {
  id: string
  type: 'system' | 'activity' | 'result'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  link?: string
}

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'result',
    title: 'SLIP_RESULT_DECODED',
    message: 'YOUR_TRIPLE_LEG_SLIP_IN_PREMIER_LEAGUE_HAS_WON. +450_POINTS_CREDITED.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false,
    link: '/profile'
  },
  {
    id: 'n2',
    type: 'activity',
    title: 'NEW_CONNECTION_ESTABLISHED',
    message: '@CleanSheetCaller IS_NOW_FOLLOWING_YOUR_PREDICTIONS.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    link: '/predictors'
  },
  {
    id: 'n3',
    type: 'system',
    title: 'PROTOCOL_UPDATE_v2.1.2',
    message: 'SYSTEM_UPGRADE_COMPLETE. HIGH_DENSITY_LISTS_NOW_ACTIVE.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isRead: true
  },
  {
    id: 'n4',
    type: 'result',
    title: 'SLIP_TERMINATED',
    message: 'YOUR_JUVENTUS_VS_INTER_SLIP_LOST_DUE_TO_ONE_LEG.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    link: '/profile'
  }
]
