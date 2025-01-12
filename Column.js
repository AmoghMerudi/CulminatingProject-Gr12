class Column {
    constructor(index, totalColumns) {
        this.index = index;
        this.totalColumns = totalColumns;
        this.sorted = false;
        this.animationTimer = 0;
        this.baseColor = color(200, 100, 150, 150); 
        this.targetColor = color(100, 200, 250, 150); 
    }

    renderBase() {
        fill(50);
        noStroke();
        rect(this.index * width / this.totalColumns, 0, width / this.totalColumns, height);
    }

    displayBaseText(label) {
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(label, this.index * width / this.totalColumns + width / (2 * this.totalColumns), 30);
    }
}