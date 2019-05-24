# Power Putty Test

Scaffolds out proper testing dependencies and structure

* Test running with `mocha`
* Assertions with `chai` 
* Promise support with `chai-as-promised`
* Mocking with `TODO`
* Drive a folder structure

# Folder Structure 

The convention `power-putty-test` suggests is to split up tests by use case/intention. 

* unit -- Unit tests against a specific component's input/outputs
* integration -- Integration tests of how two components interact
* systems -- System tests against a full stack of functionality
* acceptance -- Customer acceptance tests. These will not be included for this project

The unit tests folder should reflect your source folder -- for a given component 
`[root]/components/Foo`, you would have `test/components/Foo`.

The other tests can reflect their semantic meaning for your project

