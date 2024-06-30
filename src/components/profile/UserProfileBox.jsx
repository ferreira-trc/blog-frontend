export function UserProfileBox({className, userName, role}) {
    return (
        <>
            <div className={className}>
            <h2>User Profile</h2>
            <div>
                <strong>User Name:</strong> {userName}
            </div>
            <div>
                <strong>Role:</strong> {role}
            </div>
            
        </div>
        </>
    );
}