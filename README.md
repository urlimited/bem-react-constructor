This repository is created in order to provide constructor for BEM in terms of React.
#### Usage example:
Within the instructions below we use the following file structure:
    
    .
    ├── src                             # Source files (alternatively `lib` or `app`)
    │   ├── application
    │   │   ├── consumers
    │   │   │   └── homepage.jsx
    │   │   └── templates               # This directory contains all BEM blocks
    │   │       ├── section
    │   │       │   ├── section.jsx     # This main file in the section BEM block
    │   │       │   └── styles.css      # Other file that is used with section BEM block
    │   │       └── button              
    │   │           ├── button.jsx      # This main file in the anchor BEM block
    │   │           └── button.css      # Other file that is used with anchor BEM block
    │   └── core
    └── package.json


> Note: it is not obligatory in terms of this lib to use specifically 
> folder structure above, you can use any namings in accordance with
> BEM naming methodology, BUT it is obligatory to name the main file 
> in the BEM block folder as the BEM block (section -> section.jsx)

1. In your <code>package.json</code>, please add the following script into <code>scripts</code> section:
    ```json
       {
           "scripts": {
               "extract": "node ./node_modules/bem-react-constructor/src/extractScript.js"
           }
       }
    ```
2. Run into your terminal within project root directory `npm run extract ./src/application/templates`
 (according to the folder structure above)
    > Note: everytime you add a new block, or change existing name of the block, 
    you need to re-run `npm run extract ./src/application/templates` script

3. Please, check files `dynamicRequire.js` and 
`elementsDeclaration.json` are available in `src/application/templates` (whatever 
you used as a third parameter in the previous step). If not, please go to the step 2 and double-check your 
third parameter.

4. Now you are able to use the code by the following way:
    
    ```js
    // homepage.jsx (according to the file structure above)
    
    import React from "react";
    import TemplateBuilder from "templateBuilder/src/templateBuilder.js";
    
    
    export const Homepage = () => {
       const data = [
           {
               type: "section",
               header: "BEM methodology",  // custom parameter
               children: [
                   {
                       type: "button",
                       title: "Cick 1",
                       clickHandler: () => console.log('clicked button 1')
                   },
                   {
                       type: "button",
                       title: "Cick 2",
                       clickHandler: () => console.log('clicked button 2')
                   }
               ],
               isFullPage: true,           // custom parameter
               background: '#cecece'       // custom parameter
           },
           {
               type: "section",
               header: "Something else",   // custom parameter
               isFullPage: false,          // custom parameter
               background: '#ababab'       // custom parameter
           }
       ];
    
       return (<>{TemplateBuilder.getInstance({
              elementsDeclarationFile: require('../templates/elementsDeclaration.json'),
              dynamicRequireFile: require('../templates/dynamicRequire.js')
          }).build(data)}</>);
    }
    ```
    In `section.jsx`:
    ```js
    // section.jsx (according to the file structure above)
   
    import React, {useEffect, useState} from "react";
    import "./section.css";
    
    
    export const Section = ({isFullPage, header, background, content, children}) => {
        const [height, setHeight] = useState('200px');
    
        useEffect(() => {
            if (isFullPage)
                setHeight(window.innerHeight || document.documentElement.clientHeight ||
                    document.body.clientHeight + 'px');
        }, [isFullPage]);
    
        return (<div className="section" style={{background, height}}>
            <div className="section__content">
                <p className="section__header">{header}</p>
                {content ?? <></>}
                {children.map((c, k) => <div key={k}>{c}</div>)}
            </div>
        </div>);
    }
    
    export default Section;
    ```
    >Note: please, put attention, that you need to export default for the current module, in the future it will be fixed in future versions

    In `button.jsx`:
    ```js
    // button.jsx (according to the file structure above)
   
    import React from "react";   
    import "./button.css";
    
    
    export const Button = ({title, clickHandler}) => {
        return (<button className="hero__button-test button" 
                  onClick={clickHandler}>{title}</button>);
    }
    
    export default Button;
    ```
   
#### Available parameters for data configuration:
| Parameter name  | Description | Is obligatory |
| :--- | :---------- | ---------: |
| type  | is responsible for BEM block type |true|
| children | nested elements, which you should nest by yourself | false |

#### Disclaimer:
This library does not have any relation with yandex/bem-react. I use it for myself, 
but I can see that people search it and download it. I lead the development on it in solo
if you would like to take participation, please contact me via the email "maxim.tsoy.cv@gmail.com".
I will try to do my best in terms of documenting this library. Please check updates on a week base 
