# leonardo ui

The following project would have a been a great candidate for the new Amplify suite as it would've covered graphql, hosting and Auth. 

The UI was built using

  - NextJS
  - Chakra for UI components
  - Amplify for Auth capabilities
    - for persisting user data, cognito fields were used so no database was required
    - forgot password is yet to be implemented
  - Apollo for graphql
  - Form validation was done manually to reduce package dependencies
  - the API wasn't deployed/wired up due to setting up the database hosting in AWS

Structure

  - components
    - all modal and ui components
  - icons
    - wrapped tablr icons fro chakra
  - interfaces
    - user interface for the user context
  - providers
    - user and chakra providers

