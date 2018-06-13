# Présentation de react-redu

## Installer react-redux

### Créer un projet react avec redux

1.) Installer `create-react-app`

```
npm install -g create-react-app
```

2.) Créer un projet react

```
npx create-react-app my-app
```

3.) Installer `redux` et `react-redux`

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

## Comment ranger ses fichiers REDUX dans un projet REACT

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

- Bien pour petites applications

#### Inconvéniants

- Difficilement maintenable en cas de scale
- Pas optimiser pour les gros projets

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

- Scalable
- Navigation facile

#### Inconvéniants



## Les bases

### Les Actions

Les `Actions` permets d'envoyer les informations au store.
il ne doit pas y avoir de logique metier c'est le travail du store.

une `Action` doit avoir une propriété "type" pour indiqué le type de l' `Action`. \
créer une action :

```javascript
const action = {
  type: `ADD_TODO`,
  payload: "blablabla"
};
```

### Action Creators

a ne pas confondre avec les `Actions`.

c'est une fonction qui retourne une `Actions`.

```javascript
function addTodo(payload) {
  return {
    type: ADD_TODO,
    payload
  };
}
```

### Action Types

une action types est simplement une constante comme valeur son nom, qu'on utilisera pour nos `Actions` pour notre attribut "type"

```javascript
const ADD_TODO = "ADD_TODO";
```

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
function MaTodoReducer(state = [], action) {}
```

Nous créons une fonction qui prend en argument le **state** (que nous initialisont en tant que tableau) et l'**action**.
Ensuite à l'interieur de la fonction nous allons comparer les **actions.type** en ajoutant des conditions avec la méthode `switch`.\
Comme ceci :

```js
//J'importe mes actions type
import { TodoTypes } from "../actions/type_todo";

function MaTodoReducer(state = [], action) {
  switch (action.type) {
    case TodoTypes.ADD_TODO:

    case TodoTypes.DELETE_TODO:

    default:
      return state;
  }
}
```

Noter que par defaut il faut toujours retourner le **state**.
Maintenant que nous avons nos conditions, il faut à present retourner quelques choses pour changer notre state.\
Pour ça nous utiliserons l'**action.payload** qui contiendra notre text envoyer via les actions.\
Comme cela :

```js
//J'importe mes actions type
import { TodoTypes } from "../actions/type_todo";

function MaTodoReducer(state = [], action) {
  //Ici j'initialise un compteur pour créer mes id
  let counter = 1;

  switch (action.type) {
    case TodoTypes.ADD_TODO:
      //Je retourne un nouvelle objet dans mon state.
      return [
        {
          todo: action.payload.text,
          id: counter++
        },
        ...state
        // Le spreadOperator permet d'ajouter l'element à mon state actuel sans remplacer celui-ci.
      ];
    case TodoTypes.DELETE_TODO:
      // Je retourne un nouveau tableau en filtrant uniquement ceux qui n'ont pas le même id que l'action.payload
      return state.filter(todo => {
        return todo.id !== action.payload.id;
      });

    default:
      return state;
  }
}
```

Maintenant que j'ai créé mon reducer, il me reste plus qu'a le combiner dans un nouveau fichier (le store) avec les autres reducers.

### Store

Mon **store** va me permettre de combiner tout mes **reducers** qui contiennent mes states afin de les stockers dans des objets.\
Pour initialiser le store il faut d'abord importer la méthode redux **combineReducers** qui comme son nom l'indique permet de combiner les **reducers**.\
Voila :

```js
import { combineReducers } from "redux";
```

Il faut aussi importer le **reducer** que nous venons de créer :

```js
import { combineReducers } from "redux";
import MaTodoReducer from "./MaTodoReducer";
```

A présent que c'est fait nous allons créer notre **store** et stocker notre **reducer** à l'intérieur d'un objet que nous allons nommer **todo**.

```js
import { combineReducers } from "redux";
import MaTodoReducer from "./MaTodoReducer";

const monStore = combineReducers({
  todo: MaTodoReducer
});

export default monStore;
```

Et voila maintenant nous avons notre store ! \
Si nous avons d'autres reducers alors il suffit simplement de l'ajouter en créant un nouvelle objet.

```js
import { combineReducers } from "redux";
import MaTodoReducer from "./MaTodoReducer";
import MonUserReducer from "./MonUserReducer";

