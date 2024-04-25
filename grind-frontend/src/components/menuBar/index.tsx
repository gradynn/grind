import logo from '@src/assets/grind-logo-light.svg';
import Button from '@src/components/button';

interface MenuBarProps {
    logoOnly?: boolean;
}

const MenuBar = ({ logoOnly }: MenuBarProps) => {
    return <div className='flex items-center justify-between bg-background-2 w-full h-[60px] px-1'>
        <img src={logo} alt='Grind Logo' className="h-full cursor-pointer" onClick={() => {
            window.location.href = '/home';
        }}/>
        {!logoOnly && <div className='hidden lg:block'>
            <Button text='Sign In' onClick={() => console.log('Login')} type='invisible'/>
            <Button text='Register' type='primary' onClick={() => {
                window.location.href = '/register';
            }}/>
        </div>}
    </div>
}

export default MenuBar;