# ivy

Repository for new RIT IVCF website

All development should be done on branches off of the "development" branch.
Committing to "master" is highly discouraged with the exception of merges for releasing updates to the production version.

Development should be done with Python 3 and Django 1.9

Python 3 does not allow mixing of tabs and spaces for indentation in the same file, so for consistency, please set up your editor to use spaces.

For security reasons, certain settings are not being stored in the repo (DEBUG, SECRET_KEY, and in the future, the database login info).
These settings have been pulled out of settings.py and will be read out of an untracked file called settings.json. 
A template for how this file should look is available in settingsTemplate.json. Fill it in and rename it to run the site.
