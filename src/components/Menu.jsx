import { Navlink } from "./NavLink"
import links from "../data/hamburguerAdmin.json"

export function Menu({navClass, ulClass, clas}) {

    
    return (
        <>
            <nav className={navClass}>
                <ul className={ulClass}>
                    {links.map((link) => (
                        <Navlink url={link.url} name={link.name} clas={clas}/>
                        ))
                    }                                       
                </ul>
            </nav>
        </>
    )
}