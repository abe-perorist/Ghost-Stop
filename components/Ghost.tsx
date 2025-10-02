import React from 'react'

export type GhostState = 'BACK' | 'TURNING' | 'FRONT'

interface GhostProps {
  ghostState: GhostState
}

const Ghost: React.FC<GhostProps> = ({ ghostState }) => {
  const getBackgroundColor = () => {
    switch (ghostState) {
      case 'BACK':
        return 'bg-green-500' // スクロールOK
      case 'TURNING':
        return 'bg-yellow-500' // 警告色
      case 'FRONT':
        return 'bg-red-500' // ゲームオーバー
      default:
        return 'bg-gray-500'
    }
  }

  const getStateText = () => {
    switch (ghostState) {
      case 'BACK':
        return '👻' // おばけの絵文字
      case 'TURNING':
        return '⚠️' // 警告
      case 'FRONT':
        return '😈' // 怒ったおばけ
      default:
        return '👻'
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        className={`w-16 h-16 rounded-full ${getBackgroundColor()} flex items-center justify-center text-2xl shadow-lg border-2 border-white`}
      >
        {getStateText()}
      </div>
    </div>
  )
}

export default Ghost
