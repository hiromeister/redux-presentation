# Présentation de react-redux

## Installer react-redux dans un projet react existant

Faire :

```javacript
 npm install --save react-redux
```

## Les bases

### Actions

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
