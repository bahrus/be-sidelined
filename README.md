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
<side-nav>
    <menu be-sidelined='{
        "set": "open",
        "onClosest": ":not([is-sidelined])",
        "to": false,
        "when": "document",
        "is": "click",
        "outside": "*"
    }'>
        ...
    </menu>
</side-nav>
```