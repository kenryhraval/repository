async function listFiles(folderPath = 'files', parentList = null) {
    const repoOwner = 'kenryhraval';
    const repoName = 'personal-webpage'; 
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

    try {
        const response = await fetch(apiUrl);
        const files = await response.json();

        // If parentList is provided, use it. Otherwise, use the root list.
        const fileList = parentList || document.getElementById('fileList');

        files.forEach(file => {
            const listItem = document.createElement('li');
            
            if (file.type === 'file') { 
                listItem.classList.add('file');

                const link = document.createElement('a');
                link.href = file.download_url;
                link.textContent = file.name;
                link.target = '_blank'; // Open in a new tab
                
                listItem.appendChild(link);

            } else if (file.type === 'dir') {
                listItem.classList.add('folder');
                // If it's a directory, create a folder item
                const folderName = document.createElement('span');
                folderName.textContent = `📁 ${file.name}`;
                folderName.style.fontWeight = 'bold';

                listItem.appendChild(folderName);

                // Create a sublist for the directory content
                const subList = document.createElement('ul');
                listItem.appendChild(subList);
                
                // Recursively list files in the directory
                listFiles(file.path, subList);
            }
            
            // Add the list item to the parent list
            fileList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    listFiles();
});

