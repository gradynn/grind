import { useContext } from 'react';

import logo from '@src/assets/grind-logo-light.svg';
import Button from '@src/components/button';
import { UserContext } from '@src/context/UserContext';

interface MenuBarProps {
    logoOnly?: boolean;
}

const MenuBar = ({ logoOnly }: MenuBarProps) => {
    const { userData, setUserData } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUserData(null);
    }

    return <div className='flex items-center justify-between bg-background-2 w-full h-[60px] px-1'>
        <img src={logo} alt='Grind Logo' className="h-full cursor-pointer" style={{ shapeRendering: 'crispEdges' }} onClick={() => {
            window.location.href = '/home';
        }}/>
        {!logoOnly && !userData && <div className='hidden lg:block'>
            <Button text='Sign In' onClick={() => {
                window.location.href = '/sign-in';
            
            }} type='invisible'/>
            <Button text='Register' type='primary' onClick={() => {
                window.location.href = '/register';
            }}/>
        </div>}
        {!logoOnly && userData && <div className='flex flex-row items-center px-1'>
            <p className='text-text font-bold pr-2'>
                Hello, {userData.firstName}
            </p>
            <Button text='Sign Out' type='primary' onClick={handleSignOut}/> 
        </div>}
    </div>
}

export default MenuBar;