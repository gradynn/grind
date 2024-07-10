import { useContext, useState } from 'react';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

import logo from '@src/assets/grind-logo-light.svg';
import Button from '@src/components/button';
import { UserContext } from '@src/context/UserContext';

interface OverlayMenuProps {
    show: boolean;
    onClose: () => void;
    signedIn: boolean;
    handleSignOut: () => void;
}

const OverlayMenu = ({ show, onClose, signedIn, handleSignOut }: OverlayMenuProps) => {
    return (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-background-2 z-50 transform transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className='flex items-center justify-center h-full'>
                <RxCross1 className='fixed top-1 right-1 text-text text-5xl cursor-pointer' onClick={onClose}/>
                {!signedIn && <div className='flex flex-row items-center'>
                    <Button text='Sign In' onClick={() => {
                        window.location.href = '/sign-in';
                    }} type='invisible'/>
                    <Button text='Register' onClick={() => {
                        window.location.href = '/register';
                    }} type='primary'/>
                </div>}
                {signedIn && <div className='flex flex-row items-center'>
                    <Button text='Sign Out' onClick={() => {
                        handleSignOut();
                    }} type='primary'/> 
                </div>}
            </div>
        </div>
      );
};

interface NavBarProps {
    logoOnly?: boolean;
}

const NavBar = ({ logoOnly }: NavBarProps) => {
    const { userData, setUserData } = useContext(UserContext);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUserData(null);
    }

    return <div className='flex items-center justify-between bg-background-2 w-full h-[60px] px-1'>
        <img src={logo} alt='Grind Logo' className="h-full cursor-pointer" style={{ shapeRendering: 'crispEdges' }} onClick={() => {
            window.location.href = '/home';
        }}/>
        {!logoOnly && !userData && <div className='flex flex-row items-center'>
            <div className="hidden lg:block">
                <Button text='Sign In' onClick={() => {
                    window.location.href = '/sign-in';
                
                }} type='invisible'/>
            </div>
            <Button text='Register' type='primary' onClick={() => {
                window.location.href = '/register';
            }}/>
            <div className="lg:hidden" onClick={
                () => setShowMobileMenu(!showMobileMenu)
            }>
                <RxHamburgerMenu className='text-text text-5xl'/>
            </div>
        </div>}
        {!logoOnly && userData && <div className='flex flex-row items-center px-1'>
            <p className='text-text font-bold text-xl lg:text-base pr-2'>
                Hello, {userData.firstName}
            </p>
            <div className='hidden lg:block'>
                <Button text='Sign Out' type='primary' onClick={handleSignOut}/>
            </div>
            <div className="lg:hidden" onClick={
                () => setShowMobileMenu(!showMobileMenu)
            }>
                <RxHamburgerMenu className='text-text text-5xl'/>
            </div>
        </div>}
        {showMobileMenu && <OverlayMenu show={showMobileMenu} onClose={() => setShowMobileMenu(!showMobileMenu)} signedIn={Boolean(userData)} handleSignOut={handleSignOut}/>}
    </div>
}

export default NavBar;