
# Simple React File Uploader

Simple React File Uploader is a react component for uploading multiple or single file.


<p align="center">
  <img src="https://user-images.githubusercontent.com/33191954/37564723-ddb0fed6-2ac3-11e8-97b9-8f2150fc6e5c.png" alt="title"/>
</p>




# New Features!

  - Support drag and drop.
  - Single or multiple files.



>This component will only take a multiple file
> or single file from UI component and return a
> array 'onChange' event.




# Installation

```  $ npm i --save simple-react-file-uploader ```

            

# Use

```
import FileInput from 'simple-react-file-uploader';

export default class componentName extends Component {
render() {
    return (
    <FileInput 
      multiple={true}
      onChange = {this.handleChange}
      accept="image/*"
    />
        )
    }
}

```



### Props and description



| Props | Required/Optional | Description |
| ------ | ------ | ------ |
| onChange | required | props accepts a function. Function is called when file are added or removed.
| multiple | optional | Props accepts boolean value. If true multiple files are accepted else single file accepted. By default its false.
| accept | optional | Provide a accepted file type list.
|className| optional| this props is used to pass a className to a parent div of component.




### Development



### Todos

 - Feedback

License
----

MIT


