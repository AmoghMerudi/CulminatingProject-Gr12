class Sorter {
    /**
     * Bubble Sort algorithm to sort the array based on a specific key.
     * 
     * @param {Array} array - The array to be sorted.
     * @param {string} key - The key to sort the objects in the array by.
     * @returns {number} - The time taken to perform the sorting in milliseconds.
     */
    static bubbleSort(array, key) {
        let startTime = performance.now(); // Record the start time for performance analysis
        let n = array.length;

        // Bubble Sort algorithm: Repeatedly compare and swap adjacent elements
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (array[j][key] > array[j + 1][key]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap the elements if out of order
                }
            }
        }

        let endTime = performance.now(); // Record the end time after sorting
        return endTime - startTime; // Return the time taken to sort the array
    }

    /**
     * Built-in sort function to sort the array based on a specific key.
     * 
     * @param {Array} array - The array to be sorted.
     * @param {string} key - The key to sort the objects in the array by.
     * @returns {number} - The time taken to perform the sorting in milliseconds.
     */
    static inBuiltSort(array, key) {
        let startTime = performance.now(); // Record the start time for performance analysis
        array.sort((a, b) => a[key] - b[key]); // Use JavaScript's built-in sort function
        let endTime = performance.now(); // Record the end time after sorting
        return endTime - startTime; // Return the time taken to sort the array
    }

    /**
     * Merge Sort algorithm to recursively sort the array based on a specific key.
     * 
     * @param {Array} array - The array to be sorted.
     * @param {string} key - The key to sort the objects in the array by.
     * @returns {Array} - The sorted array.
     */
    static mergeSort(array, key) {
        if (array.length <= 1) return array; // Base case: An array of length 1 is already sorted

        let mid = Math.floor(array.length / 2); // Find the middle index
        let left = array.slice(0, mid); // Split the array into left half
        let right = array.slice(mid); // Split the array into right half

        // Recursively sort the left and right halves
        left = Sorter.mergeSort(left, key);
        right = Sorter.mergeSort(right, key);

        // Merge the sorted halves
        return Sorter.merge(left, right, key);
    }

    /**
     * Helper function to merge two sorted arrays into a single sorted array.
     * 
     * @param {Array} left - The left sorted array.
     * @param {Array} right - The right sorted array.
     * @param {string} key - The key to sort the objects in the arrays by.
     * @returns {Array} - The merged and sorted array.
     */
    static merge(left, right, key) {
        let result = []; // Array to hold the merged result
        let i = 0, j = 0;

        // Merge the two sorted arrays
        while (i < left.length && j < right.length) {
            if (left[i][key] <= right[j][key]) {
                result.push(left[i]); // Add the smaller element from the left array
                i++;
            } else {
                result.push(right[j]); // Add the smaller element from the right array
                j++;
            }
        }

        // Append any remaining elements from the left or right array
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
}
