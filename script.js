// API Configuration
const API_URL = 'http://localhost:3001/api/analyze';

// DOM Elements
const symptomForm = document.getElementById('symptomForm');
const symptomsInput = document.getElementById('symptoms');
const inputSection = document.getElementById('inputSection');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const conditionsList = document.getElementById('conditionsList');
const recommendationsList = document.getElementById('recommendationsList');
const disclaimerText = document.getElementById('disclaimerText');
const newAnalysisBtn = document.getElementById('newAnalysisBtn');

// Tab functionality
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        document.getElementById(`${tabName}Tab`).classList.add('active');
    });
});

// Form submission
symptomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const symptoms = symptomsInput.value.trim();
    if (!symptoms) return;
    
    // Show loading state
    inputSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    
    try {
        // Call API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms })
        });
        
        if (!response.ok) {
            throw new Error('Failed to analyze symptoms');
        }
        
        const data = await response.json();
        
        // Display results
        displayResults(data);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to analyze symptoms. Please try again.');
        
        // Show input form again
        loadingSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
    }
});

// Display results
function displayResults(data) {
    // Hide loading, show results
    loadingSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    // Display conditions
    if (data.conditions && data.conditions.length > 0) {
        conditionsList.innerHTML = data.conditions.map(condition => `
            <div class="condition-item">
                <div class="condition-header">
                    <div class="condition-name">${condition.name}</div>
                    <span class="likelihood-badge likelihood-${condition.likelihood.toLowerCase()}">
                        ${condition.likelihood} Likelihood
                    </span>
                </div>
                <div class="condition-description">${condition.description}</div>
            </div>
        `).join('');
    } else {
        conditionsList.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5);">No specific conditions identified.</p>';
    }
    
    // Display recommendations
    if (data.recommendations && data.recommendations.length > 0) {
        recommendationsList.innerHTML = data.recommendations.map(rec => `
            <div class="recommendation-item">
                <div class="recommendation-icon">✓</div>
                <div class="recommendation-text">${rec}</div>
            </div>
        `).join('');
    } else {
        recommendationsList.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5);">No specific recommendations available.</p>';
    }
    
    // Display disclaimer
    if (data.disclaimer) {
        disclaimerText.textContent = data.disclaimer;
    }
}

// New analysis button
newAnalysisBtn.addEventListener('click', () => {
    resultsSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
    symptomsInput.value = '';
    
    // Reset to first tab
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    tabs[0].classList.add('active');
    tabContents[0].classList.add('active');
});
