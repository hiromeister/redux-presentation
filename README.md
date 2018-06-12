# Présentation de react-redu

## Installer react-redux

### Créer un projet react avec redux

1.) Installer ```create-react-app```
```
npm install -g create-react-app
```

2.) Créer un projet react

```
npx create-react-app my-app
```

3.) Installer ```redux``` et ```react-redux```

```
cd my-app
npm install redux
npm install react-redux
```


### Installer react-redux dans un projet react existant

```javacript
cd my-app
 npm install redux
 npm install --save react-redux
```

##  Comment ranger ses fichiers REDUX dans un projet REACT

### Rails-style 
 Séparer les fichiers par nature : “actions”, “constants”, “reducers”, “containers”, and “components”
```
actions/
    CommandActions.js
    UserActions.js
components/
    Header.js
    Sidebar.js
    Command.js
    CommandList.js
    CommandItem.js
    CommandHelper.js
    User.js
    UserProfile.js
    UserAvatar.js
containers/
    App.js
    Command.js
    User.js
reducers/
    index.js
    command.js
    user.js
routes.js
```
#### Avantages
* Bien pour petites applications

#### Inconvéniants
* Difficilement maintenable en cas de scale
* Pas optimiser pour les gros projets

### Domain-style
Séparer les dossiers par feature ou domaine, éventuellement avec des sous-dossiers par type de fichier
```app/
    Header.js
    Sidebar.js
    App.js
    reducers.js
    routes.js
command/
    Command.js
    CommandContainer.js
    CommandActions.js
    CommandList.js
    CommandItem.js
    CommandHelper.js
    commandReducer.js
product/
    Product.js
    ProductContainer.js
    ProductActions.js
    ProductList.js
    ProductItem.js
    ProductImage.js
    productReducer.js
user/
    User.js
    UserContainer.js
    UserActions.js
    UserProfile.js
    UserAvatar.js
    userReducer.js
```

#### Avantages
* Facilite l'ajout d'actions etc
* Facilite la navigation dans de gros projets 

## Les bases

### Reducers

C'est la que nous conservons nos **states**, chaque fois que le reducers observe un changement dans le **state**,
il met automatiquement à jour le **state** auquel le reducers est associés.\
Les reducers sont des fonctions comportants deux attributs, le states et l'actions. \
Le state se chargera de stocker l'information envoyer par l'action. \
Quand à l'action, elle renvoie notre **Dispatcher** dans lequel sont stocker le **type** et le **payload**. \
L' **action.type** permet de déterminer quel state doit retourner notre reducer, l'**action.payload** lui contient l'information qui peut être transmis au state.\
Pour illustré les propos, nous allons prendre l'exemple de la création d'une traditionnelle todolist.
Dans cette exemple ci dessous : 
```js
 function MaTodoReducer (state = [], action) {

}

```
Nous créons une fonction qui prend en argument le **state** (que nous initialisont en tant que tableau) et l'**action**.
Ensuite à l'interieur de la fonction nous allons comparer les **actions.type** en ajoutant des conditions avec la méthode ```switch```.\
Comme ceci :

```js  
//J'importe mes actions type 
import { TodoTypes } from '../actions/type_todo';

function MaTodoReducer (state = [], action) {
    switch (action.type) {
        case TodoTypes.ADD_TODO:

        case TodoTypes.DELETE_TODO:

        default: return state;
    }
}
```   
Noter que par defaut il faut toujours retourner le **state**.
Maintenant que nous avons nos conditions, il faut à present retourner quelques choses pour changer notre state.\
Pour ça nous utiliserons l'**action.payload** qui contiendra notre text envoyer via les actions.\
Comme cela : 
```js
//J'importe mes actions type 
import { TodoTypes } from '../actions/type_todo';

    function MaTodoReducer (state = [], action) {
        //Ici j'initialise un compteur pour créer mes id
        let counter = 1;

        switch (action.type) {

            case TodoTypes.ADD_TODO:
        //Je retourne un nouvelle objet dans mon state.
              return [
                 {
                    todo: action.payload.text,
                    id: counter++
                 },...state
         // Le spreadOperator permet d'ajouter l'element à mon state actuel sans remplacer celui-ci.     
                    ]
            case TodoTypes.DELETE_TODO:
        // Je retourne un nouveau tableau en filtrant uniquement ceux qui n'ont pas le même id que l'action.payload
                return state.filter((todo) => {
                    return todo.id !== action.payload.id
               })

            default: return state;
    }
}
```
Maintenant que j'ai créé mon reducer, il me reste plus qu'a le combiner dans un nouveau fichier (le store) avec les autres reducers.
### Store 
Mon **store** va me permettre de combiner tout mes **reducers** qui contiennent mes states afin de les stockers dans des objets.\
Pour initialiser le store il faut d'abord importer la méthode redux **combineReducers** qui comme son nom l'indique permet de combiner les **reducers**.\
Voila :
```js
import { combineReducers } from 'redux';
```
Il faut aussi importer le **reducer** que nous venons de créer :
```js
import { combineReducers } from 'redux';
import MaTodoReducer from './MaTodoReducer';
```
A présent que c'est fait nous allons créer notre **store** et stocker notre **reducer** à l'intérieur d'un objet que nous allons nommer **todo**.
```js 
import { combineReducers } from 'redux';
import MaTodoReducer from './MaTodoReducer';

const monStore = combineReducers({
    todo: MaTodoReducer,
})

export default monStore;
```
Et voila maintenant nous avons notre store ! \
Si nous avons d'autres reducers alors il suffit simplement de l'ajouter en créant un nouvelle objet.
```js 
import { combineReducers } from 'redux';
import MaTodoReducer from './MaTodoReducer';
import MonUserReducer from './MonUserReducer';

const monStore = combineReducers({
    todo: MaTodoReducer,
    user: MonUserReducer
})

export default monStore;
```

Maintenant que notre **store** est créé il me reste une derniere chose a faire pour le combiner avec mon projet **React**. \
Si vous avez déja créé un projet **React** votre fichier *index.js* devrait contenir au moins ça :
```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(
        <App />
    , document.getElementById('root'));

```
A partir de maintenant nous allons pouvoir ajouter notre **store**. \
Mais pour commencer nous allons avoir besoin de deux modules supplémentaire, le **Provider** qui fournira l'acces au **store** à notre application et **createStore**  qui initialisera le **store**:
```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import { Provider } from 'react-redux';
    import { createStore } from 'redux';

    ReactDOM.render(

        <App />
    , document.getElementById('root'));

```
Maintenant que nous avons importé ces deux modules, on va pouvoir s'en servir :
```js 
 import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import { Provider } from 'react-redux';
    import { createStore } from 'redux';
    // J'oublie pas d'importer mon store créé précédement
    import store from './reducers';

    ReactDOM.render(
        // Le Provider va fournire le store à l'application
       <Provider store={createStore(store)}>
          <App />
       </Provider>
    , document.getElementById('root'));

```
Et voila vous avez integrer le **store** à vôtre projet **React** !
### La vue
