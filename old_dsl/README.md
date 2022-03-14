# bdd-dsl

DSL for Behaviour-Driven Development

## Development

The BDD DSL is developed using Eclipse and the Xtext framework. To get started, perform the following steps:

- install (or download and unzip) the Eclipse DSL package
- clone this repository
- start Eclipse on a new workspace
- invoke the **General > Existing Projects into Workspace** wizard
- select the newly cloned repository as the root folder and select all the projects

The no.hal.bdd.xtext project is the main project, containing the DSL grammar and custom DSL logic.

## Trying out the DSL

To try the DSL, you need to launch another Eclipse instance from the development environment with the DSL included:

- invoke **Run > Run Configurations...**
- if there isn't already an **Eclipse Application** launch configuration, create one, and launch it
- import using the **General > Existing Projects into Workspace** wizard, *but only* select the **no.hal.bdd.xtext.examples project**
- open **sample.bdd** in the **no.hal.bdd.xtext.examples** package in the **src** folder
