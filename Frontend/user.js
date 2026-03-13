//1. load user ทั้งหมด จาก api http://localhost:8000/users
//2. นำ user ทั้งหมดในหน้าเว็บ ใน html
const BASE_URL = 'http://localhost:8000';
window.onload = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);

    const userDOM = document.getElementById('users');

    let htmlData = '<div>'

    htmlData += '</div>'
    userDOM.innerHTML = htmlData;
}