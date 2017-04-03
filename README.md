# quickstart

## Quickstart with less and typescript.


### Usage

1. `npm install`.
2. Usage gulp tasks 'build' for create a prod version.

Your project clone to `_prod`.

css file  - /styles/common.css
js file - /scripts/common.js


### Less

Used **`CSS nesting by directory gulp plugin`** with npm module **gulp-css-nbd** v. 0.0.2


Part of Nest-CSS methodology.

Plugin for building very specific selectors by directory structure like: 

_(Number is a priority)_


src/
* 000_rules/
* 100_globals/
* 200_mixins/
* 300_text/
* 400_html/
* * html/
* * * &.less
* * * wrapper.less
* * * body/
* * * * &.less
* * * * wrapper.less

Result:

<pre><span class="pl-ent">html</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">header</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> <span class="pl-k">&gt;</span> <span class="pl-ent">h1</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> <span class="pl-k">&gt;</span> <span class="pl-ent">h2</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> <span class="pl-k">&gt;</span> <span class="pl-ent">h3</span>, <span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> <span class="pl-k">&gt;</span> <span class="pl-ent">h4</span> {}</pre>


### TypeScript

Main file `/scripts/main.ts`.

Gulp tasks `js` build your app.

Use a modular system src/modules/YOUR_MODULE_FILE.ts and src/classes/YOUR_EXPORT_CLASS.ts where one modules = one functional.