const monStore = combineReducers({
  todo: MaTodoReducer,
  user: MonUserReducer
});

export default monStore;
```

Maintenant que notre **store** est créé il me reste une derniere chose a faire pour le combiner avec mon projet **React**. \
Si vous avez déja créé un projet **React** votre fichier _index.js_ devrait contenir au moins ça :

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

A partir de maintenant nous allons pouvoir ajouter notre **store**. \
Mais pour commencer nous allons avoir besoin de deux modules supplémentaire, le **Provider** qui fournira l'acces au **store** à notre application et **createStore** qui initialisera le **store**:

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";

ReactDOM.render(<App />, document.getElementById("root"));
```

Maintenant que nous avons importé ces deux modules, on va pouvoir s'en servir :

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
// J'oublie pas d'importer mon store créé précédement
import store from "./reducers";

ReactDOM.render(
  // Le Provider va fournire le store à l'application
  <Provider store={createStore(store)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Et voila vous avez integrer le **store** à vôtre projet **React** !

### La vue
C'est ici que nous allons rendre la vue sur nos composants et nos states.
Prenons comme exemple ce code ci-dessous : 
```js
    import React, { Component } from 'react'

    class TodoList extends Component {
        constructor(props) {
            super(props)
            this.state = {
                text: ''
            }
        }
        
        getTodo(e) {
            // Nous stockons avec cette méthode la value de l'input dans un state que nous allons utiliser plus tard
            this.setState({
                text: e.target.value
            })
        }

        render(){
            return(
                <div className="App">
                <h1>Todo with Redux</h1>
                <h3>Ajouter une todo</h3>
                <input type="text" onChange={this.getTodo.bind(this)} />
                <button onClick={() => { this.onAddTodo(this.state.text) }}>Ajouter la Todo</button>
            </div>
            )
        }
    }
```
Avec ce bout de code nous pouvons stocker dans le **state** "text" mais ce state sera disponible uniquement dans le composant même ou ses enfants.
Mais je souhaiterai stocker "text" dans mon **store** de tel maniere a pouvoir l'utiliser dans d'autres composants par exemple. \
Comment faire ? \
Pour ça nous allons avoir besoin de la méthode **mapDispatchToProps** qui prendra en paramêtre **dispatch** et de **bindActionCreators** qui va me permettre de recuperer mes fonctions qui sont stocker dans les actions. \
Voici comment faire :
```js
import React, { Component } from 'react'
// j'importe mes fonctions que j'ai créé plus haut dans les actions
import { deleteTodo, addTodo } from '../actions/action_todo'
import { bindActionCreators } from 'redux';

    class TodoList extends Component {
        constructor(props) {
            super(props)
            this.state = {
                text: ''
            }
        }
        
        getTodo(e) {
            // Nous stockons avec cette méthode la value de l'input dans un state que nous allons utiliser plus tard
            this.setState({
                text: e.target.value
            })
        }
        onAddTodo(text) {
        // J'appelle ma méthode "addTodo" que je viens d'importer
        this.props.addTodo(text)
    }
        render(){
            return(
                <div className="App">
                <h1>Todo with Redux</h1>
                <h3>Ajouter une todo</h3>
                <input type="text" onChange={this.getTodo.bind(this)} />
                <button onClick={() => { this.onAddTodo(this.state.text) }}>Ajouter la Todo</button>
            </div>
            )
        }
    }
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            addTodo, deleteTodo
        }, dispatch)
    }
// Permet de connecter mon composant au mapDispatchToProps et mapStateToProps
export default connect(mapDispatchToProps)(TodoList);
```
A présent nous rendons disponible nos fonctions qui communiquerons avec les reducers. Mais il manque encore une derniere chose : \
Rendre disponible notre **state** dans notre vue. \
Il suffira d'ajouter :
```js 
...
// Cette fonction permettra à la vue d'avoir acces au state stocker dans le store
function mapStateToProps(state) {
//Si vous vous souvenez bien notre state est stocker dans un objet créé qu'on avait appelé **todo** dans le reducer
    return { todoItem: state.todo }
}
// Il faudra l'ajouter à "connect"
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

```

Et voila grace au **mapStateToProps** vous allez pouvoir recuperer dans n'importe quel composant votre state. C'est là, la puissance de redux. Rendre disponible vos state partout dans votre application afin de s'en servir au besoin et les faire communiqués avec d'autres state !

