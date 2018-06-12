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

### Store

```

```
