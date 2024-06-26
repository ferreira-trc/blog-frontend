export function Comment({id, authorUserName, commentContent}) {
    return (
        <>
            <li key={id}>
                <section>
                    <h6>{authorUserName}</h6>
                    <p>{commentContent}</p>
                </section>
            </li>
        </>
    );
}