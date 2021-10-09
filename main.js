const url = 'http://3.6.93.159:7883/machstatz'

const userList = document.querySelector('.users');

const form = document.getElementById('userAddForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');





let output = ''
// let dataArr = []


const fetchResponse = (data) => {
    // dataArr = [...dataArr,...data]
    // console.log(dataArr)
    let dataArr = []
    dataArr.push(...data);
    console.log(dataArr)
    dataArr.forEach((item) => {
        output += `
        <div class="col-sm-12 col-md-6 col-lg-3 users">
            <div class="card p-3">
                <div class="action__buttons">
                    <button class="edit">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="delete__button" data-email=${item.email}>
                        <i  id="delete" class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="user__info">
                    <div class="user__icon">
                        <span>${item.fist_name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div class="user__name">
                        ${item.fist_name} ${item.last_name}
                    </div>
                </div>
            </div>
        </div>
        `;
        
    })
    
    userList.innerHTML = output;
    let userIcon = userList.querySelectorAll('.user__icon')
    userIcon.forEach((icon) => {
        icon.style.background =  "#" + Math.floor(Math.random()*16777215).toString(16);
    }) 
}

// Get users
fetch(`${url}/get_all_users`)
  .then(response => response.json())
  .then(data => fetchResponse(data));


// Add users


const addNewUser = async (userDetails) => {

    const response = await fetch(`${url}/add_new_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    });
    const data = await response.json();
    if(data.status == 'Success') {
        const userArr = [];
        userArr.push(userDetails);
        fetchResponse(userArr);
        firstName.value = ''
        lastName.value = ''
        email.value = ''
        username.value = ''
        password.value = ''
    } else {
        alert(data.message)
    }
    // console.log(response)
}

form.onsubmit = (e) => {
    e.preventDefault();
    let userDetails = {};
    userDetails.email = email.value
    userDetails.fist_name = firstName.value
    userDetails.last_name = lastName.value
    userDetails.pwd = password.value
    userDetails.username = username.value
    // console.log(userDetails)
    addNewUser(userDetails);
}


// Delete user
userList.onclick = async (e) => {
    e.preventDefault()
    const isDelete = e.target.id === 'delete';
    if(isDelete) {
    let email = e.target.parentElement.getAttribute('data-email');
    
    const res = await fetch(`${url}/delete_existing_user?email=${email}`,{
        method: 'DELETE',
    });
    const data = await res.json();
    console.log(data)
    if(data.status == 'Deleted') {
        location.reload();
    } else {
        alert(data.message)
    }
}
    
}



