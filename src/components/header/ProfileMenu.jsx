import { Navlink } from '../NavLink';
import links from '../../data/profile-links.json'

export function ProfileMenu({ClassNameNav, classNameUl, clas}) {
    
    return (
        <>
            <nav className={ClassNameNav}>
                <ul className={classNameUl}>
                    {links.map((link) => (
                        <Navlink url={link.url} name={link.name} clas={clas}/>
                        ))
                    }

                </ul>
            </nav>
        </>
    );
}