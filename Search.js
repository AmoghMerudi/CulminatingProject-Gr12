/**
 * The Search class is responsible for performing search operations on employee data.
 * It supports linear search functionality and tracks the time it takes to perform the search.
 */
class Search {
    /**
     * Constructor for the Search class.
     * Initializes the search object with data and sets up the results and runtime analysis.
     * 
     * @constructor
     * @param {Array} data - The employee data to be searched.
     * @param {array} results - The list of employees whose job role matches the search query.
     * @param {string} runtimeAnalysis - The runtime analysis of the search operation.
     */
    constructor(data) {
        this.data = data;
        this.results = []; 
        this.runtimeAnalysis = ""; 
    }

    /**
     * Method to perform a linear search on the employee data based on job role.
     * This method filters the employee data and finds all employees whose job role includes the search query.
     * 
     * @param {String} query - The search query (job role keyword) to look for.
     * @returns {Array} - The list of employees whose job role matches the search query.
     */
    linearSearch(query) {
        let start = millis(); 
        
        // Filter the employee data to find job roles that include the query
        this.results = this.data.filter(employee => {
            let jobRole = employee.jobRole ? employee.jobRole.trim().toLowerCase() : ""; // Normalize job role to lowercase
            return jobRole.includes(query.toLowerCase()); 
        });

        let time = millis() - start; 
        this.runtimeAnalysis = `Linear Search Time: ${time.toFixed(2)} ms | Results Found: ${this.results.length}`; 
        console.log(this.runtimeAnalysis); 
        
        return this.results; 
    }
}
