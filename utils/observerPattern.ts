// Subject interface that defines methods for attaching, detaching and notifying observers
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// Observer interface that defines the update method
interface Observer {
  update(subject: Subject): void;
}

// Concrete Subject class
class NewsAgency implements Subject {
  private observers: Observer[] = [];
  private news: string = '';

  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  // Business logic
  setNews(news: string): void {
    this.news = news;
    this.notify();
  }

  getNews(): string {
    return this.news;
  }
}

// Concrete Observer classes
class NewsChannel implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(subject: Subject): void {
    if (subject instanceof NewsAgency) {
      console.log(`${this.name} received news: ${subject.getNews()}`);
    }
  }
}

// Usage example
const newsAgency = new NewsAgency();

const channel1 = new NewsChannel("Channel 1");
const channel2 = new NewsChannel("Channel 2");
const channel3 = new NewsChannel("Channel 3");

// Attach observers to the subject
newsAgency.attach(channel1);
newsAgency.attach(channel2);
newsAgency.attach(channel3);

// Set news which will notify all observers
newsAgency.setNews("Breaking: TypeScript is awesome!");

// Output will be:
// Channel 1 received news: Breaking: TypeScript is awesome!
// Channel 2 received news: Breaking: TypeScript is awesome!
// Channel 3 received news: Breaking: TypeScript is awesome!

// Detach one observer
newsAgency.detach(channel2);

// Set another news
newsAgency.setNews("Breaking: Observer Pattern implemented successfully!");

// Output will be:
// Channel 1 received news: Breaking: Observer Pattern implemented successfully!
// Channel 3 received news: Breaking: Observer Pattern implemented successfully!
