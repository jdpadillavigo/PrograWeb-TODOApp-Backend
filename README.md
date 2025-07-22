# Documentación Backend

## Endpoints

### Obtener TODOs

- Path : "/todos"
- Método : GET
- Input : Query Parameter("estado") = 0 o 1
- Output

``` json
[
    { "id" : 1, "descripcion" : "desc de todo 1" },
    { "id" : 2, "descripcion" : "desc de todo 2" },
]
```

### Obtener TODO

- Path : "/todos"
- Método : GET
- Input : "/:id" : ID del TODO.
- Output

``` json
[
    { "id" : 1, "descripcion" : "desc de todo 1" }
]
```

### Registrar TODO

- Path : "/todos"
- Método : POST
- Input

``` json
{
    "descripcion" : "bla bla bla"
}
```

- Output

``` json
{
    "msg" : ""
}
```

### Modificar TODO

- Path : "/todos"
- Método : PUT
- Input

``` json

Path Parameter: /todos/2
{
    "descripcion" : "nuevo todo"
}
```

- Output

``` json
{
    "msg" : ""
}
```

### Eliminar TODO

- Path : "/todos"
- Método : DELETE
- Input

Path Parameter: "/todos/2"

- Output

``` json
{
    "msg" : ""
}
```