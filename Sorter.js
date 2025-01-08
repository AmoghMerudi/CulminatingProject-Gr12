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
}
