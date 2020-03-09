#!/bin/bash

days=(d01 d02m d02a d03m)

for day in ${days[*]}; do
    echo "Testing $day"
    export PROJECT_PATH=../$day
    jest ${day}.spec.js
done
