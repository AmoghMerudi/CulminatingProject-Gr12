let employees = [];
let genders = [];
let genderColumns = [];
let employeeDataJSON = []; // JSON object for the dataset
let searchBox; // Input element for searching
let searchLogic; // Instance of the Search class
let filteredEmployees = []; // Filtered employees based on search

function preload() {
    table = loadTable("BananaByte_Employee_Salary_090923.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth * 4, windowHeight * 4);

    // Convert CSV to JSON
    employeeDataJSON = convertCSVToJSON();

    // Use the JSON data to populate employees array
    parseData();

    genders = [...new Set(employees.map(e => e.gender))];
    genderColumns = genders.map((_, i) => new GenderColumn(i, genders.length));

    // Initialize the Search class with the employee dataset
    searchLogic = new Search(employees);

    // Create search box
    searchBox = createInput();
    searchBox.position(width / 3 - 100, height - 50); // Centered near the bottom
    searchBox.size(200);
    searchBox.attribute("placeholder", "Search by Job Role");
    searchBox.input(handleSearch); // Trigger filtering on input
}

function draw() {
    background(30);

    for (let column of genderColumns) {
        column.render();
        column.plotPoints();
        column.displaySortTimes();
    }

    // Display instructions for the search box
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text("Type a Job Role to filter points", width / 3, height - 80);
}

// Convert CSV data to JSON format
function convertCSVToJSON() {
    let jsonData = [];
    for (let i = 0; i < table.getRowCount(); i++) {
        let row = {
            gender: table.getString(i, "Gender"),
            yearsExp: parseFloat(table.getString(i, "Years_Exp")),
            salary: parseFloat(table.getString(i, "Salary")),
            jobRole: table.getString(i, "Job_Role")
        };

        // Validate numeric fields
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
  }
} 

// Populate employees array using the JSON data
function parseData() {
    for (let row of employeeDataJSON) {
        employees.push(new Employee(row.gender, row.yearsExp, row.salary, row.jobRole));
    }
    filteredEmployees = [...employees]; // Initially, all employees are displayed
}

// Handle search input
function handleSearch() {
    const query = searchBox.value();

    // Use the Search class to perform a linear search
    filteredEmployees = searchLogic.linearSearch(query);

    // Update points in GenderColumns based on filtered employees
    for (let i = 0; i < genderColumns.length; i++) {
        genderColumns[i].points = filteredEmployees.filter(e => e.gender === genders[i]);
    }
}
