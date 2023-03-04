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
  await new Promise((resolve) =>
    node.addEventListener("animationend", resolve, {
      once: true,
    })
  );
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
