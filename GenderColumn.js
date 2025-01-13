/**
 * GenderColumn inherits from the Column class.
 * This class represents a column that visualizes employee data based on gender.
 * It displays points (employees) in two separate circles (one for each gender) and sorts them by salary.
 */
class GenderColumn extends Column {
    /**
     * Constructor for the GenderColumn Class
     * Initializes the gender column by calling the parent constructor and setting up gender-specific data.
     * 
     * @constructor
     * @param {int} index - The index of the column in the grid.
     * @param {int} totalColumns - The total number of columns in the grid.
     */
    constructor(index, totalColumns) {
        super(index, totalColumns); // Call the parent constructor to initialize base properties
        this.points = employees.filter(e => e.gender === genders[index]); 
        this.sortTimes = { bubble: 0, inBuilt: 0, merge: 0 }; 
    }

    /**
     * Method to render the gender column.
     * This method calls the base class render methods and displays the gender label at the top.
     */
    render() {
        this.renderBase(); 
        this.displayBaseText(genders[this.index]); 
    }

    /**
     * Method to assign random colors to different job roles.
     * This method generates a color for each unique job role to be used in visualization.
     * 
     * @returns {Object} - A mapping of job roles to assigned colors.
     */
    assignJobRoleColors() {
        let uniqueRoles = [...new Set(employees.map(e => e.jobRole))]; 
        let roleColors = {}; 
        uniqueRoles.forEach((role, i) => {
            roleColors[role] = color(random(50, 255), random(50, 255), random(50, 255), 150);
        });
        return roleColors; 
    }

    /**
     * Method to plot the points (employees) on the screen.
     * Employees are plotted in two circles, one for each gender, with positions based on years of experience and salary.
     */
    plotPoints() {
        let centerMaleX = width / 4; // Center of the male circle
        let centerFemaleX = (3 * width) / 4; // Center of the female circle
        let centerY = height / 2; // Same vertical center for both circles
        let maxRadius = min(width, height) / 2; // Maximum radius for the circles
    
        // Find the CEO and place them at the center of the male column
        let ceo = this.points.find(p => p.jobRole === "Chief Executive Officer" && p.gender === "Male");
        
        // Remove the CEO from the points array for regular distribution
        let remainingPoints = this.points.filter(p => p !== ceo);
    
        // Calculate the maximum salary excluding the CEO
        let maxSalary = max(remainingPoints.map(p => p.salary)); // Maximum salary from the remaining points
    
        // Plot the CEO at the center of the male column
        if (ceo) {
            let ceoSize = 20; // Size for the CEO point
            let ceoX = centerMaleX;
            let ceoY = centerY;
            fill(255, 0, 0, 200); 
            ellipse(ceoX, ceoY, ceoSize, ceoSize); 
            this.displayTooltip(ceo, ceoX, ceoY);
        }
    
        // Evenly distribute the remaining points around the circle
        let totalPoints = remainingPoints.length;
        let angleStep = TWO_PI / totalPoints;
        
        for (let i = 0; i < totalPoints; i++) {
            let point = remainingPoints[i];
        
            // Determine circle center based on gender
            let centerX = point.gender === "Male" ? centerMaleX : centerFemaleX;
        
            // Map salary to radius and apply zoom
            let r = map(point.salary, 0, maxSalary, 200, maxRadius) * zoom;
        
            // Map years of experience to angle for distribution
            let theta = map(point.yearsExp, 0, 40, 0, TWO_PI * 3);
        
            // Directly apply zoom to the position of the points
            let x = centerX + r * cos(theta);
            let y = centerY + r * sin(theta);
        
            let size = this.sorted ? 15 + sin(this.animationTimer * 0.1 + i) * 5 : 10;
    
            // Set color based on gender
            let pointColor = point.gender === "Male" ? color(135, 206, 235, 150) : this.baseColor; // Blue for male, base color for others
        
            // Check for hover and display tooltip
            if (dist(mouseX, mouseY, x, y) < size / 2) {
                fill(255, 255, 100, 200);
                ellipse(x, y, size * 1.5, size * 1.5);
                this.displayTooltip(point, x, y);
            } else {
                fill(pointColor);
                ellipse(x, y, size, size);
            }
        }
        
        if (this.sorted) {
            this.animationTimer++;
            if (this.animationTimer > 100) {
                this.sorted = false;
            }
        }
    }
    
    /**
     * Method to display a tooltip when hovering over a point.
     * The tooltip shows detailed information about the employee (job role, years of experience, salary).
     * 
     * @param {Object} point - The employee data to be displayed in the tooltip.
     * @param {int} x - The x position of the point.
     * @param {int} y - The y position of the point.
     */
    displayTooltip(point, x, y) {
        let lines = [
            `Role: ${point.jobRole}`, 
            `Years Exp: ${point.yearsExp}`, 
            `Salary: $${point.salary.toFixed(2)}` 
        ];

        textSize(12); 
        let textWidthMax = Math.max(...lines.map(line => textWidth(line))) + 20; 
        let textHeight = lines.length * 16; 

        fill(30, 200); 
        rect(x + 10, y - textHeight - 10, textWidthMax, textHeight + 10, 5); 

        fill(255); 
        textAlign(LEFT, TOP); 
        for (let i = 0; i < lines.length; i++) {
            text(lines[i], x + 15, y - textHeight + i * 16); 
        }
    }

    /**
     * Method to sort the points (employees) based on the specified sorting method.
     * It sorts the points by salary using different sorting algorithms.
     * 
     * @param {String} method - The sorting method to use ("bubble", "inBuilt", "merge").
     */
    sortPoints(method) {
        if (method === "bubble") {
            this.sortTimes.bubble = Sorter.bubbleSort(this.points, "salary"); 
        } else if (method === "inBuilt") {
            this.sortTimes.inBuilt = Sorter.inBuiltSort(this.points, "salary"); 
        } else if (method === "merge") {
            let startTime = performance.now(); 
            this.points = Sorter.mergeSort(this.points, "salary"); 
            let endTime = performance.now(); 
            this.sortTimes.merge = endTime - startTime; 
        }
        this.sorted = true; 
        this.animationTimer = 0; 
    }

    /**
     * Method to display the sorting times for different algorithms.
     * This method shows the time taken by each sorting algorithm.
     */
    displaySortTimes() {
        fill(255); 
        textSize(14); 
        textAlign(LEFT); 
        text(
            `Bubble Sort: ${this.sortTimes.bubble.toFixed(2)} ms\nIn-built Sort: ${this.sortTimes.inBuilt.toFixed(2) } ms\nMerge Sort: ${this.sortTimes.merge.toFixed(2)} ms`,
            this.index * width / this.totalColumns + 10,
            height/2 
        );
    }
}
