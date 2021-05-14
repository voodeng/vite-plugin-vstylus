# vite-plugin-vstylus

Simply handle `stylus` files in vite2

support `.styl/.stylus/.vue` file

handle `@import`,`@require` url to absolut path

can set global import in support file


## usage

vite.config.js
```
import { vStylusPlugins } from 'vite-plugin-vstylus'

...
plugins: [
  vStylusPlugins({
    resolveURL: { nocheck: false },
    import: [resolve('src/common/variables.styl'), resolve('src/common/mixin.styl')]
  })
]
...
```

## options

options description in [Stylus-lang](https://stylus-lang.com/docs/js.html)

---

`resolveURL`: *Object*

  - set import or url() resolve options

`import`: *Array*

  - import file in each handing file
  - need a abs path