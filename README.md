# be-sidelined

```html
<side-nav>
    <menu be-sidelined>
        ...
    </menu>
</side-nav>
```

is shorthand for

```html
<side-nav be-sidelined='{
        "set": "open",
        "onClosest": "*",
        "toVal": false,
        "when": "document",
        "is": "click",
        "outsideClosest": "*"
    }'>
    <menu >
        ...
    </menu>
</side-nav>
```