<#
Helper script to initialize a local git repo and push to a remote GitHub repository.
Usage: Open PowerShell in the project folder and run:
  .\publish-to-github.ps1

The script will ask for the remote URL (HTTPS or SSH).
#>

param()

Write-Host "Publish helper: will initialize git (if needed), commit, and push to remote."

# Check if git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "git is not installed or not in PATH. Install Git first: https://git-scm.com/downloads"
    exit 1
}

# Initialize repo if not already
$gitDir = Join-Path -Path (Get-Location) -ChildPath ".git"
if (-not (Test-Path $gitDir)) {
    git init
    Write-Host "Initialized a new git repository."
}

# Add all and commit if there are changes
$status = git status --porcelain
if ($status) {
    git add .
    git commit -m "Initial commit"
    Write-Host "Committed local changes."
} else {
    Write-Host "No changes to commit."
}

# Ask for remote URL
$remote = Read-Host "Enter remote repository URL (HTTPS or SSH)"
if (-not $remote) {
    Write-Error "Remote URL is required."
    exit 1
}

# Add remote if missing
$existing = git remote get-url origin 2>$null
if (-not $existing) {
    git remote add origin $remote
    Write-Host "Added remote origin: $remote"
} else {
    Write-Host "Remote origin already exists: $existing"
}

# Ensure main branch and push
git branch -M main
git push -u origin main

Write-Host "Push completed. Verify your repo on GitHub."