export function PersonProfileBox({className, personName, personEmail, personBirthDay}) {
    return(
        <>
            <div className={className}>
            <h2>Personal Data</h2>
                <div>
                    <strong>Name:</strong> {personName}
                </div>
                <div>
                    <strong>Email:</strong> {personEmail}
                </div>
                <div>
                    <strong>Birthday:</strong> {personBirthDay}
                </div>
        </div>
        </>
    );
}