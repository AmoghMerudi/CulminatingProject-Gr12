// Global variables initialization
let employees = []; 
let genders = []; 
let genderColumns = []; 
let employeeDataJSON = []; 
let searchBox; 
let searchLogic; 
let filteredEmployees = []; 

// Variables for zoom and dragging functionality
let zoom = 1; 
let offsetX = 0; 
let offsetY = 0; 
let isDragging = false; 
let startDragX, startDragY; 

/*
 * Preload function loads the CSV file before the sketch starts.
 */
function preload() {
    table = loadTable("BananaByte_Employee_Salary_090923.csv", "csv", "header"); 
}

/*
 * Setup function initializes the canvas, parses data, and prepares the search box.
 */
function setup() {
    createCanvas(windowWidth, windowHeight); 

    // Convert CSV data to JSON format
    employeeDataJSON = convertCSVToJSON();

    // Parse the data to create employee objects
    parseData();

    // Extract unique gender values and create GenderColumn objects for each gender
    genders = [...new Set(employees.map(e => e.gender))];
    genderColumns = genders.map((_, i) => new GenderColumn(i, genders.length));

    // Initialize search logic with the employee data
    searchLogic = new Search(employees);

    // Create the search input box
    searchBox = createInput();
    searchBox.position(width / 2 - 100, height - 50); 
    searchBox.size(200);
    searchBox.attribute("placeholder", "Search by Job Role"); 
    searchBox.input(handleSearch); 
}

/*
 * Draw function renders the visualization on the canvas.
 * It includes gender columns, point plotting, and displaying sort times.
 */
function draw() {
    background(30); 

    // Apply zoom and offset transformations for panning and zooming
    translate(offsetX, offsetY);
    scale(zoom);

    // Render and plot points for each gender column
    for (let column of genderColumns) {
        column.render(); 
        column.plotPoints(); 
        column.displaySortTimes(); 
    }

    // Reset the transformation matrix after rendering
    resetMatrix();

    // Display instructions and search runtime analysis
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text("Type a Job Role to filter points", width / 2, height - 80);
    text(searchLogic.runtimeAnalysis, width / 2, height - 100);
}

/*
 * Convert the CSV data into JSON format for easier manipulation.
 * Each row is converted into an employee object.
 * 
 * @returns {Array} - Array of employee objects
 */
function convertCSVToJSON() {
    let jsonData = [];
    for (let i = 0; i < table.getRowCount(); i++) {
        let row = {
            gender: table.getString(i, "Gender"),
            yearsExp: parseFloat(table.getString(i, "Years_Exp")),
            salary: parseFloat(table.getString(i, "Salary")),
            jobRole: table.getString(i, "Job_Role")
        };

        // Only include valid rows where yearsExp and salary are numbers
        if (!isNaN(row.yearsExp) && !isNaN(row.salary)) {
            jsonData.push(row);
        }
    }
    return jsonData;
}

/*
 * Key press event handler for sorting operations.
 * Depending on the key pressed, it triggers sorting using different algorithms.
 */
function keyPressed() {
    if (key === "B" || key === "b") {
        for (let column of genderColumns) {
            column.sortPoints("bubble"); // Trigger Bubble Sort
        }
    } else if (key === "I" || key === "i") {
        for (let column of genderColumns) {
            column.sortPoints("inBuilt"); // Trigger Built-in Sort
        }
    } else if (key === "M" || key === "m") {
        for (let column of genderColumns) {
            column.sortPoints("merge"); // Trigger Merge Sort
        }
    }
}

/*
 * Parse the employee data and create Employee objects.
 * Also initializes the filteredEmployees array.
 */
function parseData() {
    for (let row of employeeDataJSON) {
        employees.push(new Employee(row.gender, row.yearsExp, row.salary, row.jobRole));
    }
    filteredEmployees = [...employees]; 
}

/*
 * Handle search input and filter employees based on job role.
 */
function handleSearch() {
    const query = searchBox.value(); 

    // Perform linear search and update the filtered employees list
    filteredEmployees = searchLogic.linearSearch(query);

    // Update the gender columns with the filtered employees
    for (let i = 0; i < genderColumns.length; i++) {
        genderColumns[i].points = filteredEmployees.filter(e => e.gender === genders[i]);
    }
}

/*
 * Mouse press event handler for initiating dragging.
 */
function mousePressed() {
    if (mouseButton === LEFT) {
        isDragging = true;
        startDragX = mouseX - offsetX;
        startDragY = mouseY - offsetY;
    }
}

/*
 * Mouse drag event handler for panning the view.
 */
function mouseDragged() {
    if (isDragging) {
        offsetX = mouseX - startDragX;
        offsetY = mouseY - startDragY;
    }
}

/*
 * Mouse release event handler to stop dragging.
 */
function mouseReleased() {
    if (mouseButton === LEFT) {
        isDragging = false;
    }
}

/*
 * Mouse wheel event handler for zooming in and out.
 */
function mouseWheel(event) {
    zoom -= event.delta * 0.001; // Adjust zoom speed
    zoom = constrain(zoom, 0.5, 3); // Ensure zoom stays within a reasonable range
}
