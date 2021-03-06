
[![Build Status](https://travis-ci.com/ARRSeniorProject/gator-nexus.svg?branch=main)](https://travis-ci.com/ARRSeniorProject/gator-nexus)

# GatorNexus

This is a MERN Stack web application that gathers and displays demographic data on undergraduate computers science students.

### Team Members:

1. Abinai Pasunuri
2. Roberto Pantoja
3. Ricardo Golac


## Code Sources

We used code from Reactstrap to help build the front end of our website.

### Clone the project on to your local machine

1. Navigate to a directory on your local machine to store the project
2. Clone the repository: 'git clone <clone-link>'
3. Install the project dependencies: 'npm install' and 'npm client-install'; you could also cd into client and run 'npm install'

## Create your own working branch

1. Open a terminal and change into the repository directory
2. Get the most current version of the code: 'git pull origin master'
3. Create a new branch for your changes: 'git branch <branch_name>'
   - Please name your branch something indicative of what feature or change you're working on
4. Checkout the branch you created: 'git checkout <branch_name>'
5. Push your new branch to Github: 'git push --set-upstream origin <branch_name>'
6. You should see that a new branch was added to the repo on GitHub

### Make Changes

1. Open a terminal in the repository directory
2. Make sure you are on your branch: Execute 'git checkout <branch_name>'
3. Edit files, create files, delete files, etc
4. After each categorical change commit
   - git add -A
   - git commit -m "Description of changes"
   - git push origin <branch_name>

### Adding your changes to master

1. Open a terminal in the repository directory
2. Make sure you are on the master branch: 'git checkout master'
3. Get the most current version of master: 'git pull origin master'
4. Move over to your branch: 'git checkout <branch_name>'
5. Merge the master branch into your branch: 'git merge master'
   - These first few steps ensure that any recent updates to the master branch work with the changes you made
6. If everything is working properly, push your branch to GitHub: 'git push origin <branch_name>'
   - Else, work on fixing the given merge conflicts
7. Create a pull request on GitHub: Click 'New pull request'
   - Provide a good description of what changes you made
   - Submit your pull request
8. Wait for someone to review and approve your changes

### Changing Database and Server Connections

Add all database keys and tokens to a .env folder in the root folder.

Current Variables:
MONGO_URI 