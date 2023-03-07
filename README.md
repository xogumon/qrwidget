# QRWidget

QR code widget for StreamElements: https://dev.streamelements.com/docs/widgets/3cf52461e4e34-before-starting#custom-widget

Paste the codes below into the corresponding fields in the 'custom widget':

### HTML

```html
<div id="widget"></div>
<script src="https://cdn.jsdelivr.net/gh/xogumon/qrwidget@0.1.1/dist/widget.min.js"></script>
```

### CSS

```css
@import "https://cdn.jsdelivr.net/gh/xogumon/qrwidget@0.1.1/dist/widget.min.css";
@import "https://fonts.googleapis.com/css2?family={{titleFont}}&family={{messageFont}}";
.widget > .title {
  font-family: "{{titleFont}}", sans-serif;
}
.widget > .message {
  font-family: "{{messageFont}}", sans-serif;
}
```

### JS

```js
window.addEventListener("onWidgetLoad", function (event) {
  const options = event.detail.fieldData;
  options.messages = Object.entries(options)
    .filter(([key, value]) => key.match(/^message\d+$/) && value)
    .map(([key, value]) => value);
  QRCodeWidget(options);
});
```

### Fields

```json
{
  "url": {
    "type": "text",
    "label": "Site URL:",
    "value": "https://xog.one/pix",
    "group": "Config"
  },
  "title": {
    "type": "text",
    "label": "Widget title:",
    "group": "Config"
  },
  "primary": {
    "type": "colorpicker",
    "label": "QR/Text color",
    "value": "#000000",
    "group": "Config"
  },
  "secondary": {
    "type": "colorpicker",
    "label": "Background Color",
    "value": "#FFFFFF",
    "group": "Config"
  },
  "show": {
    "type": "slider",
    "label": "Show widget (in minutes)",
    "value": 1,
    "step": 1,
    "min": 1,
    "max": 30,
    "group": "Config"
  },
  "hide": {
    "type": "slider",
    "label": "Hide widget (in minutes)",
    "value": 10,
    "step": 1,
    "min": 1,
    "max": 30,
    "group": "Config"
  },
  "message1": {
    "type": "text",
    "label": "Message 1:",
    "value": "mande seu pix com mensagem na live!",
    "group": "Config"
  },
  "message2": {
    "type": "text",
    "label": "Message 2:",
    "value": "leia o código com a câmera do celular.",
    "group": "Config"
  },
  "titleFont": {
    "type": "googleFont",
    "label": "Title font:",
    "value": "Roboto",
    "group": "Config"
  },
  "messageFont": {
    "type": "googleFont",
    "label": "Message font:",
    "value": "Roboto",
    "group": "Config"
  },
  "widgetName": {
    "type": "hidden",
    "value": "QRCodeWidget",
    "group": "Config"
  },
  "widgetAuthor": {
    "type": "hidden",
    "value": "Ronis Xogum <https://xog.one/>",
    "group": "Config"
  }
}
```

![QRCodeWidget](assets/widget.png)
