document.addEventListener('DOMContentLoaded', () => {
    const groupedFilesContainer = document.getElementById('grouped-files');

    function displayGroupedFiles() {
        groupedFilesContainer.innerHTML = ''; // Clear existing content

        let adminFiles = JSON.parse(localStorage.getItem('adminFiles')) || {};

        for (const className in adminFiles) {
            const classSection = document.createElement('div');
            classSection.classList.add('class-section');

            const classTitle = document.createElement('h3');
            classTitle.textContent = `Class: ${className}`;
            classSection.appendChild(classTitle);

            const fileList = document.createElement('ul');

            adminFiles[className].forEach(file => {
                const listItem = document.createElement('li');
                
                const fileInfo = document.createElement('span');
                fileInfo.textContent = `${file.subject} uploaded by ${file.teacher}`;
                
                const downloadLink = document.createElement('a');
                downloadLink.href = file.fileData; // Use base64 data URL
                downloadLink.download = file.fileName;
                downloadLink.textContent = 'Download';
                downloadLink.classList.add('download-link');
                
                listItem.appendChild(fileInfo);
                listItem.appendChild(downloadLink);
                fileList.appendChild(listItem);
            });

            classSection.appendChild(fileList);
            groupedFilesContainer.appendChild(classSection);
        }
    }

    displayGroupedFiles();
});
