/* =====================
# Lab 2, Part 2 — Underscore Analyze

## Introduction

Let's revisit the bike share data from Week 2 Lab 1, Part 4. Remember, each array contains the following:

1. lng
2. lat
3. label
4. number of bike share docks at the station

## Task 1

We're especially interested in number 4: number of bike share docks at the station.

Using underscore functions, generate a list of all bike share docks that are greater than 20. One
way to do this is by using _.filter, but you can try other solutions as well. Set your answer to
variable "largeStationList".

## Task 2

Let's say we only care about the final count of bike share locations with more than 20 docks.
Calculate the value by using _.countBy and set your answer to variable "largeStationCount".
===================== */

var data = bikeArrayClean;

var filter = function(array, func) {
    newarray = [];
    for (i = 0; i < array.length; i++ ){
      if (func(array[i])) { newarray.push(array[i]); }
    }
    return newarray;
};

var largerthan20 = function(list) {if (list[3]>20) {return true} else {return false}};

var largeStationList = filter(data, largerthan20);

var largeStationCount = _.countBy(data, largerthan20);

console.log(largeStationList);

console.log(largeStationCount);
