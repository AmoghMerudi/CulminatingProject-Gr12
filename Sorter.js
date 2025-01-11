class Sorter {
    static bubbleSort(array, key) {
        let startTime = performance.now();
        let n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (array[j][key] > array[j + 1][key]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }
        let endTime = performance.now();
        return endTime - startTime;
    }

    static inBuiltSort(array, key) {
        let startTime = performance.now();
        array.sort((a, b) => a[key] - b[key]);
        let endTime = performance.now();
        return endTime - startTime;
    }

    static mergeSort(array, key) {
        if (array.length <= 1) return array; // Base case

        let mid = Math.floor(array.length / 2);
        let left = array.slice(0, mid);
        let right = array.slice(mid);

        // Recursive calls to sort left and right halves
        left = Sorter.mergeSort(left, key);
        right = Sorter.mergeSort(right, key);

        // Merge the sorted halves
        return Sorter.merge(left, right, key);
    }

    static merge(left, right, key) {
        let result = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            if (left[i][key] <= right[j][key]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        // Append remaining elements
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
}
