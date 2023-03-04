import fitty from "fitty";
import QRCodeStyling from "qr-code-styling";
import tinycolor from "tinycolor2";
import { animateCss, createElement } from "./functions";

interface WidgetOptions {
  title?: string;
  url: string;
  primary: string;
  secondary: string;
  show: number;
  hide: number;
  interval: number;
  messages: string[];
}

function QRCodeWidget(options: WidgetOptions) {
  const defaultOptions: WidgetOptions = {
    url: "https://example.com/",
    title: "",
    show: 1,
    hide: 10,
    interval: 5,
    primary: "#fff",
    secondary: "#000",
    messages: [],
  };

  const widgetParams: WidgetOptions = { ...defaultOptions, ...options };

  if (!widgetParams.title) {
    widgetParams.title = widgetParams.url
      .replace(/^https?:\/\//i, "")
      .replace(/\/$/, "")
      .replace(/^mailto:/i, "");
  }

  const primaryColor = tinycolor(widgetParams.primary);
  const secondaryColor = tinycolor(widgetParams.secondary);

  const borderColor = primaryColor.clone().setAlpha(0.18);

  const widget = document.getElementById("widget");

  if (!widget) throw new Error();

  const widgetContent = createElement("div", {
    className: "widget",
  });
  const widgetMessage = createElement("div", {
    className: "message",
  });
  const widgetQRCode = createElement("div", {
    className: "qrcode",
  });
  const widgetTitle = createElement("div", {
    className: "title",
  });

  const titleElement = createElement("span", {
    textContent: widgetParams.title,
  });

  widgetTitle.append(titleElement);

  widgetContent.style.color = primaryColor.toString();
  widgetContent.style.borderColor = borderColor.toString();
  widgetContent.style.backgroundColor = secondaryColor.toString();
  widgetContent.append(widgetTitle, widgetQRCode, widgetMessage);

  widget.append(widgetContent);

  const qrCode = new QRCodeStyling({
    type: "svg",
    data: widgetParams.url,
    dotsOptions: {
      color: primaryColor.toString(),
      type: "rounded",
    },
    backgroundOptions: {
      color: secondaryColor.toString(),
    },
    width: widgetQRCode.offsetWidth,
    height: widgetQRCode.offsetWidth,
  });
  qrCode.append(widgetQRCode);

  async function showMessage(index = 0) {
    const isVisible = !widgetContent.classList.contains("hidden");
    const totalMessages = widgetParams.messages.length;
    if (!isVisible) return widgetMessage.firstElementChild?.remove();
    if (widgetMessage instanceof HTMLElement && !!totalMessages) {
      const prevMessageElement = widgetMessage.firstElementChild;
      if (prevMessageElement)
        await animateCss(prevMessageElement, "animate__bounceOut").then(() => {
          prevMessageElement.remove();
        });

      const messageElement = createElement("span", {
        textContent: widgetParams.messages[index],
      });
      widgetMessage.append(messageElement);
      animateCss(messageElement, "animate__bounceIn");
      fitty(messageElement, {
        minSize: 14,
        maxSize: 24,
      });

      setTimeout(
        () => showMessage((index + 1) % totalMessages),
        widgetParams.interval * 1e3
      );
    }
  }

  function showWidget() {
    widgetContent.classList.remove("hidden");
    showMessage();
    fitty(titleElement, {
      multiLine: false,
      minSize: 12,
      maxSize: 64,
    });
    animateCss(widgetContent, "animate__bounceIn").then(() => {
      widgetContent.classList.add("shown");
      setTimeout(() => hideWidget(), widgetParams.show * 6e4);
    });
  }

  function hideWidget() {
    widgetContent.classList.remove("shown");
    animateCss(widgetContent, "animate__bounceOut").then(() => {
      widgetContent.classList.add("hidden");
      setTimeout(() => showWidget(), widgetParams.hide * 6e4);
    });
  }

  showWidget();
}

(window as any).QRCodeWidget = QRCodeWidget;
