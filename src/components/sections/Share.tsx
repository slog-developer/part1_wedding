import classnames from 'classnames/bind'
import styles from './Share.module.scss'
import Section from '@shared/Section'
import { useEffect } from 'react'
import { parseISO, format } from 'date-fns'
import { ko } from 'date-fns/locale'

const cx = classnames.bind(styles)

declare global {
  interface Window {
    Kakao: any
  }
}
interface ShareProps {
  groomName: string
  brideName: string
  date: string
}
function Share({ groomName, brideName, date }: ShareProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js'
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY)
      }
    }
  }, [])

  const handleShareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${groomName} ❤️ ${brideName} 우리 결혼해요!`,
        description: `${format(parseISO(date), 'M월 d일 eeee aaa h시', { locale: ko })}`,
        imageUrl:
          'https://marketplace.canva.com/EAFzEswjL8o/2/0/1600w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%97%90%EC%8A%A4%ED%85%8C%ED%8B%B1-%EC%8B%A0%EB%9E%91%EC%8B%A0%EB%B6%80-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EA%B2%B0%ED%98%BC-%EC%B4%88%EB%8C%80-instagram-%EA%B2%8C%EC%8B%9C%EB%AC%BC-PPvjRCR4frA.jpg',
        link: {
          mobileWebUrl: window.location.origin,
          webUrl: window.location.origin,
        },
      },
      buttons: [
        {
          title: '청첩장 보러가기',
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin,
          },
        },
      ],
    })
  }
  return (
    <Section title="공유하기">
      <div className={cx('wrap-share')}>
        <button onClick={handleShareKakao}>카카오톡</button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            alert('링크가 복사되었습니다.')
          }}
        >
          링크복사
        </button>
      </div>
    </Section>
  )
}

export default Share
