"use strict";

const bestUserForm = new UserForm ();

bestUserForm.loginFormCallback = data => {
    let login = data.login;
    let password = data.password;

    ApiConnector.login({login, password}, data => {
        if (data.success) {
            location.reload();
        } else {
            bestUserForm.setLoginErrorMessage(data.error);
        }
    })
}

bestUserForm.registerFormCallback = data => {
    let login = data.login;
    let password = data.password;

    ApiConnector.register({login, password}, data => {
        if (login && password) {
            location.reload();
        } else {
            bestUserForm.setRegisterErrorMessage('Все херня, давай по новой');
        }
    })
}
