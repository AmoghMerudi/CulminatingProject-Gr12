class Search {
    constructor(data) {
        this.data = data; // Original dataset
        this.results = []; // Stores filtered results
        this.runtimeAnalysis = ""; // Stores runtime analysis
    }

    // Linear search to filter employees based on Job Role
    linearSearch(query) {
        let start = millis(); // Start time
        this.results = this.data.filter(employee => {
            let jobRole = employee.jobRole ? employee.jobRole.trim().toLowerCase() : "";
            return jobRole.includes(query.toLowerCase());
        });
        let time = millis() - start; // End time
        this.runtimeAnalysis = `Linear Search Time: ${time.toFixed(2)} ms | Results Found: ${this.results.length}`;
        console.log(this.runtimeAnalysis); // Log runtime analysis
        return this.results;
    }
}
