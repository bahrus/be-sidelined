# be-sidelined

```html
<side-nav be-sidelined>
    <menu >
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

Some components, like the native details element, don't consistently call the "open" property setter when the value of open changes.

To accommodate such components, add an additional event listener on the adorned element to monitor for:

```html
<details be-sidelined=toggle>
    <summary>test</summary>
</side-nav>
```

which is short-hand for:

```html
<details be-sidelined='{
        "set": "open",
        "onClosest": "*",
        "toVal": false,
        "when": "document",
        "is": "click",
        "outsideClosest": "*",
        "onEventType": "toggle"
    }'>
    <summary>test</summary>
</side-nav>
```

