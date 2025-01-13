/**
 * Class representing an Employee.
 * This class is used to store information about an employee, including gender, years of experience, salary, and job role.
 */
class Employee {
    /**
     * Constructor for the Employee Class
     * Initializes the employee's properties such as gender, years of experience, salary, and job role.
     * 
     * @constructor
     * @param {String} gender - The gender of the employee (e.g., "Male", "Female", etc.)
     * @param {int} yearsExp - The number of years of experience the employee has.
     * @param {float} salary - The salary of the employee.
     * @param {String} jobRole - The job role or position of the employee (e.g., "Software Engineer", "Manager").
     */
    constructor(gender, yearsExp, salary, jobRole) {
        this.gender = gender; 
        this.yearsExp = yearsExp; 
        this.salary = salary; 
        this.jobRole = jobRole; 
    }
}
