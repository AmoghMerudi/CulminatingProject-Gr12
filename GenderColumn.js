class GenderColumn extends Column {
    constructor(index, totalColumns) {
        super(index, totalColumns); 
        this.points = employees.filter(e => e.gender === genders[index]);
        this.sortTimes = { bubble: 0, inBuilt: 0, merge: 0 };
    }

    render() {
        this.renderBase(); 
        this.displayBaseText(genders[this.index]); 
    }

    assignJobRoleColors() {
        let uniqueRoles = [...new Set(employees.map(e => e.jobRole))];
        let roleColors = {};
        uniqueRoles.forEach((role, i) => {
            roleColors[role] = color(random(50, 255), random(50, 255), random(50, 255), 150);
        });
        return roleColors;
    }

    plotPoints() {
        let centerMaleX = width / 4; 
        let centerFemaleX = (3 * width) / 4; 
        let centerY = height / 2; 
        let maxRadius = min(width, height) / 2; 
        let maxSalary = max(this.points.map(p => p.salary)); 
    
        let totalPoints = this.points.length;
        let angleStep = TWO_PI / totalPoints;
    
        for (let i = 0; i < totalPoints; i++) {
            let point = this.points[i];
    
            let centerX = point.gender === "Male" ? centerMaleX : centerFemaleX;
    
            let theta = map(point.yearsExp, 0, 40, 0, TWO_PI * 3);
    
            let r = map(point.salary, 0, maxSalary, 200, maxRadius);
    
            let x = centerX + r * cos(theta);
            let y = centerY + r * sin(theta);
    
            let size = this.sorted ? 15 + sin(this.animationTimer * 0.1 + i) * 5 : 10;
            let pointColor = this.sorted
                ? lerpColor(this.baseColor, this.targetColor, sin(this.animationTimer * 0.01 + i) * 0.5 + 0.5)
                : this.baseColor;
    
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

    displayTooltip(point, x, y) {
        resetMatrix(); 
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
        applyMatrix(); 
    }
    

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
    

    displaySortTimes() {
        fill(255);
        textSize(14);
        textAlign(LEFT);
        text(
            `Bubble Sort: ${this.sortTimes.bubble.toFixed(2)} ms\nIn-built Sort: ${this.sortTimes.inBuilt.toFixed(2) } ms\nMerge Sort: ${this.sortTimes.merge.toFixed(2)} ms`,
            this.index * width / this.totalColumns + 10,
            height / 2
        );
    }
}
