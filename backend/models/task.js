class Task {
  constructor(title, description, dueDate, priority, link, image) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.link = link;
    this.image = image;
  }
}

module.exports = Task;
