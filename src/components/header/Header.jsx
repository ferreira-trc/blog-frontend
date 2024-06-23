import { useState } from "react";
import { Hamburguer } from "./Hamburguer";
import { Profile } from "./Profile";
import { Menu } from "../Menu";
import { ProfileMenu } from "./ProfileMenu";


export function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuProfileOpen, setIsMenuProfileOpen] = useState(false);

    const onMenuToogle = () => {
        setIsMenuOpen((isMenuOpen) => !isMenuOpen)
        setIsMenuProfileOpen(false)
        console.log(isMenuOpen)
    }

    const onMenuProfileToogle = () => {
        setIsMenuProfileOpen((isMenuProfileOpen) => !isMenuProfileOpen)
        setIsMenuOpen(false)
        console.log(isMenuProfileOpen);
    }

    return (
    <>
        <header className="mainHeader">
           <Hamburguer onClick={onMenuToogle}/>
           <Profile onClick={onMenuProfileToogle}/>          
        </header>

        {isMenuOpen && <Menu navClass={"ham-menu"} ulClass={"ulClass"} clas={"ham-li"}/>}
        {isMenuProfileOpen && <ProfileMenu ClassNameNav={"profile-menu"} classNameUl={"profile-ulClass"} clas={"ham-li"}/>}
    </>
    );
}