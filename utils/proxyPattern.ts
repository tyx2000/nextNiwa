// Interface defining the common structure
interface Subject {
  request(): void;
}

// Real Subject - the actual object being proxied
class RealSubject implements Subject {
  public request(): void {
    console.log('RealSubject: Handling request.');
  }
}

// Proxy - controls access to the RealSubject
class Proxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log('Proxy: Checking access prior to firing a real request.');
    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Logging the time of request.');
  }
}

// Usage example
function clientCode(subject: Subject) {
  subject.request();
}

// Example implementation
const realSubject = new RealSubject();
console.log('Client: Executing the client code with real subject:');
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);

/* Output will be:
Client: Executing the client code with real subject:
RealSubject: Handling request.

Client: Executing the same client code with a proxy:
Proxy: Checking access prior to firing a real request.
RealSubject: Handling request.
Proxy: Logging the time of request.
*/
