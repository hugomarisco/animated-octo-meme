import AppController from "./app.controller";
import template from "./app.template.html";

class App implements ng.IComponentOptions {
  public template = template;
  public controller = AppController;
}

export default App;
