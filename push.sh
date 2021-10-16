#!/bin/bash

git add .

git commit -m "'$1'"

git push

git push heroku main

wait 10000

heroku logs