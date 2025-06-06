#!/bin/bash

# Check if commit message is provided
# if [ -z "$1" ]; then
#   echo "You must provide a commit message."
#   exit 1
# fi

# Add all changes
git add .

# Commit with the provided message
read -p "Enter commit message: " commit_message
if [ -z "$commit_message" ]; then
  echo "You must provide a commit message."
  exit 1
fi
git commit -m "$commit_message"

# Ask user if they want to push
branch=$(git rev-parse --abbrev-ref HEAD)
read -p "Do you want to push to the current branch($branch)? (y/N): " answer

if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  branch=$(git rev-parse --abbrev-ref HEAD)
  git push origin "$branch"
  echo "Changes pushed to $branch."
else
  echo "Changes committed locally. Not pushed."
fi