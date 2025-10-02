import { useState, useEffect } from 'react'
import Head from 'next/head'
import Ghost, { GhostState } from '../components/Ghost'

export default function Home() {
  const [ghostState, setGhostState] = useState<GhostState>('BACK')
  const [gameOver, setGameOver] = useState(false)

  // 自動状態遷移
  useEffect(() => {
    const stateTransition = () => {
      switch (ghostState) {
        case 'BACK':
          // BACK → TURNING (3-7秒のランダムな時間)
          const backToTurningDelay = Math.random() * 4000 + 3000 // 3-7秒
          setTimeout(() => {
            setGhostState('TURNING')
          }, backToTurningDelay)
          break

        case 'TURNING':
          // TURNING → FRONT (0.7秒)
          setTimeout(() => {
            setGhostState('FRONT')
          }, 700)
          break

        case 'FRONT':
          // FRONT → BACK (1.5秒)
          setTimeout(() => {
            setGhostState('BACK')
            setGameOver(false) // ゲームオーバー状態をリセット
          }, 1500)
          break
      }
    }

    stateTransition()
  }, [ghostState])

  // スクロール監視
  useEffect(() => {
    const handleScroll = () => {
      // TURNING または FRONT の時にスクロールされたらゲームオーバー
      if ((ghostState === 'TURNING' || ghostState === 'FRONT') && !gameOver) {
        setGameOver(true)
        // ページ最上部に強制スクロール
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ghostState, gameOver])

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
              <p>おばけが背中向きの時だけスクロールできます</p>
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <p className="text-sm">
                  🟢 緑 = スクロールOK<br/>
                  🟡 黄 = 警告（スクロール禁止）<br/>
                  🔴 赤 = ゲームオーバー（スクロール禁止）
                </p>
              </div>
              <p className="text-sm opacity-75">
                右下のおばけアイコンを確認してください
              </p>
            </div>
          </div>
        </div>

        {/* ダミーコンテンツ */}
        {renderDummyContent()}

        {/* ゲームオーバー表示 */}
        {gameOver && (
          <div className="fixed inset-0 bg-red-500 bg-opacity-90 flex items-center justify-center z-40">
            <div className="text-white text-center">
              <h2 className="text-6xl font-bold mb-4">😈 ゲームオーバー！</h2>
              <p className="text-2xl">おばけに見つかりました！</p>
              <p className="text-lg mt-4 opacity-75">
                ページ上部に戻りました
              </p>
            </div>
          </div>
        )}

        {/* Ghost コンポーネント */}
        <Ghost ghostState={ghostState} />
      </main>
    </>
  )
}
