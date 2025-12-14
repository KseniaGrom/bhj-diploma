/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-open');
        document.body.classList.toggle('sidebar-collapse');
      });
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerBtn = document.querySelector('.menu-item_register');
    const loginBtn = document.querySelector('.menu-item_login');
    const logoutBtn = document.querySelector('.menu-item_logout');
    
    if (registerBtn) {
      registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('register');
        if (modal) modal.open();
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('login');
        if (modal) modal.open();
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        User.logout((error, response) => {
          if (response && response.success) {
            App.setState('init');
          }
        });
      });
    }
  }
}