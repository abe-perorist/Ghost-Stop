import React from 'react'
import Image from 'next/image'

export type GhostState = 'BACK' | 'TURNING_START' | 'TURNING_MID' | 'TURNING_END' | 'FRONT'

interface GhostProps {
  ghostState: GhostState
}

const Ghost: React.FC<GhostProps> = ({ ghostState }) => {
  const getGhostImage = () => {
    switch (ghostState) {
      case 'BACK':
        return '/images/ghost/ghost-back.png' // 背中向きのおばけ
      case 'TURNING_START':
        return '/images/ghost/ghost-turning-start.png' // 振り返り開始
      case 'TURNING_MID':
        return '/images/ghost/ghost-turning-mid.png' // 振り返り中間
      case 'TURNING_END':
        return '/images/ghost/ghost-turning-end.png' // 振り返り終了
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
      case 'TURNING_START':
        return 'border-yellow-400' // 警告開始
      case 'TURNING_MID':
        return 'border-yellow-500' // 警告中間
      case 'TURNING_END':
        return 'border-orange-500' // 警告終了
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
      case 'TURNING_START':
        return '注意！'
      case 'TURNING_MID':
        return '警告！'
      case 'TURNING_END':
        return '危険！'
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
      case 'TURNING_START':
        return '<div class="text-3xl">😐</div>'
      case 'TURNING_MID':
        return '<div class="text-3xl">⚠️</div>'
      case 'TURNING_END':
        return '<div class="text-3xl">😠</div>'
      case 'FRONT':
        return '<div class="text-3xl">😈</div>'
      default:
        return '<div class="text-3xl">👻</div>'
    }
  }

  const getAnimationClass = () => {
    switch (ghostState) {
      case 'BACK':
        return 'animate-ghost-float' // カスタム浮遊アニメーション
      case 'TURNING_START':
        return 'animate-pulse' // 軽いパルス
      case 'TURNING_MID':
        return 'animate-ghost-warning' // カスタム警告アニメーション
      case 'TURNING_END':
        return 'animate-bounce' // 激しいバウンス
      case 'FRONT':
        return 'animate-ghost-angry' // カスタム怒りアニメーション
      default:
        return 'animate-ghost-float'
    }
  }

  const getContainerAnimation = () => {
    switch (ghostState) {
      case 'BACK':
        return '' // コンテナは静止、画像のみアニメーション
      case 'TURNING_START':
        return '' // まだ静か
      case 'TURNING_MID':
        return 'animate-pulse' // 警告時のコンテナパルス
      case 'TURNING_END':
        return 'animate-bounce' // 危険時の激しい動き
      case 'FRONT':
        return 'animate-ping' // ゲームオーバー時の爆発的効果
      default:
        return ''
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-center">
        {/* おばけの画像 */}
        <div className={`w-20 h-20 rounded-full bg-white shadow-lg border-4 ${getBorderColor()} flex items-center justify-center overflow-hidden transition-all duration-300 ${getContainerAnimation()}`}>
          <Image
            src={getGhostImage()}
            alt={`おばけ - ${ghostState}`}
            width={64}
            height={64}
            className={`object-contain transition-all duration-300 ${getAnimationClass()}`}
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
        <div className={`mt-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded text-center min-w-[80px] transition-all duration-300 ${ghostState.includes('TURNING') ? 'animate-pulse' : ''} ${ghostState === 'FRONT' ? 'animate-bounce' : ''}`}>
          {getStateText()}
        </div>
      </div>
    </div>
  )
}

export default Ghost
