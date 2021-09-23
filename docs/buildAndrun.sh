#!/bin/bash

# this shell command is at use for run or build with a simple condition,
# build for give of possibility between just build file or build and run direct

read -p "you need : just Build and run press r --- just Build press b -- just simple run press s > " text

if [ $text = "r" ]

then

# build and run if you press r
yarn docs:build
yarn docs:dev

elif [ $text = "b" ]

then

# build only if you press b
yarn docs:build

elif [ $text = "s" ]

then
# run only if you press s

yarn docs:dev

else

echo "bad choose"

fi