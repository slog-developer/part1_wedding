import classNames from 'classnames/bind'

import styles from './App.module.scss'

import Heading from '@components/sections/Heading'
import Video from '@components/sections/Video'
import Intro from '@components/sections/Intro'
import Invitation from '@components/sections/Invitation'
import ImageGallery from '@components/sections/ImageGallery'
import Calendar from '@components/sections/Calendar'
import Map from '@components/sections/Map'
import Contact from '@components/sections/Contact'
import Share from '@components/sections/Share'
import AttendCountModal from './components/AttendCountModal'
import useWedding from './hooks/useWedding'

const cx = classNames.bind(styles)

function App() {
  const { wedding, isLoading, error } = useWedding()

  if (wedding == null) {
    return null
  }

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        date={date}
        locationName={location.name}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />

      <AttendCountModal wedding={wedding} />
    </div>
  )
}

export default App
