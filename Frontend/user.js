//1. load user ทั้งหมด จาก api http://localhost:8000/users
//2. นำ user ทั้งหมดในหน้าเว็บ ใน html
const BASE_URL = 'http://localhost:8000';
window.onload = async () => {
    await loadUsers();
}
const loadUsers = async () => {

    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);

    const userDOM = document.getElementById('users');

    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<div>
        ${user.id} ${user.firstname} ${user.lastname} ${user.gender}
        <a href = "index.html?id=${user.id}"><button>edit</button></a>
        <button class="delete-btn" data-id="${user.id}">delete</button>
        </div>`;
    }
    htmlData += '</div>'
    userDOM.innerHTML = htmlData;

    const deleteDOMs = document.querySelectorAll('.delete-btn');
    for (let i = 0 ; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${BASE_URL}/users/${id}`);
                await loadUsers();
            } catch (error) {
                console.log('error delete user', error);
            }
        })
    }
}