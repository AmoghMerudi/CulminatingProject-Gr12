/**
 * Class for representing a column in a sorting visualization.
 * Each column corresponds to a visual element in the grid, with properties to manage its position, appearance, and state.
 */
class Column {
    /**
     * Constructor for the Column Class
     * Initializes the column's properties such as index, total number of columns, colors, and sorting state.
     * 
     * @constructor
     * @param {int} index - The index of the column in the grid.
     * @param {int} totalColumns - The total number of columns in the grid.
     * @param {boolean} sorted - Flag to indicate if the column has been sorted.
     * @param {int} animationTimer - Timer for handling animations or delays in sorting.
     * @param {color} baseColor - Base color for the column (RGBA format).
     * @param {color} targetColor - Target color for the column when it's in a sorted state (RGBA format).
     */
    constructor(index, totalColumns) {
        this.index = index; 
        this.totalColumns = totalColumns; 
        this.sorted = false; 
        this.animationTimer = 0; 
        this.baseColor = color(200, 100, 150, 150); 
        this.targetColor = color(100, 200, 250, 150); 
    }

    /**
     * Method to render the base of the column.
     * This method draws the column as a rectangle on the screen.
     */
    renderBase() {
        fill(50); 
        noStroke(); 
        rect(this.index * width / this.totalColumns, 0, width / this.totalColumns, height);
    }

    /**
     * Method to display text on top of the column.
     * This method places a label (e.g., column index or other information) at the top of the column.
     * 
     * @param {String} label - The label to be displayed above the column.
     */
    displayBaseText(label) {
        fill(255); 
        textSize(20);
        textAlign(CENTER, CENTER); 
        text(label, this.index * width / this.totalColumns + width / (2 * this.totalColumns), 30);
    }
}
