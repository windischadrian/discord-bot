#!/bin/bash

git add .

git commit -m "'$1'"

git push

git push heroku main

sleep(5000)

heroku logs