function togglePages() {
    const signIn = document.getElementById('signin-box');
    const signUp = document.getElementById('signup-box');
    
    signIn.classList.toggle('hidden');
    signUp.classList.toggle('hidden');
}


function handleLogin(event) {
    event.preventDefault();

    const signInBox = document.getElementById('signin-box');
    const dashboard = document.getElementById('dashboard');

    
    signInBox.classList.add('hidden');
    dashboard.classList.remove('hidden'); 
    
    
    document.body.style.backgroundColor = "#f3f4f6";
    document.body.style.display = "block"; 
}


function toggleDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
}


function handleCheckIn() {
    const statusDot = document.getElementById('header-status-dot');
    const checkInBox = document.getElementById('check-in-box');
    const checkOutBox = document.getElementById('check-out-box');

    
    checkInBox.classList.add('hidden');
    checkOutBox.classList.remove('hidden');
    
    
    statusDot.style.backgroundColor = "#22c55e"; 
    alert("Checked In Successfully!");
}


function handleCheckOut() {
    const statusDot = document.getElementById('header-status-dot');
    const checkInBox = document.getElementById('check-in-box');
    const checkOutBox = document.getElementById('check-out-box');

    
    checkOutBox.classList.add('hidden');
    checkInBox.classList.remove('hidden');
    
    
    statusDot.style.backgroundColor = "#ef4444";
}


function logout() {
    location.reload(); 
}