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

