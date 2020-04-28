function CreateSubMatrix(row, col, Matrix) {
    let SubMatrix = [];
    Matrix.forEach(item => {
        SubMatrix.push(item.slice());
    });

    SubMatrix.splice(col, 1); //remove a column

    for (let i = 0; i < SubMatrix.length; i++) {
        SubMatrix[i].splice(row, 1); //remove items in a row
    }

    return SubMatrix;
}

function GetAdjoint(Matrix) {
    let Adjoint = [];
    for (let i = 0; i < Matrix.length; i++) Adjoint.push([]);

    for (let i = 0; i < Matrix.length; i++) {
        for (let j = 0; j < Matrix.length; j++) Adjoint[i][j] = Matrix[j][i];
    }

    return Adjoint;
}

function GetDeterminant(Matrix) {
    if (Matrix.length == 2) {
        return ((Matrix[0][0] * Matrix[1][1]) - (Matrix[0][1] * Matrix[1][0]));
    }

    let SubMatrices = [];

    for (let i = 0; i < Matrix.length; i++) {
        SubMatrices.push([Matrix[i][0], CreateSubMatrix(0, i, Matrix)]);
    }

    let Operation = "+";
    let Determinant = 0;

    SubMatrices.forEach(SubMatrix => {
        if (Operation == "+") {
            Determinant += (SubMatrix[0] * GetDeterminant(SubMatrix[1]));
            Operation = "-";
        } else {
            Determinant -= (SubMatrix[0] * GetDeterminant(SubMatrix[1]));
            Operation = "+";
        }
    });

    return Determinant;
}

function GetInverse(Matrix) {

    let Determinant = GetDeterminant(Matrix);
    
    let Inverse = [];
    for (let i = 0; i < Matrix.length; i++) Inverse.push([]);
    

    if (Matrix.length == 2) {
        
        let Adjoint = [[Matrix[1][1], -Matrix[0][1]], [-Matrix[1][0], Matrix[0][0]]];
        
        for (let i = 0; i < Adjoint.length; i++) {
            for (let j = 0; j < Adjoint.length; j++) Inverse[i][j] = Adjoint[i][j] / Determinant;
        }
        return Inverse;
    }

    let MatrixOfMinors = [];
    for (let i = 0; i < Matrix.length; i++) MatrixOfMinors.push([]);

    let Operator = "+";

    for (let i = 0; i < Matrix.length; i++) {
        for (let j = 0; j < Matrix.length; j++) {
            if (Operator == "+") {
                MatrixOfMinors[i][j] = GetDeterminant(CreateSubMatrix(i, j, Matrix));
                Operator = "-";
            } else {
                MatrixOfMinors[i][j] = -GetDeterminant(CreateSubMatrix(i, j, Matrix));
                Operator = "+";
            }
        }

        let Adjoint = GetAdjoint(MatrixOfMinors);

        for (let i = 0; i < MatrixOfMinors.length; i++) {
            for (let j = 0; j < MatrixOfMinors.length; j++) Inverse[i][j] = MatrixOfMinors[i][j] / Determinant;
        }
    }
    return Inverse;
}