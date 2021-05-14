# @voodeng/vite-plugin-vstylus

_Simply handle `stylus` files in vite2_

support `.styl/.stylus/.vue` file

it handle `@import`,`@require` relpath to absolute path

set global import file in each support file before vite transform

## Usage

```
npm i @voodeng/vite-plugin-vstylus
```

- vite.config.js

```
const { vStylusPlugins } = require('@voodeng/vite-plugin-vstylus')

...
plugins: [
  vStylusPlugins({
    resolveURL: { nocheck: false },
    import: [resolve('src/common/variables.styl'), resolve('src/common/mixin.styl')]
  })
]
...
```

## Options

options description in [Stylus-lang](https://stylus-lang.com/docs/js.html)

------

`resolveURL`: _Object_

- set import or url() resolve options

`import`: _Array_

- import file in each handing file
- need a abs path

------
![](http://ww4.sinaimg.cn/large/87c01ec7gy1fo3p0pnsraj207n0130sj.jpg)
