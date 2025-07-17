// Application State
let appData = {
    moneyGoal: {
        name: "Dream Vacation Fund",
        currentAmount: 2500,
        targetAmount: 10000
    },
    projects: [
        {
            id: 1,
            name: "Learn Web Development",
            description: "Master modern web technologies",
            icon: "fas fa-laptop-code",
            tasks: [
                { id: 1, name: "Complete HTML/CSS course", completed: true, priority: "high" },
                { id: 2, name: "Learn JavaScript fundamentals", completed: true, priority: "high" },
                { id: 3, name: "Build first project", completed: false, priority: "medium" },
                { id: 4, name: "Learn React framework", completed: false, priority: "medium" }
            ]
        },
        {
            id: 2,
            name: "Fitness Journey",
            description: "Get in the best shape of my life",
            icon: "fas fa-heart",
            tasks: [
                { id: 1, name: "Join gym membership", completed: true, priority: "high" },
                { id: 2, name: "Create workout plan", completed: true, priority: "medium" },
                { id: 3, name: "Track daily calories", completed: false, priority: "low" },
                { id: 4, name: "Run first 5K", completed: false, priority: "high" },
                { id: 5, name: "Lose 10 pounds", completed: false, priority: "medium" }
            ]
        }
    ]
};

let currentProjectId = null;
let selectedIcon = "fas fa-laptop-code";

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateMoneyGoal();
    renderProjects();
    setupEventListeners();
});

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('goalCrusherData');
    if (savedData) {
        appData = JSON.parse(savedData);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('goalCrusherData', JSON.stringify(appData));
}

// Update money goal display
function updateMoneyGoal() {
    const { name, currentAmount, targetAmount } = appData.moneyGoal;
    const progress = (currentAmount / targetAmount) * 100;
    const remaining = targetAmount - currentAmount;

    document.getElementById('goalName').textContent = name;
    document.getElementById('currentAmount').textContent = `$${currentAmount.toLocaleString()}`;
    document.getElementById('targetAmount').textContent = `$${targetAmount.toLocaleString()}`;
    document.getElementById('goalProgress').style.width = `${progress}%`;
    document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;
    document.getElementById('remainingAmount').textContent = `$${remaining.toLocaleString()} to go!`;
}

