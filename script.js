let chemicals = [
    { 
        id: 1, 
        chemical_name: "Ammonium Persulfate", 
        vendor: "LG Chem", 
        density: 3525.92, 
        viscosity: 60.63, 
        packaging: "Bag", 
        pack_size: 100.00, 
        unit: "kg", 
        quantity: 6495.18 
    },
    {
        id: 2, 
        chemical_name: "Caustic Potash", 
        vendor: "Formosa", 
        density: 3172.15, 
        viscosity: 48.22, 
        packaging: "Bag", 
        pack_size: 100.00, 
        unit: "kg", 
        quantity: 8751.90 
    },
    { 
        id: 3, 
        chemical_name: "Dimethylaminopropylamino", 
        vendor: "LG Chem", 
        density: 8435.37, 
        viscosity: 12.62, 
        packaging: "Barrel", 
        pack_size: 75.00, 
        unit: "L", 
        quantity: 5964.61 
    },
    { 
        id: 4, 
        chemical_name: "Mono Ammonium Phosphate", 
        vendor: "Sinopec", 
        density: 1597.65, 
        viscosity: 76.51, 
        packaging: "Bag", 
        pack_size: 105.00, 
        unit: "kg", 
        quantity: 8183.73 
    },
    { 
        id: 5, 
        chemical_name: "Ferric Nitrate", 
        vendor: "DowDuPont", 
        density: 364.04, 
        viscosity: 14.90, 
        packaging: "Bag", 
        pack_size: 105.00, 
        unit: "kg", 
        quantity: 4154.33 
    },
    { 
        id: 6, 
        chemical_name: "n-Pentane", 
        vendor: "Sinopec", 
        density: 4535.26, 
        viscosity: 66.76, 
        packaging: "N/A", 
        pack_size: "N/A", 
        unit: "t", 
        quantity: 6272.34 
    },
    { 
        id: 7, 
        chemical_name: "Glycol Ether PM", 
        vendor: "LG Chem", 
        density: 6495.18, 
        viscosity: 72.12, 
        packaging: "Bag", 
        pack_size: 250.00, 
        unit: "kg", 
        quantity: 8749.54 
    },
    { 
        id: 8, 
        chemical_name: "Sulfuric Acid",
        vendor: "DuPont", 
        density: 1840.00, 
        viscosity: 26.70, 
        packaging: "Drum", 
        pack_size: 200.00, 
        unit: "L", 
        quantity: 3000.00 
    },
    { 
        id: 9, 
        chemical_name: "Glycerol", 
        vendor: "Shell Chemicals", 
        density: 1260.00, 
        viscosity: 1410.00, 
        packaging: "Barrel", 
        pack_size: 50.00, 
        unit: "kg", 
        quantity: 750.00 
    },
    { 
        id: 10, 
        chemical_name: "Methanol", 
        vendor: "Mitsubishi Gas Chemical",
        density: 792.00, 
        viscosity: 0.59, 
        packaging: "Drum", 
        pack_size: 160.00, 
        unit: "L", 
        quantity: 1200.00 
    },
    { 
        id: 11, 
        chemical_name: "Isopropanol", 
        vendor: "ExxonMobil", 
        density: 786.00, 
        viscosity: 2.43, 
        packaging: "Can", 
        pack_size: 25.00, 
        unit: "L", 
        quantity: 400.00 
    },
    { 
        id: 12, 
        chemical_name: "Formaldehyde", 
        vendor: "Celanese", 
        density: 815.00, 
        viscosity: 0.27, 
        packaging: "Bottle", 
        pack_size: 5.00, 
        unit: "L", 
        quantity: 180.00 
    },
    { 
        id: 13, 
        chemical_name: "Benzene", 
        vendor: "Chevron Phillips", 
        density: 876.50, 
        viscosity: 0.65, 
        packaging: "Barrel", 
        pack_size: 159.00, 
        unit: "L", 
        quantity: 900.00 
    },
    { 
        id: 14, 
        chemical_name: "Toluene", 
        vendor: "Total Petrochemicals", 
        density: 867.00, 
        viscosity: 0.59, 
        packaging: "Drum", 
        pack_size: 200.00, 
        unit: "L", 
        quantity: 1100.00 
    },
    { 
        id: 15, 
        chemical_name: "Xylene", 
        vendor: "LyondellBasell", 
        density: 861.00, 
        viscosity: 0.60, 
        packaging: "Can", 
        pack_size: 20.00, 
        unit: "L", 
        quantity: 600.00 
    },
];

