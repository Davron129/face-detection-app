function getCookieValue(cookieName) {
    // Split the document.cookie string into individual cookies
    const cookies = document.cookie.split('; ');

    // Loop through each cookie to find the one with the specified name
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];

        // Split the cookie into name and value
        const [name, value] = cookie.split('=');

        // Trim any leading or trailing spaces
        const trimmedName = name.trim();

        // If the cookie name matches, return its value
        if (trimmedName === cookieName) {
            return decodeURIComponent(value);
        }
    }

    // If the cookie with the specified name is not found, return null
    return null;
}


const addCurrentClass = () => {
    const pathname = window.location.pathname;

    const section = document.querySelector(`a[href='${pathname}']`);
    if(section) {
        section.classList.add("current")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    addCurrentClass()
})

const buttons = document.querySelectorAll('button[id]');

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const token = getCookieValue("accessToken");

        if(token) {
            fetch(`/api/files/${e.currentTarget.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        }
    })
})

