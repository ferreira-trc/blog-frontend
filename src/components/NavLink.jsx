export function Navlink({url, name, className}) {
    return (
        <>
          <li className={className}><a href={url}>{name}</a></li>  
        </>
    )
}