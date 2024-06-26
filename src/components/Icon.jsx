export function Icon ({name, color, size}) {

    return(
        <>
            <span className="material-symbols-outlined" style={{color: color, fontSize: size}}>{name}</span>
        </>
    )
} 