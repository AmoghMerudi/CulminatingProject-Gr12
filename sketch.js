let employees = [];
let genders = [];
let genderColumns = [];
let employeeDataJSON = []; 
let searchBox; 
let searchLogic; 
let filteredEmployees = []; 


let zoom = 1; 
let offsetX = 0; 
let offsetY = 0; 
let isDragging = false;
let startDragX, startDragY;

function preload() {
    table = loadTable("BananaByte_Employee_Salary_090923.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    employeeDataJSON = convertCSVToJSON();

    parseData();

    genders = [...new Set(employees.map(e => e.gender))];
    genderColumns = genders.map((_, i) => new GenderColumn(i, genders.length));

    searchLogic = new Search(employees);

    searchBox = createInput();
    searchBox.position(width / 2 - 100, height - 50); 
    searchBox.size(200);
    searchBox.attribute("placeholder", "Search by Job Role");
    searchBox.input(handleSearch); 
}

function draw() {
    background(30);

    translate(offsetX, offsetY);
    scale(zoom);

    for (let column of genderColumns) {
        column.render();
        column.plotPoints();
        column.displaySortTimes();
    }

    resetMatrix();

    fill(255);
    textSize(16);
    textAlign(CENTER);
    text("Type a Job Role to filter points", width / 2, height - 80);
    text(searchLogic.runtimeAnalysis, width / 2, height - 100);
}

function convertCSVToJSON() {
    let jsonData = [];
    for (let i = 0; i < table.getRowCount(); i++) {
        let row = {
            gender: table.getString(i, "Gender"),
            yearsExp: parseFloat(table.getString(i, "Years_Exp")),
            salary: parseFloat(table.getString(i, "Salary")),
            jobRole: table.getString(i, "Job_Role")
        };

        if (!isNaN(row.yearsExp) && !isNaN(row.salary)) {
            jsonData.push(row);
        }
    }
    return jsonData;
}

function keyPressed() {
    if (key === "B" || key === "b") {
        for (let column of genderColumns) {
            column.sortPoints("bubble");
        }
    } else if (key === "I" || key === "i") {
        for (let column of genderColumns) {
            column.sortPoints("inBuilt");
        }
    } else if (key === "M" || key === "m") {
        for (let column of genderColumns) {
            column.sortPoints("merge");
        }
    }
}

function parseData() {
    for (let row of employeeDataJSON) {
        employees.push(new Employee(row.gender, row.yearsExp, row.salary, row.jobRole));
    }
    filteredEmployees = [...employees];
}

function handleSearch() {
    const query = searchBox.value();

    filteredEmployees = searchLogic.linearSearch(query);

    for (let i = 0; i < genderColumns.length; i++) {
        genderColumns[i].points = filteredEmployees.filter(e => e.gender === genders[i]);
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        isDragging = true;
        startDragX = mouseX - offsetX;
        startDragY = mouseY - offsetY;
    }
}

function mouseDragged() {
    if (isDragging) {
        offsetX = mouseX - startDragX;
        offsetY = mouseY - startDragY;
    }
}

function mouseReleased() {
    if (mouseButton === LEFT) {
        isDragging = false;
    }
}

function mouseWheel(event) {
    zoom -= event.delta * 0.001;
    zoom = constrain(zoom, 0.5, 3);
}
