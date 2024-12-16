const teamMembers = [
    {
        name: "Anete Bite",
        role: "Dizainere",
        experience: "5 gadi",
        email: "anete.bite@gmail.com"
    },
    {
        name: "Linda Loreta Nitiša",
        role: "Programmētāja",
        experience: "3 gadi",
        email: "linda.nitisa@gmail.com"
    }
];

// Funkcija, lai parādītu komandas dalībnieku detaļas HTML lapas beigās
function displayTeamMembers() {
    const teamSection = document.createElement('section');
    teamSection.id = 'team-section';

    const title = document.createElement('h2');
    title.textContent = "Darba autores";
    teamSection.appendChild(title);

    teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member';

        const name = document.createElement('h3');
        name.textContent = member.name;
        memberDiv.appendChild(name);

        const role = document.createElement('p');
        role.textContent = `Loma: ${member.role}`;
        memberDiv.appendChild(role);

        const experience = document.createElement('p');
        experience.textContent = `Pieredze: ${member.experience}`;
        memberDiv.appendChild(experience);

        const email = document.createElement('p');
        email.textContent = `E-pasts: ${member.email}`;
        memberDiv.appendChild(email);

        teamSection.appendChild(memberDiv);
    });

    // Pievieno komandas sadaļu lapas apakšā
    document.body.appendChild(teamSection);
}

// Izsauc funkciju, lai parādītu datus lapas apakšā
window.onload = displayTeamMembers;

// Stabiņu diagramma (Bar Chart) - Latvijas pilsētu iedzīvotāju skaits
const barChartCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barChartCtx, {
    type: 'bar',
    data: {
        labels: ['Rīga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala'], // Pilsētas
        datasets: [{
            label: 'Iedzīvotāju skaits (tūkstoši)',
            data: [632, 82, 68, 55, 50], // Iedzīvotāju skaits
            backgroundColor: ['#4CAF50', '#FF5733', '#FFC300', '#3498DB', '#9B59B6'], // Krāsas
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Latvijas pilsētu iedzīvotāju skaits'
            }
        }
    }
});

// Līknes diagramma (Line Chart) - Dzimstība Latvijā pa gadiem
const lineChartCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineChartCtx, {
    type: 'line',
    data: {
        labels: ['2010', '2012', '2014', '2016', '2018', '2020'], // Gadi
        datasets: [{
            label: 'Dzimstību skaits (tūkstoši)',
            data: [19.8, 19.2, 18.7, 17.4, 15.6, 14.5], // Dzimstības dati
            borderColor: '#FF5733',
            backgroundColor: 'rgba(255, 87, 51, 0.2)', // Līknes apakšējā aizpildījuma krāsa
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Dzimstības dinamika Latvijā (2010–2020)'
            }
        }
    }
});
// Funkcija, lai nolasītu CSV failu un pārveidotu datus
async function getData() {
    const response = await fetch('majdzivnieki.csv');
    const data = await response.text();

    // Sadalām CSV datus rindās un kolonās
    const rows = data.split('\n').slice(1); // Izlaižam virsraksta rindu
    const years = [];
    const dogs = [];
    const cats = [];

    rows.forEach(row => {
        const cols = row.split(',');
        years.push(cols[0]); // Kolonna: Gads
        dogs.push(parseInt(cols[1])); // Kolonna: Suņi
        cats.push(parseInt(cols[2])); // Kolonna: Kaķi
    });

    return { years, dogs, cats };
}

// Funkcija, lai izveidotu līknes diagrammu
async function createLineChart() {
    const { years, dogs, cats } = await getData();

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Suņi',
                    data: dogs,
                    borderColor: '#FF5733',
                    backgroundColor: 'rgba(255, 87, 51, 0.2)',
                    tension: 0.4
                },
                {
                    label: 'Kaķi',
                    data: cats,
                    borderColor: '#3498DB',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Suņu un kaķu populācijas izmaiņas'
                }
            }
        }
    });
}

// Funkcija, lai izveidotu stabiņu diagrammu
async function createBarChart() {
    const { years, dogs, cats } = await getData();

    const totalPets = dogs.map((dog, index) => dog + cats[index]); // Kopējais mājdīvnieku skaits

    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Kopējais mājdīvnieku skaits',
                data: totalPets,
                backgroundColor: '#4CAF50',
                borderColor: '#388E3C',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Kopējais mājdīvnieku skaits pa gadiem'
                }
            }
        }
    });
}

// Izsauc abas funkcijas, kad lapa ielādējas
window.onload = function () {
    createLineChart();
    createBarChart();
};
