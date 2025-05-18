export const createNewVisitor = async (userInfoForm) => {
    return await fetch("http://localhost:8088/visitors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfoForm)
    })
}
