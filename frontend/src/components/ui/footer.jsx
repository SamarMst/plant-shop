import Logo from "../logo";

const Footer = () => {
    return ( <footer className="flex flex-row justify-between items-center px-6 py-4  border-t-2 shadow-md">
        <Logo />
        <p>Copyright {new Date().getFullYear()}</p>
        <p>samar.mestiri.info@gmail.com</p>
      </footer> );
}
 
export default Footer;