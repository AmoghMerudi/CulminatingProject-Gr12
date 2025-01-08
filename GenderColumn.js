// GenderColumn inherits from Column
class GenderColumn extends Column {
    constructor(index, totalColumns) {
        super(index, totalColumns); // Call parent constructor
        this.points = employees.filter(e => e.gender === genders[index]);
        this.sortTimes = { bubble: 0, inBuilt: 0 };
    }

    render() {
        this.renderBase(); // Call base class method
        this.displayBaseText(genders[this.index]); // Call base class method
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
        let spacingFactor = 10;

        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            let x = map(
                point.yearsExp,
                0,
                40,
                this.index * width / this.totalColumns + 100,
                (this.index + 1) * width / this.totalColumns - 100
            );
            let y = map(
                point.salary,
                0,
                max(employees.map(e => e.salary)),
                height - 50,
                50
            );

            y += sin(i * spacingFactor) * 100;

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

    sortPoints(method) {
        if (method === "bubble") {
            this.sortTimes.bubble = Sorter.bubbleSort(this.points, "salary");
        } else if (method === "inBuilt") {
            this.sortTimes.inBuilt = Sorter.inBuiltSort(this.points, "salary");
        }
        this.sorted = true;
        this.animationTimer = 0;
    }

    displaySortTimes() {
        fill(255);
        textSize(14);
        textAlign(LEFT);
        text(
            `Bubble Sort: ${this.sortTimes.bubble.toFixed(2)} ms\nIn-built Sort: ${this.sortTimes.inBuilt.toFixed(2)} ms`,
            this.index * width / this.totalColumns + 10,
            height - 50
        );
    }
}
