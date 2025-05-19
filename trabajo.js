// Analizador Léxico
function lexer(input) {
    const tokens = [];
    const tokenTypes = [
        { regex: /^\d+(\.\d+)?/, tipo: 'Numero' },
        { regex: /^[+\-*/]/, tipo: 'Operador' },
        { regex: /^[()]/, tipo: 'Parentesis' },
        { regex: /^\s+/, tipo: null }
    ];
    let contenido = input;
    while (contenido.length > 0) {
        let matched = false;
        for (const { regex, tipo } of tokenTypes) {
            const match = contenido.match(regex);
            if (match) {
                matched = true;
                if (tipo) tokens.push({ tipo, valor: match[0] });
                contenido = contenido.slice(match[0].length);
                break;
            }
        }
        if (!matched) throw new Error('Caracter inválido: ' + contenido[0]);
    }
    return tokens;
}

// Analizador Sintáctico (Parser)
function parser(tokens) {
    let pos = 0;

    function peek() {
        return tokens[pos];
    }

    function consume(tipo) {
        if (peek() && peek().tipo === tipo) return tokens[pos++];
        throw new Error(`Se esperaba token tipo ${tipo}`);
    }

    function parseExpression() {
        let node = parseTerm();
        while (peek() && peek().tipo === 'Operador' && /[+-]/.test(peek().valor)) {
            const op = consume('Operador').valor;
            const right = parseTerm();
            node = { tipo: 'ExpresionNumerica', operador: op, left: node, right };
        }
        return node;
    }

    function parseTerm() {
        let node = parseFactor();
        while (peek() && peek().tipo === 'Operador' && /[*/]/.test(peek().valor)) {
            const op = consume('Operador').valor;
            const right = parseFactor();
            node = { tipo: 'ExpresionNumerica', operador: op, left: node, right };
        }
        return node;
    }

    function parseFactor() {
        if (peek().tipo === 'Numero') {
            return { tipo: 'Literal', valor: parseFloat(consume('Numero').valor) };
        } else if (peek().tipo === 'Parentesis' && peek().valor === '(') {
            consume('Parentesis');
            const expr = parseExpression();
            if (!peek() || peek().tipo !== 'Parentesis' || peek().valor !== ')') {
                throw new Error('Falta paréntesis de cierre');
            }
            consume('Parentesis');
            return expr;
        } else {
            throw new Error('Token inesperado: ' + JSON.stringify(peek()));
        }
    }

    const ast = parseExpression();
    if (pos < tokens.length) throw new Error('Tokens extra al final');
    return ast;
}

// Analizador Semántico y Evaluador
function evaluate(node) {
    if (node.tipo === 'Literal') return node.valor;
    if (node.tipo === 'ExpresionNumerica') {
        const left = evaluate(node.left);
        const right = evaluate(node.right);
        switch (node.operador) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/':
                if (right === 0) throw new Error('División por cero');
                return left / right;
        }
    }
    throw new Error('Nodo desconocido');
}

// Función principal
function compileAndRun(input) {
    try {
        const tokens = lexer(input);
        console.log('Tokens:', tokens);
        const ast = parser(tokens);
        const result = evaluate(ast);
        console.log(JSON.stringify(tokens, null, 2));
        console.log('Resultado:', result);
        return result;
    } catch (e) {
        console.log('Error:', e.message);
        return 'Error: ' + e.message;
    }
}

compileAndRun('3 + +');