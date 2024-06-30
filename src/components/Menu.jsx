import { Navlink } from "./NavLink"

export function Menu({navClassName, ulClassName, className, links}) {

    
    return (
        <>
            <nav className={navClassName}>
                <ul className={ulClassName}>
                    {links.map((link) => (
                        <Navlink url={link.url} name={link.name} className={className}/>
                        ))
                    }                                       
                </ul>
            </nav>
        </>
    )
}