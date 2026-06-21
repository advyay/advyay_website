#!/bin/bash
# Auto publish script - adds, commits, and force-pushes to remote

# Stage all changes
git add .

# Commit with timestamp
git commit -m "Auto commit: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit."

# Force push to origin (current branch)
git push --force-with-lease origin HEAD