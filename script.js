dataContent = {
  "Тема 1": {
    "Подтема 10": "Содержание1 ",
    "Подтема 20":
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium quam quisquam nihil vitae sapiente deleniti consectetur, ipsum a nulla ab. ",
    "Подтема 30": "Содержание3",
  },
  "Тема 2": {
    "Подтема 11": "Содержание11",
    "Подтема 21": "Содержание21 ",
    "Подтема 31": "Содержание31",
  },
};

const contentEl = document.querySelector("[data-js-content]");

const topicEl = document.querySelector("[data-js-topic]");
const subtopicEl = document.querySelector("[data-js-subtopic]");
const textEl = document.querySelector("[data-js-text]");

let currentTopic = null;

const createElementWithClass = (tag, className, content) => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = content;
  return element;
};

const showTopics = () => {
  topicEl.innerHTML = "";
  Object.keys(dataContent).forEach((topicKey) => {
    const topicItem = createElementWithClass(
      "div",
      "content__topic-item",
      topicKey
    );
    topicEl.appendChild(topicItem);
  });
};

const showSubtopics = (clickTopicName) => {
  subtopicEl.innerHTML = "";
  textEl.innerHTML = "";

  if (!dataContent[clickTopicName]) return;

  currentTopic = dataContent[clickTopicName];
  Object.keys(currentTopic).forEach((subtopicKey) => {
    const subtopicItem = createElementWithClass(
      "div",
      "content__subtopic-item",
      subtopicKey
    );
    subtopicEl.appendChild(subtopicItem);
  });

  const firstSubtopic = subtopicEl.querySelector(".content__subtopic-item");
  if (firstSubtopic) firstSubtopic.classList.add("is-active");
  showText(Object.keys(currentTopic)[0]);
};

const showText = (clickSubtopicName) => {
  textEl.innerHTML = "";
  const textItem = createElementWithClass(
    "div",
    "content__text-item",
    currentTopic[clickSubtopicName]
  );
  textEl.appendChild(textItem);
};

const onItemClick = (itemEl, parentSelector) => {
  const parent = itemEl.closest(parentSelector);
  const activeElements = parent.querySelectorAll(".is-active");

  activeElements.forEach((el) => {
    el.classList.remove("is-active");
  });

  itemEl.classList.add("is-active");
};

topicEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("content__topic-item")) {
    showSubtopics(event.target.textContent);
    onItemClick(event.target, "[data-js-topic]");
  }
});
subtopicEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("content__subtopic-item")) {
    showText(event.target.textContent);
    onItemClick(event.target, "[data-js-subtopic]");
  }
});

const initContent = () => {
  showTopics();
  showSubtopics(Object.keys(dataContent)[0]);
  const firstTopic = topicEl.querySelector(".content__topic-item");
  if (firstTopic) firstTopic.classList.add("is-active");
};
initContent();
