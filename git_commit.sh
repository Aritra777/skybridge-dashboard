#!/bin/bash

# Check if working tree is clean
if git diff --quiet && git diff --cached --quiet; then
  # No changes to commit, check for unpushed commits
  branch=$(git rev-parse --abbrev-ref HEAD)
  # Check if local branch is ahead of remote
  ahead=$(git rev-list --count origin/$branch..$branch)
  if [ "$ahead" -gt 0 ]; then
    read -p "You have $ahead unpushed commit(s). Do you want to push to $branch? (y/N): " answer
    if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
      git push origin "$branch"
      echo "Changes pushed to $branch."
    else
      echo "No action taken."
    fi
  else
    echo "Nothing to commit or push."
  fi
  exit 0
fi

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
  git push origin "$branch"
  echo "Changes pushed to $branch."
else
  echo "Changes committed locally. Not pushed."
fi