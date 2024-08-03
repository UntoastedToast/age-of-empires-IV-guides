// Sidebar and menu icon elements
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.getElementById('sidebar');

// Set initial state: menu icon is closed (indicating sidebar is open)
menuIcon.classList.remove('open');
menuIcon.classList.add('closed');

// Toggle sidebar on menu icon click
menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    menuIcon.classList.toggle('open');
    menuIcon.classList.toggle('closed');
});

// Define the folder path for guides
const guidesFolder = 'guides/';

// Array of guide file names
const guideFiles = [
    'hre.html',
    // Add more guide filenames as needed
];

// Fetch each guide and extract the h1 title
guideFiles.forEach(file => {
    fetch(`${guidesFolder}${file}`)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const title = doc.querySelector('h1').innerText;

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.innerText = title;
            link.onclick = () => {
                loadGuide(`${guidesFolder}${file}`);
                // Close sidebar on guide click
                sidebar.classList.add('closed');
                menuIcon.classList.remove('closed');
                menuIcon.classList.add('open');
            };
            listItem.appendChild(link);

            document.getElementById('guide-list').appendChild(listItem);
        })
        .catch(error => console.error('Error loading guide:', error));
});

function loadGuide(guide) {
    fetch(guide)
        .then(response => {
            if (!response.ok) {
                throw new Error('Guide not found');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content-area').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading guide:', error);
            document.getElementById('content-area').innerHTML = `
                <div>
                    <h1>Fehler</h1>
                    <h2>Der ausgewählte Guide wurde nicht gefunden.</h2>
                </div>
            `;
        });
}
