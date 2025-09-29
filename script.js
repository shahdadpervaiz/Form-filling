document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginPage = document.getElementById('loginPage');
    const dashboard = document.getElementById('dashboard');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userName = document.getElementById('userName');
    const saveBatchBtn = document.getElementById('saveBatchBtn');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Login functionality
    loginBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            // Simple authentication
            userName.textContent = username;
            loginPage.style.display = 'none';
            dashboard.style.display = 'flex';
            
            // Store login state
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
        } else {
            alert('Please enter both username and password');
        }
    });
    
    // Check if user is already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        loginPage.style.display = 'none';
        dashboard.style.display = 'flex';
        userName.textContent = sessionStorage.getItem('username') || 'Admin';
    }
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            loginPage.style.display = 'flex';
            dashboard.style.display = 'none';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    });
    
    // Dropdown functionality
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            const arrow = this.querySelector('.nav-arrow i');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('show');
                }
            });
            
            document.querySelectorAll('.nav-arrow i').forEach(i => {
                if (i !== arrow) {
                    i.classList.remove('fa-chevron-up');
                    i.classList.add('fa-chevron-down');
                }
            });
            
            // Toggle current dropdown
            dropdownMenu.classList.toggle('show');
            
            // Toggle arrow direction
            if (dropdownMenu.classList.contains('show')) {
                arrow.classList.remove('fa-chevron-down');
                arrow.classList.add('fa-chevron-up');
            } else {
                arrow.classList.remove('fa-chevron-up');
                arrow.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Save batch functionality
    saveBatchBtn.addEventListener('click', function() {
        const batchId = document.getElementById('batchId').value;
        const supplier = document.getElementById('supplier').value;
        const date = document.getElementById('date').value;
        const status = document.getElementById('status').value;
        
        if (!batchId || !supplier || !date || !status) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create batch object
        const batch = {
            batchId,
            supplier,
            date,
            status
        };
        
        // In a real application, you would send this data to a server
        console.log('Batch data:', batch);
        alert(`Batch ${batchId} saved successfully!`);
    });
    
    // Clear form functionality
    clearFormBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the form?')) {
            document.getElementById('batchId').value = '';
            document.getElementById('supplier').selectedIndex = 0;
            document.getElementById('date').value = '';
            document.getElementById('status').selectedIndex = 0;
        }
    });
});