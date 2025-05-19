# TrabajoTeoriaDeLaComputacion

Universidad Pontificia Bolivariana

- Miguel Ramírez Rueda
- Nicolás Agudelo Mesa
- Ana Victoria Zabaleta

# Análisis compilador en javaScript

Dado un programa que simula una calculadora que suma, resta, multiplica y divide, fue creado un programa que analiza cada parte requerida del compilador. Es decir, examina su parte léxica, semántica y sintáctica, es decir:
- Análisis léxico: guardar los tokens que recibe el programa y el valor de esto.
- Análisis sintáctico: revisar que las entradas dadas coincidan con los valores asignados o que no sea ingresado un tóken que no reconozca.
- Análisis semántico: se encarga de exaninar las reglas de producción del programa y que ninguna de estas sean incongruentes o generen algún error o ambiguedad.

Sin embargo, ¿Cómo se debe ejecutar este programa?.

# Instrucción de ejecución

Para este programa, lo único que se necesita para la ejecución es node.js o por medio de una página web en HTML, y ya dentro de esto, es necesario tener en cuenta un input/entrada la cuál será analizada, en el contexto del proyecto, las entradas a analizar son operaciones aritméticas básicas. El trabajo ya tiene definido las reglas de producción y los tokens aceptados, por lo cual, se debe de tener en cuenta esto a la hora de ingresar un input, sin embargo, como el programa tirará los errores en cada aspecto específico dado el ingreso de tokes o reglas no reconocidas.

# Ejemplo de ejecución

- Input: 3 + 5 * (2 - 1)

- Output:

[
  {
    "tipo": "Numero",
    "valor": "3"
  },
  {
    "tipo": "Operador",
    "valor": "+"
  },
  {
    "tipo": "Numero",
    "valor": "5"
  },
  {
    "tipo": "Operador",
    "valor": "*"
  },
  {
    "tipo": "Parentesis",
    "valor": "("
  },
  {
    "tipo": "Numero",
    "valor": "2"
  },
  {
    "tipo": "Operador",
    "valor": "-"
  },
  {
    "tipo": "Numero",
    "valor": "1"
  },
  {
    "tipo": "Parentesis",
    "valor": ")"
  }
]
trabajo.js:107 Resultado: 8

Esta es la salida dada por el proyecto, el resultado es la demostración de que las reglas de producción funcionan, es decir, no se halló algún error al realizar el análisis semántico, y la los tokens retornados, son producto del análisis léxico y sintáctico.
