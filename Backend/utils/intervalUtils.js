/**
 * Merges overlapping intervals into unique non-overlapping intervals
 * For example: [[0, 10], [5, 15], [20, 25]] becomes [[0, 15], [20, 25]]
 */
export const mergeIntervals = (intervals) => {
  if (intervals.length <= 1) {
    return intervals;
  }

  // Sort intervals by start time
  const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);

  const result = [sortedIntervals[0]];

  for (let i = 1; i < sortedIntervals.length; i++) {
    const currentInterval = sortedIntervals[i];
    const lastMergedInterval = result[result.length - 1];

    // If current interval overlaps with the last merged interval, merge them
    if (currentInterval[0] <= lastMergedInterval[1]) {
      lastMergedInterval[1] = Math.max(
        lastMergedInterval[1],
        currentInterval[1]
      );
    } else {
      // No overlap, so add the current interval to result
      result.push(currentInterval);
    }
  }

  return result;
};

/**
 * Calculates the total unique time watched from a set of intervals
 * Returns the progress as a percentage of the total duration
 */
export const calculateProgress = (intervals, duration) => {
  if (!intervals.length || !duration) {
    return 0;
  }

  // Merge any overlapping intervals first
  const mergedIntervals = mergeIntervals(intervals);

  // Calculate the sum of all interval durations
  const totalWatched = mergedIntervals.reduce(
    (sum, [start, end]) => sum + (end - start),
    0
  );

  // Calculate progress as a percentage
  const progressPercentage = (totalWatched / duration) * 100;

  // Cap at 100% and ensure we don't return negative values
  return Math.min(100, Math.max(0, progressPercentage));
};
