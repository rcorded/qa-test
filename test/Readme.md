# UI Automation Testing - SauceDemo

This repository contains an automated UI testing framework for the [SauceDemo](https://www.saucedemo.com/) website, created as a test assignment.

The project is built using **WebdriverIO** and implements the **Page Object Model (POM)** design pattern to ensure code maintainability, reusability, and readability.

## Tech Stack
* **Language:** JavaScript (Node.js)
* **Framework:** WebdriverIO (WDIO)
* **Architecture:** Page Object Model (POM)

## Test Scenarios Covered
The test suite covers 9 End-to-End test cases:
1. Valid Login
2. Login with invalid password
3. Login with locked out test login
4. Logout
5. Saving the card after logout 
6. Sorting
7. Footer Links
8. Valid Checkout
9. Checkout without products

See more details about the test scripts:  [TestCases](https://testluxequality.sharepoint.com/:x:/s/Mentors/IQDSigHUDO7kRoHRvsxaHl3RAWEqNxoP2EZQF-lmgtYpi7k?rtime=47Vun5Sz3kg)

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites
Make sure you have Node.js installed on your computer. You can check this by running `node -v` in your terminal.

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/rcorded/qa-test.git
   ```
2. Run all the tests:
   ```bash
   npx wdio run wdio.conf.js
   ```
3. Run a specific test case (for example, Test Case 1):
   ```bash
    npx wdio run wdio.conf.js --spec test/specs/login.valid.test1.js
   ```
