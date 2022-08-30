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

Technically, this only adds the event handler when the value of the property doesn't match the the value of "toVal", and the event handler is aborted when it matches.

We are assuming the property has a standard setter which can be subscribed to.