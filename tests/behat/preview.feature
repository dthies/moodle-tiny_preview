@editor @editor_tiny @tiny @tiny_preview @_bug_phantomjs
Feature: Tiny preview editor button
  In order to use filters creatively
  I need to see what text is will look like when saved

  Background:
    Given the "emoticon" filter is "on"
    And I log in as "admin"
    And I open my profile in edit mode
    And I set the field "Description" to "Wink ;-) emoticon"

  @javascript @tiny_preview_content
  Scenario: Click preview look for image contents
    When I click on "Preview" "button"
    And I wait "3" seconds
    Then I should see "Wink" in the "Preview" "dialogue"
    And "wink" "icon" should exist in the "Preview" "dialogue"
