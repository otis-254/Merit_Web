declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

type ReactIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: string | number }>

declare module 'react-icons/fa' {
  export const FaFacebook: ReactIconComponent
  export const FaInstagram: ReactIconComponent
  export const FaLinkedin: ReactIconComponent
  export const FaTiktok: ReactIconComponent
  export const FaWhatsapp: ReactIconComponent
  export const FaCheckCircle: ReactIconComponent
  export const FaTimes: ReactIconComponent
  export const FaFileAlt: ReactIconComponent
  export const FaUsers: ReactIconComponent
  export const FaLightbulb: ReactIconComponent
  export const FaPalette: ReactIconComponent
  export const FaRegLightbulb: ReactIconComponent
  export const FaTwitter: ReactIconComponent
}

declare module 'react-icons/md' {
  export const MdEmail: ReactIconComponent
  export const MdPhone: ReactIconComponent
  export const MdLocationOn: ReactIconComponent
}

declare module 'react-icons/bs' {
  export const BsArrowRight: ReactIconComponent
}