// Render projects grid
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (appData.projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-rocket"></i>
                <h3>No projects yet</h3>
                <p>Create your first project to start tracking your goals!</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = appData.projects.map(project => {
        const completedTasks = project.tasks.filter(task => task.completed).length;
        const totalTasks = project.tasks.length;
        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        return `
            <div class="project-card" onclick="openProject(${project.id})" style="--progress: ${progress / 100}">
                <div class="project-header">
                    <div class="project-icon">
                        <i class="${project.icon}"></i>
                    </div>
                    <div class="project-info">
                        <h3>${project.name}</h3>
                    </div>
                </div>
                <div class="project-description">${project.description}</div>
                <div class="project-progress">
                    <span class="progress-label">Progress</span>
                    <span class="progress-value">${Math.round(progress)}%</span>
                </div>
                <div class="project-progress-bar">
                    <div class="project-progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Open project modal
function openProject(projectId) {
    currentProjectId = projectId;
    const project = appData.projects.find(p => p.id === projectId);
    
    if (!project) return;

    const completedTasks = project.tasks.filter(task => task.completed).length;
    const totalTasks = project.tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Update modal content
    document.getElementById('modalProjectName').textContent = project.name;
    document.getElementById('modalProgressPercent').textContent = `${Math.round(progress)}%`;
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('remainingTasks').textContent = totalTasks - completedTasks;

    // Update circular progress
    updateCircularProgress(progress);

    // Render tasks
    renderTasks(project.tasks);

    // Show modal
    document.getElementById('projectModal').style.display = 'block';
}

// Update circular progress indicator
function updateCircularProgress(progress) {
    const circle = document.querySelector('.progress-ring-circle');
    const circumference = 2 * Math.PI * 54; // r = 54
    const offset = circumference - (progress / 100) * circumference;
    
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = progress > 0 ? '#4facfe' : 'rgba(255, 255, 255, 0.1)';
}

// Render tasks list
function renderTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    
    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <h3>No tasks yet</h3>
                <p>Add your first task to get started!</p>
            </div>
        `;
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <div class="task-checkbox ${task.completed ? 'completed' : ''}" 
                 onclick="toggleTask(${task.id})"></div>
            <div class="task-content">
                <div class="task-name ${task.completed ? 'completed' : ''}">${task.name}</div>
                <div class="task-priority ${task.priority}">${task.priority}</div>
            </div>
            <button class="task-delete" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Toggle task completion
function toggleTask(taskId) {
    const project = appData.projects.find(p => p.id === currentProjectId);
    const task = project.tasks.find(t => t.id === taskId);
    
    task.completed = !task.completed;
    
    saveData();
    openProject(currentProjectId); // Refresh modal
    renderProjects(); // Refresh projects grid
}

// Delete task
function deleteTask(taskId) {
    const project = appData.projects.find(p => p.id === currentProjectId);
    project.tasks = project.tasks.filter(t => t.id !== taskId);
    
    saveData();
    openProject(currentProjectId); // Refresh modal
    renderProjects(); // Refresh projects grid
}

// Setup event listeners
function setupEventListeners() {
    // Icon selector
    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedIcon = this.dataset.icon;
        });
    });

    // Add project form
    document.getElementById('addProjectForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('projectNameInput').value.trim();
        const description = document.getElementById('projectDescriptionInput').value.trim();
        
        if (!name) return;

        const newProject = {
            id: Date.now(),
            name,
            description: description || 'No description provided',
            icon: selectedIcon,
            tasks: []
        };

        appData.projects.push(newProject);
        saveData();
        renderProjects();
        closeAddProjectModal();
        
        // Reset form
        this.reset();
        document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.icon-btn').classList.add('active');
        selectedIcon = "fas fa-laptop-code";
    });

    // Add task form
    document.getElementById('addTaskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('taskNameInput').value.trim();
        const priority = document.getElementById('taskPriorityInput').value;
        
        if (!name || !currentProjectId) return;

        const project = appData.projects.find(p => p.id === currentProjectId);
        const newTask = {
            id: Date.now(),
            name,
            priority,
            completed: false
        };

        project.tasks.push(newTask);
        saveData();
        openProject(currentProjectId); // Refresh modal
        renderProjects(); // Refresh projects grid
        closeAddTaskModal();
        
        // Reset form
        this.reset();
    });

    // Edit goal form
    document.getElementById('editGoalForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('goalNameEdit').value.trim();
        const currentAmount = parseFloat(document.getElementById('currentAmountEdit').value);
        const targetAmount = parseFloat(document.getElementById('targetAmountEdit').value);
        
        if (!name || isNaN(currentAmount) || isNaN(targetAmount) || targetAmount <= 0) return;

        appData.moneyGoal = {
            name,
            currentAmount: Math.max(0, currentAmount),
            targetAmount
        };

        saveData();
        updateMoneyGoal();
        closeEditGoalModal();
    });

    // Close modals on outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Modal functions
function showAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'block';
    document.getElementById('projectNameInput').focus();
}

function closeAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'none';
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
    currentProjectId = null;
}

function showAddTaskModal() {
    if (!currentProjectId) return;
    document.getElementById('addTaskModal').style.display = 'block';
    document.getElementById('taskNameInput').focus();
}

function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
}

function editGoal() {
    const { name, currentAmount, targetAmount } = appData.moneyGoal;
    
    document.getElementById('goalNameEdit').value = name;
    document.getElementById('currentAmountEdit').value = currentAmount;
    document.getElementById('targetAmountEdit').value = targetAmount;
    
    document.getElementById('editGoalModal').style.display = 'block';
    document.getElementById('goalNameEdit').focus();
}

function closeEditGoalModal() {
    document.getElementById('editGoalModal').style.display = 'none';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        currentProjectId = null;
    }
    
    // Ctrl/Cmd + N to add new project
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        showAddProjectModal();
    }
});

// Add some fun animations and interactions
function addCelebrationEffect() {
    // Create confetti effect when a task is completed
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add celebration when project is completed
function checkProjectCompletion(projectId) {
    const project = appData.projects.find(p => p.id === projectId);
    const completedTasks = project.tasks.filter(task => task.completed).length;
    const totalTasks = project.tasks.length;
    
    if (totalTasks > 0 && completedTasks === totalTasks) {
        setTimeout(() => {
            addCelebrationEffect();
            // Show celebration message
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px 40px;
                border-radius: 12px;
                font-size: 18px;
                font-weight: 600;
                z-index: 10000;
                animation: celebrationPop 3s ease forwards;
            `;
            message.textContent = `🎉 Congratulations! You completed "${project.name}"!`;
            document.body.appendChild(message);
            
            setTimeout(() => message.remove(), 3000);
        }, 100);
    }
}

// Update the toggle task function to include celebration check
const originalToggleTask = toggleTask;
toggleTask = function(taskId) {
    originalToggleTask(taskId);
    checkProjectCompletion(currentProjectId);
};

// Add celebration animation
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationPop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(celebrationStyle);