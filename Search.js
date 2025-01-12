class Search {
    constructor(data) {
        this.data = data; 
        this.results = []; 
        this.runtimeAnalysis = ""; 
    }

    linearSearch(query) {
        let start = millis(); 
        this.results = this.data.filter(employee => {
            let jobRole = employee.jobRole ? employee.jobRole.trim().toLowerCase() : "";
            return jobRole.includes(query.toLowerCase());
        });
        let time = millis() - start; 
        this.runtimeAnalysis = `Linear Search Time: ${time.toFixed(2)} ms | Results Found: ${this.results.length}`;
        console.log(this.runtimeAnalysis); 
        return this.results;
    }
}
