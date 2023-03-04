# qrwidget

QR code widget for StreamElements: https://dev.streamelements.com/docs/widgets/3cf52461e4e34-before-starting

### HTML

```html
<div id="widget"></div>
<script src="https://cdn.jsdelivr.net/gh/xogumon/qrwidget@0.0.1/dist/widget.min.js"></script>
```

### CSS

```css
@import url("https://cdn.jsdelivr.net/gh/xogumon/qrwidget@0.0.1/dist/widget.min.css");
```

### JS

```js
window.addEventListener("onWidgetLoad", function (obj) {
  const {
    fieldData: {
      url,
      title,
      primary,
      secondary,
      show,
      hide,
      message1,
      message2,
    },
  } = obj.detail;
  QRCodeWidget({
    url,
    title,
    primary,
    secondary,
    messages: [message1, message2],
    show,
    hide,
  });
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
  "widgetName": {
    "type": "hidden",
    "value": "QRCodeWidget"
  },
  "widgetAuthor": {
    "type": "hidden",
    "value": "Ronis Xogum <https://xog.one/>"
  }
}
```
