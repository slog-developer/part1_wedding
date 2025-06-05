import classnames from 'classnames/bind'
import styles from './Contact.module.scss'
import Section from '@shared/Section'
import Accordion from '@shared/Accordion'
import { Person, Wedding } from '@models/wedding'

const cx = classnames.bind(styles)

function Contact({
  groom,
  bride,
}: {
  groom: Wedding['groom']
  bride: Wedding['bride']
}) {
  return (
    <Section title="연락처 및 마음전하실곳">
      <Accordion label="신랑측">
        <ContactInfo
          name={groom.name}
          account={groom.account}
          phoneNumber={groom.phoneNumber}
        ></ContactInfo>
        <ContactInfo
          name={groom.parents[0].name}
          account={groom.parents[0].account}
          phoneNumber={groom.parents[0].phoneNumber}
        ></ContactInfo>
        <ContactInfo
          name={groom.parents[1].name}
          account={groom.parents[1].account}
          phoneNumber={groom.parents[1].phoneNumber}
        ></ContactInfo>
      </Accordion>
      <Accordion label="신부측">
        <ContactInfo
          name={bride.name}
          account={bride.account}
          phoneNumber={bride.phoneNumber}
        ></ContactInfo>
        <ContactInfo
          name={bride.parents[0].name}
          account={bride.parents[0].account}
          phoneNumber={bride.parents[0].phoneNumber}
        ></ContactInfo>
        <ContactInfo
          name={bride.parents[1].name}
          account={bride.parents[1].account}
          phoneNumber={bride.parents[1].phoneNumber}
        ></ContactInfo>
      </Accordion>
    </Section>
  )
}

function ContactInfo({ name, account, phoneNumber }: Person) {
  return (
    <div className={cx('wrap-contact')}>
      <div className={cx('wrap-contact-info')}>
        <span>
          {account
            ? `${account.bankName} | ${account.accountNumber}`
            : 'Account information not available'}
        </span>
        <span>{name}</span>
      </div>
      <ul className={cx('wrap-buttons')}>
        <li>
          <a href={`tel: ${phoneNumber}`} className={cx('button')}>
            전화
          </a>
        </li>
        <li>
          <button
            className={cx('button')}
            onClick={() => {
              if (account?.accountNumber) {
                navigator.clipboard
                  .writeText(`${account.bankName} ${account.accountNumber}`)
                  .then(() => {
                    alert('계좌 정보가 복사되었습니다.')
                  })
                  .catch(() => {
                    alert('복사에 실패했습니다.')
                  })
              } else {
                alert('계좌 정보가 없습니다.')
              }
            }}
          >
            복사
          </button>
        </li>
        {account?.kakaopayLink != null ? (
          <li>
            <a
              href={account.kakaopayLink}
              className={cx('button')}
              target="_blank"
              rel="noreferrer"
            >
              송금
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  )
}
//qr.kakaopay.com/Ej83N2UDd
export default Contact
