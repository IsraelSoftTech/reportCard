document.addEventListener('DOMContentLoaded', () => {
    const uploadButtons = document.querySelectorAll('.upload-button');
    const modal = document.getElementById('class-modal');
    const classSelect = document.getElementById('class-select');
    const continueBtn = document.getElementById('continue-btn');
    const closeModal = document.querySelector('.close');
    const filesList = document.getElementById('files-list');
    let selectedSubject = '';
    let currentTeacher = JSON.parse(localStorage.getItem('currentUser'));

    // Open modal when an upload button is clicked
    uploadButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSubject = button.getAttribute('data-subject');
            modal.style.display = 'block';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Continue button in modal
    continueBtn.addEventListener('click', () => {
        const selectedClass = classSelect.value;
        modal.style.display = 'none';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xlsx';
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    alert('Please upload a valid Excel file (.xlsx).');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function() {
                    const fileData = reader.result;
                    const fileName = file.name;

                    // Save the uploaded file in localStorage
                    let teacherFiles = JSON.parse(localStorage.getItem('teacherFiles')) || {};
                    if (!teacherFiles[currentTeacher.username]) {
                        teacherFiles[currentTeacher.username] = [];
                    }
                    teacherFiles[currentTeacher.username].push({ subject: selectedSubject, class: selectedClass, fileName, fileData });
                    localStorage.setItem('teacherFiles', JSON.stringify(teacherFiles));

                    // Save the file in admin's view
                    let adminFiles = JSON.parse(localStorage.getItem('adminFiles')) || {};
                    if (!adminFiles[selectedClass]) {
                        adminFiles[selectedClass] = [];
                    }
                    adminFiles[selectedClass].push({ subject: selectedSubject, teacher: currentTeacher.username, fileName, fileData });
                    localStorage.setItem('adminFiles', JSON.stringify(adminFiles));

                    // Display uploaded file on the teacher's page
                    displayUploadedFiles();
                };
                reader.readAsDataURL(file); // Read file as base64
            }
        });
        fileInput.click();
    });

    function displayUploadedFiles() {
        filesList.innerHTML = '';

        let teacherFiles = JSON.parse(localStorage.getItem('teacherFiles')) || {};
        if (teacherFiles[currentTeacher.username]) {
            teacherFiles[currentTeacher.username].forEach(file => {
                const listItem = document.createElement('li');
                listItem.textContent = `${file.subject} for ${file.class}`;
                filesList.appendChild(listItem);
            });
        }
    }

    displayUploadedFiles();
});
