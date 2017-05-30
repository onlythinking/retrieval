exports.setRequestUrl = function (app) {
    var user = require('./controllers/UserCtrl');
    var category = require('./controllers/CategoryCtrl');

    app.get('/api/users', user.pageList);
    app.get('/api/users/:id', user.findOne);
    app.post('/api/users', user.create);
    app.put('/api/users/:id', user.update);
    app.delete('/api/users/:id', user.delete);

    app.get('/api/categories', category.pageList);
    app.get('/api/categories/:id', category.findOne);
    app.post('/api/categories', category.create);
    app.put('/api/categories/:id', category.update);
    app.delete('/api/categories/:id', category.delete);
    
}
