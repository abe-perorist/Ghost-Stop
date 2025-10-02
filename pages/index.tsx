import { useState, useEffect } from 'react'
import Head from 'next/head'
import Ghost, { GhostState } from '../components/Ghost'

export default function Home() {
  const [ghostState, setGhostState] = useState<GhostState>('BACK')
  const [gameOver, setGameOver] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [showGameOverModal, setShowGameOverModal] = useState(false)

  // 自動状態遷移
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const stateTransition = () => {
      switch (ghostState) {
        case 'BACK':
          // BACK → TURNING_START (3-7秒のランダムな時間)
          const backToTurningDelay = Math.random() * 4000 + 3000 // 3-7秒
          timeoutId = setTimeout(() => {
            setGhostState('TURNING_START')
          }, backToTurningDelay)
          break

        case 'TURNING_START':
          // TURNING_START → TURNING_MID (0.2秒)
          timeoutId = setTimeout(() => {
            setGhostState('TURNING_MID')
          }, 200)
          break

        case 'TURNING_MID':
          // TURNING_MID → TURNING_END (0.2秒)
          timeoutId = setTimeout(() => {
            setGhostState('TURNING_END')
          }, 200)
          break

        case 'TURNING_END':
          // TURNING_END → FRONT (0.4秒)
          timeoutId = setTimeout(() => {
            setGhostState('FRONT')
          }, 400)
          break

        case 'FRONT':
          // 画面フラッシュ効果
          setShowFlash(true)
          setTimeout(() => {
            setShowFlash(false)
          }, 100)
          
          // ゲームオーバーモーダル表示
          setShowGameOverModal(true)
          
          // FRONT → BACK (1.5秒)
          timeoutId = setTimeout(() => {
            setGhostState('BACK')
            setGameOver(false) // ゲームオーバー状態をリセット
            setShowGameOverModal(false) // ゲームオーバーモーダルを非表示
          }, 1500)
          break
      }
    }

    stateTransition()

    // クリーンアップ関数
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [ghostState])

  // スクロール監視
  useEffect(() => {
    const handleScroll = (event: Event) => {
      // TURNING系の状態または FRONT の時にスクロールされたらゲームオーバー
      if ((ghostState.includes('TURNING') || ghostState === 'FRONT') && !gameOver) {
        // ゲームオーバー時のスクロール停止
        event.preventDefault()
        setGameOver(true)
        
        // 画面フラッシュ効果
        setShowFlash(true)
        setTimeout(() => {
          setShowFlash(false)
        }, 100)
        
        // ゲームオーバーモーダル表示
        setShowGameOverModal(true)
        
        // ページ最上部に強制スクロール
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: false })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ghostState, gameOver])

  // 再挑戦ハンドラー
  const handleRestart = () => {
    window.scrollTo({ top: 0 })
    setShowGameOverModal(false)
  }

  // ダミーコンテンツの生成
  const renderDummyContent = () => {
    return Array.from({ length: 10 }, (_, index) => (
      <div key={index} className="h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-4">セクション {index + 1}</h2>
          <p className="text-xl">スクロールして進んでください！</p>
          <div className="mt-8">
            <p className="text-sm opacity-75">
              おばけが背中向きの時だけスクロールできます
            </p>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <>
      <Head>
        <title>だるまさんがころんだ - おばけ版</title>
        <meta name="description" content="おばけの背中向きの時だけスクロールできるゲーム" />
      </Head>

      <main className="min-h-screen">
        {/* ゲーム説明 */}
        <div className="h-screen bg-gradient-to-b from-pink-400 to-red-500 flex items-center justify-center">
          <div className="text-white text-center max-w-md mx-4">
            <h1 className="text-5xl font-bold mb-6">👻 だるまさんがころんだ</h1>
            <div className="text-lg space-y-4">
              <h2 className="text-2xl font-bold mb-4">【ルール】 おばけが振り向いたら、即ストップ！</h2>
              <p className="text-xl">おばけが背中を向けている間だけ、そーっとスクロールしてね。</p>
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <p className="text-sm">
                  🟢 緑の光 = GO! スクロールOK！<br/>
                  🟡 黄の光 = STOP! 止まれ！<br/>
                  🔴 赤の光 = 👀 見たな！
                </p>
              </div>
              <p className="text-lg font-bold">
                失敗したら、最初からやり直し！
              </p>
            </div>
          </div>
        </div>

        {/* ダミーコンテンツ */}
        {renderDummyContent()}

        {/* 画面フラッシュ効果 */}
        {showFlash && (
          <div className="fixed inset-0 animate-flash-red z-50 pointer-events-none" />
        )}

        {/* ゲームオーバーモーダル */}
        {showGameOverModal && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
            <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold mb-2">GAME OVER!</h2>
              <p className="text-lg mb-4">振り向いたのに動いたでしょ？</p>
              <button
                onClick={handleRestart}
                className="bg-white text-red-600 px-4 py-2 rounded font-bold hover:bg-gray-100 transition-colors"
              >
                もう一度、最初から挑戦！
              </button>
            </div>
          </div>
        )}

        {/* Ghost コンポーネント */}
        <Ghost ghostState={ghostState} />
      </main>
    </>
  )
}
