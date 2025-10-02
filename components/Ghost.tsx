import React from 'react'
import Image from 'next/image'

export type GhostState = 'BACK' | 'TURNING' | 'FRONT'

interface GhostProps {
  ghostState: GhostState
}

const Ghost: React.FC<GhostProps> = ({ ghostState }) => {
  const getGhostImage = () => {
    switch (ghostState) {
      case 'BACK':
        return '/images/ghost/ghost-back.png' // 背中向きのおばけ
      case 'TURNING':
        return '/images/ghost/ghost-turning.png' // 振り返り中のおばけ
      case 'FRONT':
        return '/images/ghost/ghost-front.png' // 正面向きのおばけ
      default:
        return '/images/ghost/ghost-back.png'
    }
  }

  const getBorderColor = () => {
    switch (ghostState) {
      case 'BACK':
        return 'border-green-500' // スクロールOK
      case 'TURNING':
        return 'border-yellow-500' // 警告色
      case 'FRONT':
        return 'border-red-500' // ゲームオーバー
      default:
        return 'border-gray-500'
    }
  }

  const getStateText = () => {
    switch (ghostState) {
      case 'BACK':
        return 'スクロールOK'
      case 'TURNING':
        return '警告！'
      case 'FRONT':
        return 'ゲームオーバー！'
      default:
        return ''
    }
  }

  const getFallbackEmoji = () => {
    switch (ghostState) {
      case 'BACK':
        return '<div class="text-3xl">👻</div>'
      case 'TURNING':
        return '<div class="text-3xl">⚠️</div>'
      case 'FRONT':
        return '<div class="text-3xl">😈</div>'
      default:
        return '<div class="text-3xl">👻</div>'
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-center">
        {/* おばけの画像 */}
        <div className={`w-20 h-20 rounded-full bg-white shadow-lg border-4 ${getBorderColor()} flex items-center justify-center overflow-hidden`}>
          <Image
            src={getGhostImage()}
            alt={`おばけ - ${ghostState}`}
            width={64}
            height={64}
            className="object-contain"
            priority
            onError={(e) => {
              // 画像が存在しない場合のフォールバック
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = getFallbackEmoji()
            }}
          />
        </div>
        {/* 状態テキスト */}
        <div className="mt-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded text-center min-w-[80px]">
          {getStateText()}
        </div>
      </div>
    </div>
  )
}

export default Ghost
