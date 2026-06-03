document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultsContainer = document.getElementById('results-container');

    const members = [
        'Joanna',
        'Melo',
        'Rithika',
        'Katherine',
        'Tim',
        'Will',
        'Shreya'
    ];

    const memberImages = {
        'Joanna': 'joanna.jpg',
        'Melo': 'melo.jpg',
        'Rithika': 'rithika.png',
        'Katherine': 'katherine.jpg',
        'Tim': 'tim.png',
        'Will': 'will.jpg',
        'Shreya': 'shreya.jpg'
    };

    // Fetch and render the links markdown
    const linksContainer = document.getElementById('links-container');
    fetch('assets/docs/links.md')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(text => {
            // marked is available globally from CDN
            linksContainer.innerHTML = marked.parse(text);

            // Post-process table to sort alphabetically and add avatars
            const tbody = linksContainer.querySelector('tbody');
            if (tbody) {
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                // Sort alphabetically by the first column (Name)
                rows.sort((a, b) => {
                    const nameA = a.querySelector('td:first-child').textContent.trim();
                    const nameB = b.querySelector('td:first-child').textContent.trim();
                    return nameA.localeCompare(nameB);
                });
                
                // Re-append sorted rows and add the avatar
                tbody.innerHTML = '';
                rows.forEach(row => {
                    const nameTd = row.querySelector('td:first-child');
                    const name = nameTd.textContent.trim();
                    
                    // Create a flex container for avatar and name
                    nameTd.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <div class="member-avatar" style="width: 2rem; height: 2rem; font-size: 0.75rem;">
                                ${getAvatar(name)}
                            </div>
                            <span>${name}</span>
                        </div>
                    `;
                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching links markdown:', error);
            linksContainer.innerHTML = '<p class="empty-state" style="padding: 1rem;">Could not load links.</p>';
        });

    // Fisher-Yates shuffle
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function createGroups(shuffledMembers) {
        const groups = [];
        let i = 0;
        
        while (i < shuffledMembers.length) {
            // Group of 3 at the end if necessary
            if (shuffledMembers.length - i === 3) {
                groups.push([shuffledMembers[i], shuffledMembers[i+1], shuffledMembers[i+2]]);
                break;
            }
            // Group of 2
            groups.push([shuffledMembers[i], shuffledMembers[i+1]]);
            i += 2;
        }
        
        return groups;
    }

    function getAvatar(name) {
        const imageFile = memberImages[name];
        if (imageFile) {
            return `<img src="assets/images/${imageFile}" alt="${name}">`;
        }
        return name.charAt(0).toUpperCase();
    }

    function renderGroups(groups) {
        resultsContainer.innerHTML = '';
        
        groups.forEach((group, index) => {
            const card = document.createElement('div');
            card.className = 'group-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            const header = document.createElement('div');
            header.className = 'group-header';
            header.innerHTML = `
                <h2 class="group-title">Group ${index + 1}</h2>
                <span class="group-badge">${group.length} Members</span>
            `;
            
            const memberList = document.createElement('div');
            memberList.className = 'member-list';
            
            group.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.className = 'member';
                memberDiv.innerHTML = `
                    <div class="member-avatar">${getAvatar(member)}</div>
                    <span class="member-name">${member}</span>
                `;
                memberList.appendChild(memberDiv);
            });
            
            card.appendChild(header);
            card.appendChild(memberList);
            resultsContainer.appendChild(card);
        });
    }

    generateBtn.addEventListener('click', () => {
        const icon = generateBtn.querySelector('.btn-icon');
        icon.style.transform = `rotate(${Math.random() * 360 + 360}deg)`;
        
        const shuffled = shuffleArray(members);
        const groups = createGroups(shuffled);
        renderGroups(groups);
    });
});
