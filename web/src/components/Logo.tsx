import logo from '@/assets/logo.svg'
import logoIcon from '@/assets/logo-icon.svg'

export const Logo = () => {
  return <img src={logo} alt="Brev.ly logo" className="w-24 h-auto" />
}

export const LogoIcon = () => {
  return (
    <img src={logoIcon} alt="Brev.ly infinite symbol" className="w-12 h-12" />
  )
}
