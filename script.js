let currentUser = {
    role: "Admin", 
    name: "Sakshi Kadadekar",
    status: "Out"
};

function togglePages() {
    document.getElementById('signin-box').classList.toggle('hidden');
    document.getElementById('signup-box').classList.toggle('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    document.getElementById('signin-box').classList.add('hidden');
    document.getElementById('signup-box').classList.add('hidden');
    showDashboard();
    document.body.classList.add('dashboard-active');
}

function hideAllPages() {
    const pages = ['dashboard', 'profile-page', 'attendance-page', 'time-off-page'];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.add('hidden', 'hidden-main');
    });
}

function setActiveNavLink(index) {
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => link.classList.remove('active'));
    if(navLinks[index]) navLinks[index].classList.add('active');
}

function showDashboard() {
    hideAllPages();
    const el = document.getElementById('dashboard');
    if(el) el.classList.remove('hidden', 'hidden-main');
    setActiveNavLink(0);
}

function openProfile() {
    hideAllPages();
    const el = document.getElementById('profile-page');
    if(el) el.classList.remove('hidden', 'hidden-main');


    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => link.classList.remove('active'));

    const salaryTab = document.getElementById('salary-tab');
    if(currentUser.role === "Admin") salaryTab.classList.remove('hidden');
    else salaryTab.classList.add('hidden');
}
function showAttendance() {
    hideAllPages();
    const el = document.getElementById('attendance-page');
    if(el) el.classList.remove('hidden', 'hidden-main');
    setActiveNavLink(1);
    renderAttendanceView(currentUser.role);
}

function showTimeOff() {
    hideAllPages();
    const el = document.getElementById('time-off-page');
    if(el) el.classList.remove('hidden', 'hidden-main');
    setActiveNavLink(2);
    renderTimeOffView();
}
function generateEmpID(name, year) {
    let initials = name.substring(0, 2).toUpperCase();
    let companyCode = "OI";
    let serial = "0001"; 
    return `${companyCode}${initials}${year}${serial}`;
}


function showTab(tabName, event) {
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
    const target = document.getElementById(tabName + '-content');
    if(target) target.classList.remove('hidden');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');
}

function renderAttendanceView(role) {
    const headers = document.getElementById('table-headers');
    const tbody = document.getElementById('attendance-data');
    

    headers.innerHTML = `<th>Date/Emp</th><th>Check In</th><th>Check Out</th><th>Work Hours</th><th>Extra Hours</th>`;
    

    let checkIn = "10:00";
    let checkOut = "20:00"; 
    let workHours = 10;
    let extraHours = workHours > 9 ? (workHours - 9) + ":00" : "00:00";

    tbody.innerHTML = `
        <tr>
            <td>${role === "Admin" ? "Sakshi K." : "03/01/2026"}</td>
            <td>${checkIn}</td>
            <td>${checkOut}</td>
            <td>${workHours}:00</td>
            <td style="color: green; font-weight: bold;">+${extraHours}</td>
        </tr>
    `;
}

function filterAttendance() {
    let searchTerm = document.querySelector('#admin-controls .search-bar').value.toLowerCase();
    document.querySelectorAll('#attendance-data tr').forEach(row => {
        row.style.display = row.cells[0].innerText.toLowerCase().includes(searchTerm) ? "" : "none";
    });
}

function calculateSalary() {
    const wage = parseFloat(document.getElementById('total-wage').value) || 0;
    
    const basic = wage * 0.50; 
    const hra = basic * 0.50;  
    const perfBonus = wage * 0.0833;
    const travel = wage * 0.0833;
    const pf = 3000; 
    
    document.getElementById('calc-basic').innerText = basic.toFixed(2) + " ₹";
    document.getElementById('calc-hra').innerText = hra.toFixed(2) + " ₹";
    document.getElementById('calc-pf').innerText = pf + " ₹";

}

function handleCheckIn() {
    document.getElementById('check-in-box').classList.add('hidden');
    document.getElementById('check-out-box').classList.remove('hidden');
    document.querySelectorAll('.status-dot').forEach(dot => dot.className = "status-dot dot-green");
}

function handleCheckOut() {
    document.getElementById('check-out-box').classList.add('hidden');
    document.getElementById('check-in-box').classList.remove('hidden');
    document.querySelectorAll('.status-dot').forEach(dot => dot.className = "status-dot dot-red");
}

