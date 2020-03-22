function eval() {
    // Do not use eval!!!
    return;
}

const Operations = {
    '+' : sum,
    '-' : sub,
    '*' : mult,
    '/' : div,
}

function sum(first, second) {
    return first + second;
}
function sub(first, second) {
    return first - second;
}
function mult(first, second) {
    return first * second;
}
function div(first, second) {
    if (second == 0) throw Error('TypeError: Division by zero.');
    return first / second;
}

function toArray(string) {
    string = string.replace(/ /g, '');
    array = [];
    let temp = 0; 
    for(let i = 0; i < string.length; i++) {
      if (!Number.isNaN(Number(string[i]))) {
        temp = parseInt(string.slice(i));
        i += String(temp).length - 1; 
        array.push(temp);
      }
      else
        array.push(string[i]); 
    }
    return array; 
}


function calculator (expr){
    expr = toArray(expr);
    OperationStack =[];
    NumbersStack = [];
    expr.forEach(element => {
        if(Number.isInteger(element))
        NumbersStack.push(element);
        else
        if(element == '*' || element =='/') {
            if (OperationStack.length==0) {
                OperationStack.push(element);
            }
            else {
                if((OperationStack[OperationStack.length-1]=='*' || OperationStack[OperationStack.length-1]=='/' ) ){
                    for(let i = OperationStack.length - 1; i>=-1 ;i--) {
                        if(i!= -1 && (OperationStack[i]=='(' || OperationStack[i]=='+' || OperationStack[i]=='-' )) {
                            NumbersStack.push(...(OperationStack.slice(i+1).reverse()));
                            OperationStack.splice(i+1);
                            OperationStack.push(element);
                            break;
                        }
                        if( i==-1){
                            NumbersStack.push(...OperationStack.reverse())
                            OperationStack=[element];
                            
                        }
                    }
                }
                else {
                        OperationStack.push(element);
                }
            }
        }
        else 
        if(element == '-' || element =='+') {
            if (OperationStack.length==0) {
                OperationStack.push(element);
            }
            else {
                if(!(OperationStack[OperationStack.length-1]=='(' )) {
                    for(let i = OperationStack.length - 1; i>=-1 ;i--) {
                        if(i!= -1 && OperationStack[i]=='(') {
                            NumbersStack.push(...(OperationStack.slice(i+1).reverse()));
                            OperationStack.splice(i+1);
                            OperationStack.push(element);
                            break;
                        }
                        if( i==-1) {
                            NumbersStack.push(...OperationStack.reverse())
                            OperationStack=[element];
                        }
                    }
                }
                else {
                    OperationStack.push(element);
                }
            }
        }
        else
            if(element == "(") {
                NumbersStack.push(...(OperationStack.reverse()));
                OperationStack=[element];
            }
        else 
            if( element ==')'){
                NumbersStack.push(...(OperationStack.slice(OperationStack.lastIndexOf('(')+1).reverse()))
                OperationStack.splice(OperationStack.lastIndexOf('('));
            }
        })
    NumbersStack.push(...(OperationStack.reverse()));
    return NumbersStack;
}

function expressionCalculator(expression) {
    let openBracketsCount = 0, closeBracketsCount = 0;
    expression.split('').forEach(element => {
        switch (element) {
            case '(':
                openBracketsCount++;
                break;
            case ')':
                closeBracketsCount++;
                break;
        }
    });
    if (openBracketsCount !== closeBracketsCount) {
        throw Error('ExpressionError: Brackets must be paired');
    }
    expression = calculator(expression);
    for ( let i = 0; i <expression.length;i++) {
        if(typeof  expression[i] == "string") {
            expression[i-2] = Operations[expression[i]](expression[i-2],expression[i-1]);
            expression.splice(i-1,2);
            i-=2;
            }    
        }
    return expression[0];
}

module.exports = {
    expressionCalculator
}