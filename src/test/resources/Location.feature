Feature: Location CRUD

  Background: Backend and Frontend are up

  Scenario: Create new location
    Given DB connection is up
    When api receive new location request
    Then response return with 200 status code
    And location is created in DB