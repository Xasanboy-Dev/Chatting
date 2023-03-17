export default function Profile({ darkMode }: { darkMode: Boolean }) {
    const userID = localStorage.getItem("userID")
    if (userID) {
    } else {
        window.location.href = '/login'
        return <div></div>
    }
    return (
        <div>This is a your profile</div>
    )
}