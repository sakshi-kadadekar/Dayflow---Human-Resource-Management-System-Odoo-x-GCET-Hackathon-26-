
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


function toggleDropdown() {
    document.getElementById('profile-dropdown').classList.toggle('hidden');
}


function openProfile() {
    document.getElementById('dashboard').classList.add('hidden-main');
    document.getElementById('profile-page').classList.remove('hidden');
    let userRole = "Admin"; 
    const salaryTab = document.getElementById('salary-tab');
    if(userRole === "Admin") {
        salaryTab.classList.remove('hidden');
    }
}

function showDashboard() {
    document.getElementById('profile-page').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden-main');
}

function showTab(tabName, event) {
    
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
    
    
    const targetPane = document.getElementById(tabName + '-content');
    if(targetPane) targetPane.classList.remove('hidden');


    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    if(event) {
        event.currentTarget.classList.add('active');
    }
}



function handleCheckIn() {
    
    document.getElementById('check-in-box').classList.add('hidden');
    document.getElementById('check-out-box').classList.remove('hidden');

    
    const statusDot = document.getElementById('header-status-dot');
    statusDot.classList.remove('dot-red');
    statusDot.classList.add('dot-green');
    
   
    console.log("Checked In Successfully");
}


function handleCheckOut() {
    
    document.getElementById('check-out-box').classList.add('hidden');
    document.getElementById('check-in-box').classList.remove('hidden');

    
    const statusDot = document.getElementById('header-status-dot');
    statusDot.classList.remove('dot-green');
    statusDot.classList.add('dot-red');
    
    console.log("Checked Out Successfully");
}


function logout() {
    location.reload();
}
document.querySelector('.search-bar').addEventListener('input', function(e) {
    let searchTerm = e.target.value.toLowerCase();
    let cards = document.querySelectorAll('.emp-card');
    
    cards.forEach(card => {
        let name = card.querySelector('.emp-name').innerText.toLowerCase();
        if(name.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
function calculateSalary() {
    const totalWage = parseFloat(document.getElementById('total-wage').value) || 0;

    
    const basic = totalWage * 0.50;
    const hra = basic * 0.50;      
    const stdAllowance = 4167;     
    const bonus = totalWage * 0.0833; 
    const lta = totalWage * 0.0833;   
    
    
    const pf = basic * 0.12;
    const profTax = 200; 

    
    document.getElementById('calc-basic').innerText = basic.toFixed(2) + " ₹";
    document.getElementById('calc-hra').innerText = hra.toFixed(2) + " ₹";
    document.getElementById('calc-pf').innerText = pf.toFixed(2) + " ₹";
    document.getElementById('calc-bonus').innerText = bonus.toFixed(2) + " ₹";
    
    
    const fixedAllowance = totalWage - (basic + hra + stdAllowance + bonus + lta);
    document.getElementById('calc-fixed').innerText = (fixedAllowance > 0 ? fixedAllowance.toFixed(2) : "0.00") + " ₹";
}