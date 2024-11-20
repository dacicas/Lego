# Lego QA Automation Interview Project 

## Project Description

This is my attempt to fulfill the interview requirement of creating a automation project for the LEGO QA  automation role. 

A bit of background. I have more experience in automation with Selenium, Java, cucumber and Serenity BDD.  This project proved challenging for me because I had no experience in Playwright and JS/TS.  So I ended up learning as much as needed to get it to the finish line.  
## Challenges I faced:
I tried to use Java and Page Object Modal initially but after learning more about Playwright doing it this way seems counterproductive as Playwright makes writting test scripts straighforward, so making quick tests looks like the right choice. 

I tried implementing fixtures as that’s the way POM is done in Playwright but I couldn’t get it to work, I assume it was something to do with a configuration somewhere somehow that made importing pages from the project not working.  So I decided that making the tests as scripts as Playwright intended was the way forward. 

## Setup

Have node.js (version 20.13.1) and npm (version 10.5.2) installed.

Install playwright by using this command in your CLI `npm init playwright@latest` 

Download my project in a folder locally.

## Running

To run my tests, open a terminal in the root directory of the project and run the following commands:

`npx playwright test`  (This runs the test in headless mode)

`npx playwright test --headed` (This runs  the test in headed mode so  you can see the tests as they run)

`npx playwright show-report` (this shows a basic html report of the tests )

`npx playwright test - -ui` (This runs the tests in UI mode,  allows for good debugging )  


## Future consideration:
Given more time, I would have liked to implement Page Object Model using fixtures and figure out the best way to handle internationalization.  

As for the Progressive Web App question, I don’t have enough experience with them to provide an answer and just googling/chat-GPT-ing an answer to this question seems too dishonest for me.   
