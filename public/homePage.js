"use strict";

const bestLogoutButton = new LogoutButton ();

bestLogoutButton.action = f => {
    ApiConnector.logout( logOut => {
        if (logOut.success) {
            location.reload();
        } else {
            console.log('ты от нас не убежишь :з');
        }
    })
}

ApiConnector.current(data => {
    if (data.success){
        ProfileWidget.showProfile(data.data);
    }
});


const bestRatesBoard = new RatesBoard();

function makeBoard() {
    let timerId = null;
    if (!timerId) {
        ApiConnector.getStocks(data => {
            if (data.success){
                bestRatesBoard.clearTable();
                bestRatesBoard.fillTable(data.data) 
            } 
        });  
    } 

    setInterval(() => ApiConnector.getStocks(data => {
        if (data.success){
            bestRatesBoard.clearTable();
            bestRatesBoard.fillTable(data.data) 
        } 
    }), 60000);
}

makeBoard();


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function addMoney({ currency, amount }) {
    ApiConnector.addMoney(({ currency, amount }), some => {
        if (some.success) {
            ProfileWidget.showProfile(some.data);
            some.message = 'Молодец, так держать! Ты на правильном пути!'
        } else {
            some.message = some.error;
        }
        moneyManager.setMessage(some.success, some.message);
    });

};

moneyManager.conversionMoneyCallback = function convertMoney(data) {
    ApiConnector.convertMoney(data, some => {
        if (some.success) {
            ProfileWidget.showProfile(some.data);
            some.message = 'успех'
        } else {
            some.message = 'провал'
        }
        moneyManager.setMessage(some.success, some.message);
    }); 
};

moneyManager.sendMoneyCallback = function sendMoney(data) {
    ApiConnector.transferMoney(data, some => {
        if (some.success) {
            ProfileWidget.showProfile(some.data);
            some.message = 'успех'
        } else {
            some.message = 'провал'
        }
        moneyManager.setMessage(some.success, some.message);
    });
}


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(some => {
    if (some.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(some.data);
        moneyManager.updateUsersList(some.data);
    }
});

favoritesWidget.addUserCallback = function addUser(data) {
    ApiConnector.addUserToFavorites(data, some => {
        if (some.success) {
            some.message = 'успех';
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(some.data);
            moneyManager.updateUsersList(some.data);
            favoritesWidget.setMessage(some.success, some.message)
        } else {
            some.message = 'провал';
            favoritesWidget.setMessage(some.success, some.message)
        }
    });
}

favoritesWidget.removeUserCallback = function removeUser(data) {
    ApiConnector.removeUserFromFavorites(data, some => {
        if (some.success) {
                some.message = 'успех';
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(some.data);
                moneyManager.updateUsersList(some.data);
                favoritesWidget.setMessage(some.success, some.message)
            } else {
                some.message = 'провал';
                favoritesWidget.setMessage(some.success, some.message)
            }
    });
}


