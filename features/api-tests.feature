
Feature: JSONPlaceholder API validation

  Scenario: Create a post with a valid request
    When I send a valid create post request
    Then the API response status should be 201
    And the response should contain the created post details

  Scenario: Create a post with an excessively long title
    When I send a create post request with an excessively long title
    Then the API should respond without a server error

  Scenario: Create a post with special characters
    When I send a create post request with special characters
    Then the API should respond without a server error

  Scenario: Create a post without userId
    When I send a create post request without userId
    Then the API should respond without a server error
