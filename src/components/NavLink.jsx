export function Navlink({url, name, clas}) {
    return (
        <>
          <li className={clas}><a href={url}>{name}</a></li>  
        </>
    )
}