function renderTimeOffView() {
    const tbody = document.getElementById('time-off-data');
    const actionHeader = document.getElementById('admin-action-header');

    if (currentUser.role === "Admin") {
        actionHeader.style.display = ""; 
        tbody.innerHTML = `<tr>
            <td>Anand J.</td>
            <td>28/10/2025</td>
            <td>28/10/2025</td>
            <td style="color:#3b82f6">Paid time off</td>
            <td><span class="status-dot dot-yellow"></span> Pending</td>
            <td>
                <button class="btn-approve" onclick="alert('Approved')">Approve</button>
                <button class="btn-reject" onclick="alert('Rejected')">Reject</button>
            </td>
        </tr>`;
    } else {
        actionHeader.style.display = "none"; 
        tbody.innerHTML = `<tr>
            <td>Sakshi K. (Me)</td>
            <td>28/10/2025</td>
            <td>28/10/2025</td>
            <td style="color:#3b82f6">Paid time off</td>
            <td><span class="status-dot dot-green"></span> Approved</td>
            <td></td>
        </tr>`;
    }
}

function openTimeOffModal() { document.getElementById('modal-overlay').classList.remove('hidden'); }
function closeTimeOffModal() { document.getElementById('modal-overlay').classList.add('hidden'); }
function handleTimeOffSubmit(e) { e.preventDefault(); alert("Submitted!"); closeTimeOffModal(); }
function toggleDropdown() { document.getElementById('profile-dropdown').classList.toggle('hidden'); }
function logout() { location.reload(); }

document.addEventListener('DOMContentLoaded', () => {
    const dashSearch = document.querySelector('.main-content .search-bar');
    if(dashSearch) {
        dashSearch.addEventListener('input', (e) => {
            let term = e.target.value.toLowerCase();
            document.querySelectorAll('.emp-card').forEach(card => {
                card.style.display = card.querySelector('.emp-name').innerText.toLowerCase().includes(term) ? "block" : "none";
            });
        });
    }
});
document.getElementById('logo-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const placeholders = document.querySelectorAll('.logo-placeholder');
            placeholders.forEach(p => {
                p.innerHTML = `<img src="${e.target.result}" style="height:100%; width:auto; border-radius:4px;">`;
                p.style.background = "none";
            });
        }
        reader.readAsDataURL(file);
    }
});
window.onclick = function(event) {
    if (!event.target.matches('.user-avatar')) {
        var dropdowns = document.getElementsByClassName("dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (!openDropdown.classList.contains('hidden')) {
                openDropdown.classList.add('hidden');
            }
        }
    }
} 

let timerInterval = null;


function handleCheckIn() {
    const startTime = new Date().getTime();


    localStorage.setItem('isCheckIn', 'true');
    localStorage.setItem('checkInStartTime', startTime);

    updateCheckInUI(startTime);
}


function updateCheckInUI(startTime) {
    document.getElementById('check-in-box').classList.add('hidden');
    document.getElementById('check-out-box').classList.remove('hidden');
    document.querySelectorAll('.status-dot')
        .forEach(dot => dot.className = "status-dot dot-green");


    if (timerInterval) clearInterval(timerInterval);


    timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = Math.floor((now - startTime) / 1000);

        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;

        document.querySelector('.since-text').innerText =
            `Working for: ${h.toString().padStart(2, '0')}:${m
                .toString()
                .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }, 1000);
}


function handleCheckOut() {
    clearInterval(timerInterval);


    localStorage.removeItem('isCheckIn');
    localStorage.removeItem('checkInStartTime');

    document.getElementById('check-out-box').classList.add('hidden');
    document.getElementById('check-in-box').classList.remove('hidden');
    document.querySelectorAll('.status-dot')
        .forEach(dot => dot.className = "status-dot dot-red");

    document.querySelector('.since-text').innerText = '';
}


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isCheckIn') === 'true') {
        const startTime = parseInt(localStorage.getItem('checkInStartTime'));
        updateCheckInUI(startTime);
    }
});
function addNewEmployee() {
    let name = prompt("Enter Employee Name:");
    if (name) {
        const grid = document.querySelector('.employee-grid');
        const newCard = document.createElement('div');
        newCard.className = 'emp-card';
        newCard.onclick = openProfile;
        newCard.innerHTML = `
            <span class="card-status dot-red"></span>
            <div class="emp-img">👤</div>
            <p class="emp-name">${name}</p>
        `;
        grid.appendChild(newCard);
    }
}
function handleSignUp(event) {
    event.preventDefault(); 
    
    const inputs = document.querySelectorAll('#signup-box input');
    const name = inputs[1].value;
    const year = new Date().getFullYear();


    const generatedID = generateEmpID(name, year);


    if (inputs[4].value !== inputs[5].value) {
        alert("Bhai, passwords match nahi ho rahe!");
        return;
    }


    alert(`Account Created Successfully!\nYour Login ID is: ${generatedID}\nPlease use this ID to Sign In.`);
    

    togglePages(); 
}