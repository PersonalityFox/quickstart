# quickstart

## Quickstart with less and typescript.

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

With results like:

<pre><span class="pl-ent">a</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">header</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> <span class="pl-k">&gt;</span> <span class="pl-ent">h1</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> <span class="pl-k">&gt;</span> <span class="pl-ent">h2</span> {}
<span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> <span class="pl-k">&gt;</span> <span class="pl-ent">h3</span>, <span class="pl-ent">html</span> <span class="pl-k">&gt;</span> <span class="pl-ent">body</span> <span class="pl-k">&gt;</span> <span class="pl-ent">main</span> <span class="pl-k">&gt;</span> <span class="pl-ent">h4</span> {}</pre>

------------------------------
