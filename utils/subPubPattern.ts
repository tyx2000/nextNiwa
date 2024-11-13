// Event bus interface
interface EventBus {
  subscribe(event: string, callback: Function): void;
  publish(event: string, data?: any): void;
  unsubscribe(event: string, callback: Function): void;
}

// Implementation of the Pub/Sub pattern
class PubSub implements EventBus {
  private subscribers: { [key: string]: Function[] };

  constructor() {
    this.subscribers = {};
  }

  subscribe(event: string, callback: Function): void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  publish(event: string, data?: any): void {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event].forEach(callback => callback(data));
  }

  unsubscribe(event: string, callback: Function): void {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event] = this.subscribers[event].filter(
      cb => cb !== callback
    );
  }
}

// Usage example
const eventBus = new PubSub();

// Subscribe to events
const onUserLogin = (user: any) => {
  console.log(`User logged in: ${user.name}`);
};

const onUserLogout = (user: any) => {
  console.log(`User logged out: ${user.name}`);
};

eventBus.subscribe('LOGIN', onUserLogin);
eventBus.subscribe('LOGOUT', onUserLogout);

// Publish events
eventBus.publish('LOGIN', { name: 'John Doe' });
// Output: User logged in: John Doe

eventBus.publish('LOGOUT', { name: 'John Doe' });
// Output: User logged out: John Doe

// Unsubscribe from an event
eventBus.unsubscribe('LOGIN', onUserLogin);

// This won't trigger any callbacks since we unsubscribed
eventBus.publish('LOGIN', { name: 'Jane Doe' });

// This will still work
eventBus.publish('LOGOUT', { name: 'Jane Doe' });
// Output: User logged out: Jane Doe