let selectedRowIndex = null;
let currentSortColumn = '';
let sortAscending = true;


const originalChemicals = [...chemicals];

function loadTableData() {
    const tableBody = document.getElementById('chemicalTableBody');
    tableBody.innerHTML = '';
    chemicals.forEach((chemical, index) => {
        let row = document.createElement('tr');
        row.dataset.index = index;
        row.onclick = () => selectRow(index, row);
        row.innerHTML = `
            <td class="tick-box">
                <i class="bi bi-check ${index === selectedRowIndex ? 'selected' : ''}"></i>
            </td>
            <td>${chemical.id}</td>
            <td>${chemical.chemical_name}</td>
            <td>${chemical.vendor}</td>
            <td><input type="text" class="editable" value="${chemical.density}" onchange="updateChemical(${index}, 'density', this.value)"></td>
            <td><input type="number" class="editable" value="${chemical.viscosity}" onchange="updateChemical(${index}, 'viscosity', this.value)"></td>
            <td>${chemical.packaging}</td>
            <td>${chemical.pack_size}</td>
            <td>${chemical.unit}</td>
            <td><input type="number" class="editable" value="${chemical.quantity}" onchange="updateChemical(${index}, 'quantity', this.value)"></td>
        `;
        tableBody.appendChild(row);
    });
}

function selectRow(index, rowElement) {
    const previousSelectedRow = document.querySelector('.selected-row');
    if (previousSelectedRow) {
        previousSelectedRow.classList.remove('selected-row');
        const previousTick = previousSelectedRow.querySelector('.bi-check');
        previousTick.classList.remove('selected');
    }

    selectedRowIndex = index;
    rowElement.classList.add('selected-row');
    const tick = rowElement.querySelector('.bi-check');
    tick.classList.add('selected');
}

function updateChemical(index, property, value) {
    chemicals[index][property] = value;
}

function sortTable(column) {
    if (currentSortColumn === column) {
        sortAscending = !sortAscending;
    } else {
        currentSortColumn = column;
        sortAscending = true;
    }

    chemicals.sort((a, b) => {
        const valA = a[column];
        const valB = b[column];
        if (typeof valA === 'string') {
            return sortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
            return sortAscending ? valA - valB : valB - valA;
        }
    });

    chemicals.forEach((chemical, index) => {
        chemical.id = index + 1;
    });

    loadTableData();
}

function addRow() {
    const newChemical = {
        id: chemicals.length + 1,
        chemical_name: "New Chemical",
        vendor: "New Vendor",
        density: 0,
        viscosity: 0,
        packaging: "NA",
        pack_size: 0,
        unit: "",
        quantity: 0
    };
    chemicals.push(newChemical);
    loadTableData();
}

function moveRowUp() {
    if (selectedRowIndex > 0) {
        [chemicals[selectedRowIndex - 1], chemicals[selectedRowIndex]] = [chemicals[selectedRowIndex], chemicals[selectedRowIndex - 1]];
        selectedRowIndex--;
        loadTableData();
    }
}

function moveRowDown() {
    if (selectedRowIndex < chemicals.length - 1) {
        [chemicals[selectedRowIndex], chemicals[selectedRowIndex + 1]] = [chemicals[selectedRowIndex + 1], chemicals[selectedRowIndex]];
        selectedRowIndex++;
        loadTableData();
    }
}

function deleteRow() {
    if (selectedRowIndex !== null) {
        chemicals.splice(selectedRowIndex, 1);
        selectedRowIndex = null; 
        loadTableData();
    }
}

function refreshData() {
    chemicals = [...originalChemicals]; 
    selectedRowIndex = null; 
    loadTableData(); 
}


loadTableData();

