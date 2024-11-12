document.addEventListener('DOMContentLoaded', function() {
    // Get all category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Add click event listener to each button
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the target section id from data-target attribute
            const targetId = this.getAttribute('data-target');
            
            // Find the target section
            const targetSection = document.getElementById(targetId);
            
            // Scroll to the section smoothly
            if (targetSection) {
                // Get the height of the sticky header
                const navHeight = document.querySelector('.category-nav').offsetHeight;
                const totalCostHeight = document.querySelector('.total-cost').offsetHeight;
                
                // Calculate the final scroll position
                const targetPosition = targetSection.offsetTop - navHeight - totalCostHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 
