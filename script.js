
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
    document.getElementById('dashboard').classList.remove('hidden-main');
    document.body.classList.add('dashboard-active');
}


function showDashboard() {
    document.getElementById('profile-page').classList.add('hidden');
    document.getElementById('attendance-page').classList.add('hidden'); 
    document.getElementById('dashboard').classList.remove('hidden-main');


    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.nav-links li')[0].classList.add('active'); 
}

function openProfile() {
    document.getElementById('dashboard').classList.add('hidden-main');
    document.getElementById('attendance-page').classList.add('hidden');
    document.getElementById('profile-page').classList.remove('hidden');
    
    const salaryTab = document.getElementById('salary-tab');
    if(currentUser.role === "Admin") {
        salaryTab.classList.remove('hidden');
    } else {
        salaryTab.classList.add('hidden');
    }
}

function showAttendance() {
    document.getElementById('dashboard').classList.add('hidden-main');
    document.getElementById('profile-page').classList.add('hidden');
    document.getElementById('attendance-page').classList.remove('hidden');

    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.nav-links li')[1].classList.add('active');

    renderAttendanceView(currentUser.role);
}


function showTab(tabName, event) {
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
    const targetPane = document.getElementById(tabName + '-content');
    if(targetPane) targetPane.classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');
}


function renderAttendanceView(role) {
    const adminControls = document.getElementById('admin-controls');
    const empSummaries = document.getElementById('employee-summaries');
    const adminDateCtrls = document.getElementById('admin-date-controls');
    const headers = document.getElementById('table-headers');
    const tbody = document.getElementById('attendance-data');

    if (role === "Admin") {
        adminControls.classList.remove('hidden');
        adminDateCtrls.classList.remove('hidden');
        empSummaries.classList.add('hidden');
        headers.innerHTML = `<th>Emp</th><th>Check In</th><th>Check Out</th><th>Work Hours</th>`;
        tbody.innerHTML = `<tr><td>Sakshi K.</td><td>10:00</td><td>19:00</td><td>09:00</td></tr>`;
    } else {
        adminControls.classList.add('hidden');
        adminDateCtrls.classList.add('hidden');
        empSummaries.classList.remove('hidden');
        headers.innerHTML = `<th>Date</th><th>Check In</th><th>Check Out</th><th>Work Hours</th>`;
        tbody.innerHTML = `<tr><td>28/10/2025</td><td>10:00</td><td>19:00</td><td>09:00</td></tr>`;
    }
}


function filterAttendance() {
    let searchTerm = document.querySelector('#admin-controls .search-bar').value.toLowerCase();
    let rows = document.querySelectorAll('#attendance-data tr');
    rows.forEach(row => {
        let name = row.cells[0].innerText.toLowerCase();
        row.style.display = name.includes(searchTerm) ? "" : "none";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const dashSearch = document.querySelector('.main-content .search-bar');
    if(dashSearch) {
        dashSearch.addEventListener('input', (e) => {
            let searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.emp-card').forEach(card => {
                let name = card.querySelector('.emp-name').innerText.toLowerCase();
                card.style.display = name.includes(searchTerm) ? "block" : "none";
            });
        });
    }
});


function toggleDropdown() {
    document.getElementById('profile-dropdown').classList.toggle('hidden');
}

function handleCheckIn() {
    document.getElementById('check-in-box').classList.add('hidden');
    document.getElementById('check-out-box').classList.remove('hidden');
    document.querySelectorAll('.status-dot').forEach(dot => {
        dot.classList.remove('dot-red');
        dot.classList.add('dot-green');
    });
}

function handleCheckOut() {
    document.getElementById('check-out-box').classList.add('hidden');
    document.getElementById('check-in-box').classList.remove('hidden');
    document.querySelectorAll('.status-dot').forEach(dot => {
        dot.classList.remove('dot-green');
        dot.classList.add('dot-red');
    });
}

function showTimeOff() { alert("Time Off Module coming soon!"); }
function logout() { location.reload(); }
function calculateSalary() {
    const totalWage = parseFloat(document.getElementById('total-wage').value) || 0;
    document.getElementById('calc-basic').innerText = (totalWage * 0.50).toFixed(2) + " ₹";
    document.getElementById('calc-hra').innerText = (totalWage * 0.25).toFixed(2) + " ₹";
    document.getElementById('calc-pf').innerText = (totalWage * 0.12).toFixed(2) + " ₹";
    document.getElementById('calc-fixed').innerText = (totalWage * 0.13).toFixed(2) + " ₹";
}