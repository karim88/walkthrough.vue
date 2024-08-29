# @ouladck/walkthrough-vue

**@ouladck/walkthrough-vue** is a lightweight, customizable Vue.js plugin that provides an interactive walkthrough experience for your Vue applications. Built with TypeScript and SCSS, this plugin allows you to guide users through key features and elements of your app, enhancing their understanding and engagement.

[![Demo](https://img.youtube.com/vi/GSDM0J3Yh3k/0.jpg)](https://youtu.be/GSDM0J3Yh3k)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Basic Setup](#basic-setup)
    - [Template Structure](#template-structure)
    - [SCSS Styling](#scss-styling)
- [Configuration](#configuration)
    - [Example Configuration](#example-configuration)
- [API](#api)
- [Customization](#customization)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the plugin via npm:

```bash
npm i @ouladck/walkthrough-vue
```

Alternatively, you can use the plugin directly from the dist folder by including the JavaScript and CSS files in your project:
```html
<link rel="stylesheet" href="path/to/dist/style.css">
<script src="path/to/dist/walkthrough.umd.js"></script>
```

Or from the source code [here](https://github.com/ouladck/walkthrough-vue)

## Usage

### Basic Setup

First, import and register the plugin in main.ts

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import Walkthrough from "@ouladck/walkthrough-vue";

const app = createApp(App)
app.use(Walkthrough) // Register the plugin
app.mount('#app')
```

Then import and initialize the walkthrough in your Vue component:

```vue
<script setup lang="ts">
import walkthrough, { type Options, type Step } from '@ouladck/walkthrough-vue';
import { reactive } from 'vue';

const steps = reactive<Step[]>([
  {
    element: '#step1',
    content: 'Welcome to the first step of our guided tour.',
  },
  // Add more steps here
]);

const options = reactive<Options>({
  prevText: 'Previous',
  nextText: 'Next',
  finishText: 'Finish',
});

const startWalkthrough = () => {
  walkthrough.init(options, steps);
};
</script>
```

### HTML Structure

Ensure your template elements are structured correctly to be targeted by the walkthrough:

```vue
<template>
  <div id="step1">Welcome to the interactive guide.</div>
  <div id="step2">Here's a key feature of our website.</div>
  <!-- More elements -->
  <button @click="startWalkthrough">Start Walkthrough</button>
</template>
<!-- More elements -->
```

### SCSS Styling

The plugin uses SCSS for custom styles. You can include the provided style.css in your project or import the SCSS files from source code directly to customize the styles:
```css
@import 'path/to/plugin/src/styles.css';
```

## Configuration
You can configure the walkthrough with the following options:
* `nextText`: (string, optional) customize the Next button text in the step.
* `prevText`: (string, optional) customize the Previous button text in the step.
* `finishText`: (string, optional) customize the Finish button text in the step.

And you can configure each step in the walkthrough with the following options:
* `selector`: (string) The CSS selector of the element to highlight.
* `content`: (string) The content to display in the modal or tooltip.
* `nextText`: (string, optional) customize the Next button text in the step.
* `prevText`: (string, optional) customize the Previous button text in the step.
* `finishText`: (string, optional) customize the Finish button text in the step.
* `nextCallback`: (function, optional) A function to call when the next button is clicked.
* `prevCallback`: (function, optional) A function to call when the previous button is clicked.


### Example Configuration
```typescript
const steps = reactive<Step[]>([
    {
        element: '#step1',
        content: 'Welcome to our site! Let’s start with the basics.',
    },
    {
        element: '#step2',
        content: 'This is a key feature you should know about.',
        nextCallback: () => console.log('Step 2 completed!'),
    },
]);
```

## Customization

The appearance of the walkthrough can be easily customized via SCSS. Key classes you might want to style include:

* `.walkthrough-modal`
* `.walkthrough-content`
* `.walkthrough-close-container`
* `.walkthrough-highlight`
* `.walkthrough-buttons`
* `#walkthrough-steps`
* `.walk-through-start button`

For example:

```scss
.walkthrough-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
```

## Examples
Here’s an example of the walkthrough in action:

```typescript
const steps = reactive<Step[]>([
  {
    element: '#step1',
    content: 'Start here!',
  },
  {
    element: '#step2',
    content: 'Next, check out this feature.',
  },
  {
    element: '#step3',
    content: 'Finally, see how everything works together.',
  },
]);

const startWalkthrough = () => {
  walkthrough.init({}, steps);
};
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements. Make sure to follow the existing code style and include tests for any new features or bug fixes.

# License
This project is licensed under the MIT License. See the LICENSE file for details.