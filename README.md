# @ouladck/walkthrough.js

**@ouladck/walkthrough.js** is a lightweight, customizable JavaScript plugin that provides an interactive walkthrough experience for your web application. Built with TypeScript and SCSS, this plugin allows you to guide users through key features and elements of your website, enhancing their understanding and engagement.

[![Demo](https://img.youtube.com/vi/23M9E-nFdcs/0.jpg)](https://youtu.be/23M9E-nFdcs)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API](#api)
- [Customization](#customization)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the plugin via npm:

```bash
npm i @ouladck/walkthrough.js
```

Or use it directly from the `dist folder by including the JavaScript and CSS files in your project:

```html
<link rel="stylesheet" href="path/to/dist/style.css">
<script src="path/to/dist/walkthrough.umd.js"></script>
```

## Usage

### Basic Setup

First, import and initialize the walkthrough in your JavaScript file:

```javascript
import Walkthrough from '@ouladck/walkthrough.js';

const steps = [
    {
        selector: '#step1',
        content: 'Welcome to the first step of our guided tour.',
    },
    // Add more steps here
];

Walkthrough.initWalkthrough(steps);
```

### HTML Structure

Make sure your HTML elements are structured correctly to be targeted by the walkthrough:

```html
<div id="step1">Welcome to the interactive guide.</div>
<div id="step2">Here's a key feature of our website.</div>
<!-- More elements -->
```

### SCSS Styling

The plugin uses SCSS for custom styles. You can include the provided `style.css in your project or import the SCSS files directly to customize:

```scss
@import 'path/to/plugin/src/styles.scss';
```

## Configuration

You can configure each step in the walkthrough with the following options:
* `selector`: (string) The CSS selector of the element to highlight.
* `content`: (string) The content to display in the modal or tooltip.
* `type`: (string, optional) Either `modal` or `tooltip`. Defaults to `modal.
* `callback`: (function, optional) A function to call when the step is displayed.

### Example Configuration
```javascript
const steps = [
    {
        selector: '#step1',
        type: 'modal',
        content: 'Welcome to our site! Let’s start with the basics.',
    },
    {
        selector: '#step2',
        type: 'tooltip',
        content: 'This is a key feature you should know about.',
        callback: () => console.log('Step 2 displayed!'),
    },
];
```

## API

`Walkthrough.initWalkthrough(steps: Step[])`
Initializes the walkthrough with a list of steps.

* steps: An array of step objects.

`Walkthrough.nextStep()`
Moves to the next step in the walkthrough.

`Walkthrough.prevStep()`
Moves to the previous step in the walkthrough.

Walkthrough.closeWalkthrough()`
Closes the walkthrough and removes highlights.

## Customization

The appearance of the walkthrough can be easily customized via SCSS. Key classes you might want to style include:

* `.walkthrough-modal`
* `.walkthrough-highlight`
* `.walkthrough-buttons`

For example:

```scss
.walkthrough-modal {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
```

## Examples
Here’s an example of the walkthrough in action:

```javascript
const steps = [
    {
        selector: '#step1',
        content: 'Start here!',
    },
    {
        selector: '#step2',
        content: 'Next, check out this feature.',
    },
    {
        selector: '#step3',
        content: 'Finally, see how everything works together.',
    },
];

Walkthrough.initWalkthrough(steps);
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements. Make sure to follow the existing code style and include tests for any new features or bug fixes.

# License
This project is licensed under the MIT License. See the LICENSE file for details.