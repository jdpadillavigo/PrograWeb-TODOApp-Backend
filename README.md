# Documentación Backend

## Endpoints

### Obtener TODOs

- Path : "/todos"
- Metodo : GET
- Input : -
- Output

``` json
[
    { "id" : 1, "descripcion" : "desc de todo 1" },
    { "id" : 2, "descripcion" : "desc de todo 2" },
]
```

### Obtener TODO

- Path : "/todos"
- Metodo : GET
- Input : "/:id" : ID del TODO.
- Output

``` json
[
    { "id" : 1, "descripcion" : "desc de todo 1" }
]
```