//Taller de topicos de programacion

/*Ejercicio 1: Funciones de orden superior
Enunciado:
Tienes un arreglo de cursos disponibles en una plataforma de educación online. Cada curso
está representado con un objeto que incluye:

nombre: string
categoria: string
inscritos: número de estudiantes inscritos
calificaciones: arreglo de números del 1 al 5.
Objetivo:
1. 2. 3. 4. 5. Filtra los cursos que tienen más de 100 inscritos.
Calcula el promedio de calificaciones de esos cursos.
Filtra solo los cursos cuyo promedio sea mayor o igual a 4.
Ordena los cursos resultantes por número de inscritos en orden descendente.
Imprime una lista con el nombre, número de inscritos y promedio de calificaciones de
cada curso.
Restricciones:

No puedes usar bucles tradicionales (for, while, etc.).
Solo puedes utilizar funciones de orden superior (map, filter, reduce, sort,
etc.).*/

// Definimos la interfaz Curso para describir la estructura de un curso
interface Curso {
    nombre: string;           // Nombre del curso
    categoria: string;        // Categoría a la que pertenece el curso
    inscritos: number;        // Número de estudiantes inscritos
    calificaciones: number[]; // Arreglo con calificaciones del 1 al 5
}

// Creamos un arreglo con varios cursos de ejemplo
const cursos: Curso[] = [
    { nombre: "Curso A", categoria: "Matemáticas", inscritos: 150, calificaciones: [4, 5, 3, 4] },
    { nombre: "Curso B", categoria: "Ciencias", inscritos: 80, calificaciones: [2, 3, 4, 5] },
    { nombre: "Curso C", categoria: "Literatura", inscritos: 200, calificaciones: [5, 4, 4, 5] },
    { nombre: "Curso D", categoria: "Historia", inscritos: 120, calificaciones: [3, 2, 4, 4] },
];

// 1. Filtramos los cursos con más de 100 inscritos
const cursosFiltrados = cursos.filter(curso => curso.inscritos > 100);
// filter retorna un nuevo arreglo solo con los cursos cuyo campo inscritos es mayor que 100

// 2. Calculamos el promedio de calificaciones para cada curso filtrado
const cursosConPromedio = cursosFiltrados.map(curso => {
    // sumamos todas las calificaciones usando reduce y calculamos su promedio
    const promedio = curso.calificaciones.reduce((acc, cal) => acc + cal, 0) / curso.calificaciones.length;
    // devolvemos un nuevo objeto que incluye todas las propiedades del curso original y el promedio calculado
    return { ...curso, promedio };
});

// 3. Filtramos solo los cursos cuyo promedio de calificaciones sea mayor o igual a 4
const cursosFinales = cursosConPromedio.filter(curso => curso.promedio >= 4);
// filter crea un arreglo con cursos que tienen promedio >= 4

// 4. Ordenamos los cursos resultantes por número de inscritos en orden descendente
const cursosOrdenados = cursosFinales.sort((a, b) => b.inscritos - a.inscritos);
// sort ordena el arreglo comparando la cantidad de inscritos para poner primero los más inscritos

// 5. Preparamos la lista final con solo nombre, inscritos y promedio formateado con dos decimales
const resultado = cursosOrdenados.map(curso => ({
    nombre: curso.nombre,
    inscritos: curso.inscritos,
    promedio: curso.promedio.toFixed(2) // toFixed formatea el número a 2 decimales como string
}));

// Imprimimos el resultado final en consola
console.log(resultado);

/*
Ejemplo de salida:
[
  { nombre: 'Curso C', inscritos: 200, promedio: '4.50' },
  { nombre: 'Curso A', inscritos: 150, promedio: '
/*

-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Ejercicio 2: Closures y funciones generadoras
Enunciado:
Crea un algoritmo que recorra un número entero positivo N y construya un nuevo número X
con las siguientes reglas para cada dígito:
●
●
Si el dígito es par, reemplázalo por el número 2.
Si el dígito es impar, reemplázalo por el número 3.
Usa un generador o closure para recorrer el número dígito por dígito, y reconstruye el
nuevo número al final.
No uses toString() ni split() ni conviertas el número a arreglo.
Ejemplo:
Entrada: N = 4172
Salida: X = 2332
*/

// Definimos una función generadora que recibe un número entero positivo N
function* generarDigitos(n: number): Generator<number> {
    // Mientras N sea mayor que 0, extraemos el último dígito
    while (n > 0) {
        // Obtenemos el último dígito usando el operador módulo
        const digito = n % 10;
        // Yield el dígito para que pueda ser consumido por el llamador
        yield digito;
        // Eliminamos el último dígito dividiendo N entre 10
        n = Math.floor(n / 10);
    }
}

// Función principal que construye el nuevo número X
function construirNumeroX(n: number): number {
    let nuevoNumero = 0; // Inicializamos el nuevo número como 0
    let multiplicador = 1; // Usamos un multiplicador para colocar los dígitos en la posición correcta

    // Usamos el generador para obtener los dígitos de N
    const generador = generarDigitos(n);

    // Recorremos los dígitos generados
    for (const digito of generador) {
        // Verificamos si el dígito es par o impar y lo reemplazamos según las reglas
        if (digito % 2 === 0) {
            nuevoNumero += 2 * multiplicador; // Si es par, sumamos 2
        } else {
            nuevoNumero += 3 * multiplicador; // Si es impar, sumamos 3
        }
        // Aumentamos el multiplicador por 10 para la siguiente posición
        multiplicador *= 10;
    }

    return nuevoNumero; // Devolvemos el nuevo número construido
}

