/**
 * Anima um elemento usando a biblioteca animate.css.
 *
 * @param $el O elemento a ser animado, ou um seletor CSS para selecioná-lo.
 * @param animationName O nome da animação a ser executada.
 * @param prefix O prefixo a ser adicionado às classes de animação.
 * @returns Uma Promise que é resolvida quando a animação termina, contendo o elemento animado.
 * @throws Se o elemento não for encontrado ou algum parâmetro obrigatório não for informado.
 */
export async function animateCss(
  $el: Element | string,
  animationName: string,
  prefix = "animate__"
): Promise<Element> {
  if (!$el) {
    throw new Error("O primeiro parâmetro é obrigatório");
  }

  if (!animationName) {
    throw new Error("O segundo parâmetro é obrigatório");
  }

  if (animationName.startsWith(prefix)) {
    animationName = `${prefix}${animationName.replace(prefix, "")}`;
  }

  const node: Element =
    typeof $el === "string" ? (document.querySelector($el) as Element) : $el;

  if (!(node instanceof Element)) {
    throw new Error("Elemento não encontrado");
  }

  const animatedClass = `${prefix}animated`;

  node.classList.add(animatedClass, animationName);
  await listenEvent("animationend", node);
  node.classList.remove(animatedClass, animationName);

  return node;
}

/**
 * Cria um novo elemento HTML com as opções fornecidas.
 *
 * @param element - O nome do elemento HTML a ser criado.
 * @param options - As opções para o elemento.
 * @returns O elemento HTML criado.
 */
export function createElement<T extends keyof HTMLElementTagNameMap>(
  element: T,
  options?: Partial<HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
  const $el = document.createElement(element);

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      ($el as any)[key] = value;
    });
  }

  return $el;
}

/**
 * Espera por um evento específico em um elemento e retorna um Promise que é resolvido com o objeto do evento.
 *
 * @param {EventName} eventName - O nome do evento a ser ouvido.
 * @param {Element} element - O elemento onde o evento será ouvido.
 * @returns {Promise<Event>} - Uma promessa que será resolvida com o objeto do evento quando o evento for disparado.
 */
export async function listenEvent<EventName extends keyof HTMLElementEventMap>(
  eventName: EventName,
  element: Element | Window
): Promise<Event> {
  return new Promise<Event>((resolve) => {
    element.addEventListener(
      eventName,
      (event: Event) => {
        resolve(event);
      },
      {
        once: true,
      }
    );
  });
}

/**
 * Observa um elemento HTML e emite eventos quando ele fica visível ou invisível.
 *
 * @param {HTMLElement} target - O elemento HTML a ser observado.
 * @param {string} [rootMargin='0px'] - O espaço em pixels a ser adicionado às margens do elemento de interseção.
 * @param {number} [threshold=0] - O limite de interseção em que os eventos serão emitidos. Pode ser um valor entre 0 e 1.
 * @returns {IntersectionObserver} Um objeto com os métodos `disconnect` e `observe` que podem ser usados para controlar o IntersectionObserver.
 */
export function emitVisibilityEvents(
  target: HTMLElement,
  rootMargin: string = "0px",
  threshold: number = 0
): IntersectionObserver {
  const observer = new IntersectionObserver(
    ([entry]) => {
      const eventName = entry.isIntersecting ? "visible" : "hidden";
      target.dispatchEvent(new CustomEvent(eventName, { detail: target }));
    },
    { rootMargin, threshold }
  );
  observer.observe(target);
  return observer;
}
