const validateDate =  (userData) => {
    let error=[];
    if (!userData.firstName) {
        error.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastName) {
        error.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        error.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        error.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        error.push('กรุณาเลือกงานอดิเรก');
    }
    if (!userData.description) {
        error.push('กรุณากรอกคำอธิบาย');
    }
    return error;   

}
const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {};
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {};
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message');
    try {
    let interest = ''
    for (let i = 0; i < interestDOMs.length; i++) {
        interest += interestDOMs[i].value 
        if (i != interestDOMs.length - 1) {
            interest += ','
        }
    }

    let userData ={
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interests: interest
    }
    console.log('submitData', userData);

//    const errors = validateDate(userData);
//    if (errors.length > 0) {
//        throw {
//            message: 'กรอกข้อมูลไม่ครบถ้วน',
//            errors: errors
//        }
//    }
        const response = axios.post('http://localhost:8000/users', userData);
        console.log('response', response);
        messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error message', error.message);
        console.log('error', error.errors);
        let htmlData = '<div>'
        htmlData += `<div> ${error.message} </div>`;
        htmlData += '<ul>';
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li> ${error.errors[i]} </li>`;
        }
        if (error.response) {
        console.error('Error response:', error.response);
        error.errors = error.response.data.errors
        }
        htmlData += '</ul>';
        htmlData += '</div>';
        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
        
    }
}