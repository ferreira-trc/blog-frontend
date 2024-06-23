
export function Hamburguer({onClick}) {
    return (
        <>
            <button className="hamburguer" onClick={onClick}>
                <span class="material-symbols-outlined">menu</span>
            </button>
            
        </>
    );
}