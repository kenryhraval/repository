async function listFiles() {
    const repoOwner = 'kenryhraval';
    const repoName = 'personal-webpage'; 
    const folderName = 'files';
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderName}`;

    try {
        const response = await fetch(apiUrl);
        const files = await response.json();
        const fileList = document.getElementById('fileList');

        fileList.innerHTML = "";

        files.forEach(file => {
            if (file.type === 'file') { 
                const link = document.createElement('a');
                link.href = file.download_url;
                link.textContent = file.name;
                link.target = '_blank'; // Open in a new tab
                const listItem = document.createElement('li');
                listItem.appendChild(link);
                fileList.appendChild(listItem);
            }
        });

    } catch (error) {
        console.error('Kļūme pinesot datnes:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  listFiles();
});
