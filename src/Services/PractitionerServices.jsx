export const getAllPractitioners = async () => {
    return await fetch("http://localhost:8088/practitioners").then((res) => res.json())
}