// Ejemplo de uso
const N = 4172; // Número de entrada
const X = construirNumeroX(N); // Llamamos a la función para construir el nuevo número
console.log(X); // Imprimimos el resultado: 2332

----------------------------------------------------------------------------------------------------------------------------------------------------------

/*
Ejercicio 3: Closures
Enunciado:
Diseña una función que reciba un número entero positivo N y devuelva la suma de los
nuevos dígitos aplicando las siguientes reglas:
●
●
Si el dígito es menor que 5, súmale 1.
Si el dígito es mayor o igual a 5, réstale 1.
Debe implementarse usando un closure que encapsule la lógica y mantenga el número
internamente.
No conviertas el número a string ni uses arreglos.
Ejemplo:
Entrada: N = 5781
Transformación: [4, 6, 9, 2] → Suma total: 21
Salida: 21
*/

// Definimos una función que devuelve un closure para calcular la suma de los dígitos transformados
function crearSumaTransformada(n: number) {
    // Esta función interna se encargará de realizar la transformación y la suma
    return function(): number {
        let sumaTotal = 0; // Inicializamos la suma total en 0

        // Usamos un bucle while para recorrer cada dígito del número
        while (n > 0) {
            const digito = n % 10; // Obtenemos el último dígito usando el operador módulo

            // Aplicamos las reglas de transformación
            if (digito < 5) {
                sumaTotal += (digito + 1); // Si el dígito es menor que 5, súmale 1
            } else {
                sumaTotal += (digito - 1); // Si el dígito es mayor o igual a 5, réstale 1
            }

            n = Math.floor(n / 10); // Eliminamos el último dígito dividiendo n entre 10
        }

        return sumaTotal; // Devolvemos la suma total de los dígitos transformados
    };
}

// Ejemplo de uso
const N = 5781; // Número de entrada
const sumaTransformada = crearSumaTransformada(N); // Creamos el closure
const resultado = sumaTransformada(); // Llamamos al closure para obtener la suma
console.log(resultado); // Imprimimos el resultado: 21

----------------------------------------------------------------------------------------------------------------------------------------------------------

/*
Ejercicio 4: Programación genérica
Enunciado:
Implementa una estructura de datos genérica llamada Contenedor<T>, que permita
guardar un valor de cualquier tipo y tenga los siguientes métodos:
●
●
●
guardar(valor: T): guarda el valor recibido.
obtener(): devuelve el valor guardado.
esIgualA(valor: T): compara el valor guardado con otro valor del mismo tipo y
devuelve true o false.
Luego, crea una instancia para cada uno de estos casos:
1. 2. 3. Un contenedor que guarde un número.
Un contenedor que guarde un string.
Un contenedor que guarde un objeto con una propiedad nombre.
Prueba los métodos en cada caso e imprime los resultados por consola
*/

// Definimos la clase genérica Contenedor<T>
class Contenedor<T> {
    private valor: T; // Propiedad privada para almacenar el valor

    // Método para guardar el valor
    guardar(valor: T): void {
        this.valor = valor; // Asignamos el valor recibido a la propiedad
    }

    // Método para obtener el valor guardado
    obtener(): T {
        return this.valor; // Devolvemos el valor guardado
    }

    // Método para comparar el valor guardado con otro valor
    esIgualA(valor: T): boolean {
        return this.valor === valor; // Comparamos y devolvemos true o false
    }
}

// 1. Creamos un contenedor que guarde un número
const contenedorNumero = new Contenedor<number>();
contenedorNumero.guardar(42); // Guardamos el número 42
console.log(contenedorNumero.obtener()); // Imprimimos el valor guardado: 42
console.log(contenedorNumero.esIgualA(42)); // Comparamos con 42: true
console.log(contenedorNumero.esIgualA(100)); // Comparamos con 100: false

// 2. Creamos un contenedor que guarde un string
const contenedorString = new Contenedor<string>();
contenedorString.guardar("Hola, mundo!"); // Guardamos el string
console.log(contenedorString.obtener()); // Imprimimos el valor guardado: "Hola, mundo!"
console.log(contenedorString.esIgualA("Hola, mundo!")); // Comparamos: true
console.log(contenedorString.esIgualA("Adiós, mundo!")); // Comparamos: false

// 3. Creamos un contenedor que guarde un objeto con una propiedad nombre
interface Persona {
    nombre: string; // Definimos la interfaz Persona
}

const contenedorObjeto = new Contenedor<Persona>();
contenedorObjeto.guardar({ nombre: "Juan" }); // Guardamos un objeto con la propiedad nombre
console.log(contenedorObjeto.obtener()); // Imprimimos el objeto guardado: { nombre: "Juan" }
console.log(contenedorObjeto.esIgualA({ nombre: "Juan" })); // Comparamos: false (diferentes referencias)
console.log(contenedorObjeto.esIgualA({ nombre: "Pedro" })); // Comparamos: false


