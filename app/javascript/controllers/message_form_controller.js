import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    this.element.addEventListener('ajax:success', () => {
      document.getElementById('floatingMessage').value = '';
    });
  }
}
